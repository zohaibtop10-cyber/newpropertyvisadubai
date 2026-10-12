import React, { useState, useEffect, useMemo } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { useCalculatorRules, useSiteSettings } from '../../hooks/useFirestoreData';
import { computeFees, CalculatorInputs, FeeCalculationResult } from './computeFees';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import {
  Building2,
  Briefcase,
  UserCheck,
  PiggyBank,
  Users,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  Send,
  Loader2,
} from 'lucide-react';

export interface CalculatorProps {
  initialRoute?: 'property' | 'company' | 'salaried' | 'deposit' | 'family';
  className?: string;
}

export const Calculator: React.FC<CalculatorProps> = ({
  initialRoute = 'property',
  className = '',
}) => {
  const { rules, loading: rulesLoading } = useCalculatorRules();
  const { settings } = useSiteSettings();

  const [activeRoute, setActiveRoute] = useState<'property' | 'company' | 'salaried' | 'deposit' | 'family'>(
    initialRoute
  );

  // Form inputs
  const [propertyValue, setPropertyValue] = useState<number>(2000000);
  const [companyShare, setCompanyShare] = useState<number>(100);
  const [salary, setSalary] = useState<number>(35000);
  const [depositAmount, setDepositAmount] = useState<number>(2000000);
  const [dependentsCount, setDependentsCount] = useState<number>(0);

  // Lead Submission State
  const [leadName, setLeadName] = useState<string>('');
  const [leadPhone, setLeadPhone] = useState<string>('');
  const [leadEmail, setLeadEmail] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Sync initialRoute if provided
  useEffect(() => {
    if (initialRoute) {
      setActiveRoute(initialRoute);
    }
  }, [initialRoute]);

  // Find rule document for active route
  const currentRuleDoc = useMemo(() => {
    return rules.find((r) => r.routeId === activeRoute) || {
      id: activeRoute,
      routeName: `${activeRoute.toUpperCase()} Route`,
      routeId: activeRoute,
      thresholdAmount: activeRoute === 'property' ? 2000000 : 4000,
      governmentFees: [
        { label: 'Government Channel Clearance', amount: 4020 },
        { label: 'VIP Medical Fitness & EID', amount: 1313 },
      ],
      serviceFees: [
        { label: 'Licensed Consultancy Processing', amount: 2500 },
      ],
      familyMemberFeePerDependent: 1850,
      timelineDays: 7,
    };
  }, [rules, activeRoute]);

  // Compute live calculation
  const calcInputs: CalculatorInputs = {
    routeId: activeRoute,
    propertyValue,
    companyShare,
    salary,
    depositAmount,
    dependentsCount,
  };

  const result: FeeCalculationResult = useMemo(() => {
    return computeFees(currentRuleDoc, calcInputs);
  }, [currentRuleDoc, calcInputs]);

  // Generate WhatsApp text message payload
  const generateWhatsAppMessage = () => {
    const text = `Hello *${settings.companyName}*,\n\nI calculated my residency fee for *${currentRuleDoc.routeName}*:\n\n• *Government Fees:* AED ${result.totalGovernmentFees.toLocaleString()}\n• *Service & Dependent Fees:* AED ${result.totalServiceFees.toLocaleString()}\n• *Grand Total:* AED ${result.grandTotal.toLocaleString()}\n• *SLA Estimate:* ${currentRuleDoc.timelineDays} Days\n\nPlease confirm availability and document submission details.`;
    return `https://wa.me/${settings.whatsapp}?text=${encodeURIComponent(text)}`;
  };

  // Submit Lead to Firestore leads collection
  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadName || !leadPhone) {
      setSubmitError('Please provide your name and phone number.');
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      await addDoc(collection(db, 'leads'), {
        name: leadName,
        phone: leadPhone,
        email: leadEmail,
        serviceInterest: currentRuleDoc.routeName,
        route: activeRoute,
        calculatorSnapshot: {
          inputs: calcInputs,
          governmentFees: result.governmentFees,
          serviceFees: [...result.serviceFees, ...result.familyFees],
          totalAmount: result.grandTotal,
        },
        status: 'New',
        notes: ['Submitted via Fee Calculator widget'],
        createdAt: serverTimestamp(),
      });

      setSubmitSuccess(true);
      setLeadName('');
      setLeadPhone('');
      setLeadEmail('');
    } catch (err: any) {
      console.error('Lead submission error:', err);
      setSubmitError(err.message || 'Failed to submit quote. Please try WhatsApp direct.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card variant="content" className={`bg-surface border border-gold/30 p-6 md:p-8 rounded-[12px] shadow-xl font-sans ${className}`}>
      {/* Header */}
      <div className="text-center max-w-xl mx-auto mb-8">
        <span className="text-xs font-bold text-gold uppercase tracking-wider">
          Transparent Fee Estimator
        </span>
        <h2 className="text-2xl md:text-3xl font-bold text-text tracking-tight mt-1">
          Calculate Your Exact UAE Residency Fee
        </h2>
        <p className="text-xs md:text-sm text-text-muted mt-1">
          Select your visa route, enter basic details, and review itemized government vs. service line items.
        </p>
      </div>

      {/* 1. Route Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-8 border-b border-border-hairline pb-4">
        <button
          type="button"
          onClick={() => setActiveRoute('property')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-[10px] text-xs md:text-sm font-semibold transition-colors ${
            activeRoute === 'property'
              ? 'bg-gold text-bg font-bold shadow-sm'
              : 'bg-surface border border-border-hairline text-text hover:text-gold'
          }`}
        >
          <Building2 className="w-4 h-4" />
          Property Owner
        </button>

        <button
          type="button"
          onClick={() => setActiveRoute('company')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-[10px] text-xs md:text-sm font-semibold transition-colors ${
            activeRoute === 'company'
              ? 'bg-gold text-bg font-bold shadow-sm'
              : 'bg-surface border border-border-hairline text-text hover:text-gold'
          }`}
        >
          <Briefcase className="w-4 h-4" />
          Company Shareholder
        </button>

        <button
          type="button"
          onClick={() => setActiveRoute('salaried')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-[10px] text-xs md:text-sm font-semibold transition-colors ${
            activeRoute === 'salaried'
              ? 'bg-gold text-bg font-bold shadow-sm'
              : 'bg-surface border border-border-hairline text-text hover:text-gold'
          }`}
        >
          <UserCheck className="w-4 h-4" />
          Salaried Executive
        </button>

        <button
          type="button"
          onClick={() => setActiveRoute('deposit')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-[10px] text-xs md:text-sm font-semibold transition-colors ${
            activeRoute === 'deposit'
              ? 'bg-gold text-bg font-bold shadow-sm'
              : 'bg-surface border border-border-hairline text-text hover:text-gold'
          }`}
        >
          <PiggyBank className="w-4 h-4" />
          Fixed Deposit
        </button>

        <button
          type="button"
          onClick={() => setActiveRoute('family')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-[10px] text-xs md:text-sm font-semibold transition-colors ${
            activeRoute === 'family'
              ? 'bg-gold text-bg font-bold shadow-sm'
              : 'bg-surface border border-border-hairline text-text hover:text-gold'
          }`}
        >
          <Users className="w-4 h-4" />
          Family Dependent
        </button>
      </div>

      {/* 2. Route Inputs & Add Family Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Route Specific Input */}
        <div className="space-y-2">
          {activeRoute === 'property' && (
            <>
              <label className="text-xs font-semibold uppercase text-text font-mono">
                Title Deed Property Value (AED)
              </label>
              <input
                type="number"
                step="50000"
                value={propertyValue}
                onChange={(e) => setPropertyValue(Number(e.target.value))}
                className="w-full px-4 py-2.5 rounded-[8px] border border-border-hairline bg-bg text-text font-mono focus:border-gold focus:outline-none"
              />
            </>
          )}

          {activeRoute === 'company' && (
            <>
              <label className="text-xs font-semibold uppercase text-text font-mono">
                Company Shareholding (%)
              </label>
              <input
                type="number"
                min="1"
                max="100"
                value={companyShare}
                onChange={(e) => setCompanyShare(Number(e.target.value))}
                className="w-full px-4 py-2.5 rounded-[8px] border border-border-hairline bg-bg text-text font-mono focus:border-gold focus:outline-none"
              />
            </>
          )}

          {(activeRoute === 'salaried' || activeRoute === 'family') && (
            <>
              <label className="text-xs font-semibold uppercase text-text font-mono">
                Monthly Salary (AED)
              </label>
              <input
                type="number"
                step="1000"
                value={salary}
                onChange={(e) => setSalary(Number(e.target.value))}
                className="w-full px-4 py-2.5 rounded-[8px] border border-border-hairline bg-bg text-text font-mono focus:border-gold focus:outline-none"
              />
            </>
          )}

          {activeRoute === 'deposit' && (
            <>
              <label className="text-xs font-semibold uppercase text-text font-mono">
                UAE Bank Deposit Amount (AED)
              </label>
              <input
                type="number"
                step="100000"
                value={depositAmount}
                onChange={(e) => setDepositAmount(Number(e.target.value))}
                className="w-full px-4 py-2.5 rounded-[8px] border border-border-hairline bg-bg text-text font-mono focus:border-gold focus:outline-none"
              />
            </>
          )}
        </div>

        {/* Family Member Control */}
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase text-text font-mono">
            Sponsor Family Dependents (Spouse / Children / Parents)
          </label>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setDependentsCount(Math.max(0, dependentsCount - 1))}
              className="w-10 h-10 rounded-[8px] border border-border-hairline bg-bg text-text font-bold text-lg hover:border-gold"
            >
              -
            </button>
            <span className="font-mono text-lg font-bold text-gold px-4">{dependentsCount}</span>
            <button
              type="button"
              onClick={() => setDependentsCount(dependentsCount + 1)}
              className="w-10 h-10 rounded-[8px] border border-border-hairline bg-bg text-text font-bold text-lg hover:border-gold"
            >
              +
            </button>
            <span className="text-xs text-text-muted">
              (+AED {(currentRuleDoc.familyMemberFeePerDependent || 1850).toLocaleString()} per dependent)
            </span>
          </div>
        </div>
      </div>

      {/* 3. Ineligibility Warning Message */}
      {!result.isEligible && (
        <div className="p-4 rounded-[10px] border border-amber-500/30 bg-amber-500/10 text-amber-500 text-xs md:text-sm flex items-start gap-3 mb-8">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-amber-500" />
          <div>
            <strong>Threshold Warning:</strong> {result.alternativeMessage}
          </div>
        </div>
      )}

      {/* 4. Itemized Calculation Result Table */}
      <div className="border border-border-hairline rounded-[10px] overflow-hidden mb-8">
        <div className="bg-bg/50 px-4 py-3 border-b border-border-hairline flex items-center justify-between">
          <span className="text-xs font-mono font-bold uppercase text-gold">
            Itemized Fee Breakdown &bull; SLA: {currentRuleDoc.timelineDays} Days
          </span>
          <span className="text-xs font-mono text-text-muted">
            Licence: {settings.licenseNumber}
          </span>
        </div>

        <div className="divide-y divide-border-hairline text-xs md:text-sm">
          {/* Government Fees */}
          <div className="p-4 space-y-2 bg-surface">
            <div className="font-bold text-text uppercase text-[11px] font-mono tracking-wider text-text-muted">
              1. Official Government Channel Fees
            </div>
            {result.governmentFees.map((item, idx) => (
              <div key={idx} className="flex justify-between text-text-muted">
                <span>{item.label}</span>
                <span className="font-mono text-text">AED {item.amount.toLocaleString()}</span>
              </div>
            ))}
            <div className="flex justify-between font-semibold text-text pt-2 border-t border-border-hairline/40">
              <span>Subtotal Government Fees:</span>
              <span className="font-mono text-text font-bold">
                AED {result.totalGovernmentFees.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Consultancy & Family Fees */}
          <div className="p-4 space-y-2 bg-surface">
            <div className="font-bold text-text uppercase text-[11px] font-mono tracking-wider text-text-muted">
              2. Consultancy &amp; Dependent Processing Fees
            </div>
            {result.serviceFees.map((item, idx) => (
              <div key={idx} className="flex justify-between text-text-muted">
                <span>{item.label}</span>
                <span className="font-mono text-text">AED {item.amount.toLocaleString()}</span>
              </div>
            ))}
            {result.familyFees.map((item, idx) => (
              <div key={idx} className="flex justify-between text-gold font-medium">
                <span>{item.label}</span>
                <span className="font-mono">AED {item.amount.toLocaleString()}</span>
              </div>
            ))}
            <div className="flex justify-between font-semibold text-text pt-2 border-t border-border-hairline/40">
              <span>Subtotal Consultancy Fees:</span>
              <span className="font-mono text-text font-bold">
                AED {result.totalServiceFees.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Grand Total Row */}
          <div className="p-4 bg-bg flex items-center justify-between">
            <span className="text-base font-bold text-text uppercase tracking-tight">
              Grand Total Calculated Quote
            </span>
            <span className="text-xl md:text-2xl font-mono font-bold text-gold">
              AED {result.grandTotal.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* 5. Dual CTAs & Lead Submission Form */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4 border-t border-border-hairline">
        {/* WhatsApp Direct CTA */}
        <div className="space-y-3">
          <h4 className="text-xs font-mono uppercase text-gold font-bold">
            Option A: Instant WhatsApp Pre-Filled Quote
          </h4>
          <p className="text-xs text-text-muted">
            Receive this exact breakdown on WhatsApp with a single click. No waiting for email responses.
          </p>
          <Button
            variant="whatsapp"
            size="lg"
            className="w-full"
            icon={<MessageSquare className="w-5 h-5" />}
            onClick={() => window.open(generateWhatsAppMessage(), '_blank')}
          >
            Get Quote on WhatsApp
          </Button>
        </div>

        {/* Submit as Lead Form */}
        <div className="space-y-3">
          <h4 className="text-xs font-mono uppercase text-gold font-bold">
            Option B: Submit Formal Lead Quote Request
          </h4>

          {submitSuccess ? (
            <div className="p-4 rounded-md border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>Quote request submitted successfully! Our advisor will call you shortly.</span>
            </div>
          ) : (
            <form onSubmit={handleLeadSubmit} className="space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="Your Full Name *"
                  required
                  value={leadName}
                  onChange={(e) => setLeadName(e.target.value)}
                  className="px-3 py-2 rounded-[8px] border border-border-hairline bg-bg text-xs text-text focus:border-gold focus:outline-none"
                />
                <input
                  type="tel"
                  placeholder="Phone / WhatsApp *"
                  required
                  value={leadPhone}
                  onChange={(e) => setLeadPhone(e.target.value)}
                  className="px-3 py-2 rounded-[8px] border border-border-hairline bg-bg text-xs text-text focus:border-gold focus:outline-none"
                />
              </div>
              <input
                type="email"
                placeholder="Email Address (Optional)"
                value={leadEmail}
                onChange={(e) => setLeadEmail(e.target.value)}
                className="w-full px-3 py-2 rounded-[8px] border border-border-hairline bg-bg text-xs text-text focus:border-gold focus:outline-none"
              />
              {submitError && (
                <div className="text-[11px] text-amber-500">{submitError}</div>
              )}
              <Button
                variant="primary"
                size="md"
                className="w-full"
                type="submit"
                disabled={isSubmitting}
                icon={isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Lead Request'}
              </Button>
            </form>
          )}
        </div>
      </div>
    </Card>
  );
};

export default Calculator;
