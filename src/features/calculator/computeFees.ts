import { CalculatorRuleDoc, LineItem } from '../../lib/converters';

export interface CalculatorInputs {
  routeId: 'property' | 'company' | 'salaried' | 'deposit' | 'family';
  propertyValue?: number;
  companyShare?: number;
  salary?: number;
  depositAmount?: number;
  dependentsCount?: number;
  relationshipType?: 'spouse' | 'child' | 'parent';
}

export interface FeeCalculationResult {
  isEligible: boolean;
  alternativeMessage?: string;
  governmentFees: LineItem[];
  serviceFees: LineItem[];
  familyFees: LineItem[];
  totalGovernmentFees: number;
  totalServiceFees: number;
  grandTotal: number;
}

export function computeFees(
  rule: CalculatorRuleDoc,
  inputs: CalculatorInputs
): FeeCalculationResult {
  const dependents = Math.max(0, inputs.dependentsCount || 0);

  // 1. Check Threshold Eligibility
  let isEligible = true;
  let alternativeMessage: string | undefined = undefined;

  if (inputs.routeId === 'property') {
    const val = inputs.propertyValue || 0;
    if (val < rule.thresholdAmount) {
      isEligible = false;
      alternativeMessage = `Property value (AED ${val.toLocaleString()}) is below the AED ${rule.thresholdAmount.toLocaleString()} threshold. Closest alternative: 2-Year Property Visa at AED 750,000 threshold or Family Dependent sponsorship.`;
    }
  } else if (inputs.routeId === 'company') {
    const share = inputs.companyShare || 0;
    if (share < 20) {
      isEligible = false;
      alternativeMessage = `Company shareholding (${share}%) is below the minimum 20% ownership requirement for investor visa.`;
    }
  } else if (inputs.routeId === 'salaried') {
    const sal = inputs.salary || 0;
    if (sal < 30000) {
      isEligible = false;
      alternativeMessage = `Monthly salary (AED ${sal.toLocaleString()}) is below the AED 30,000 threshold for Executive Golden Visa. Closest alternative: Standard Green Visa or Employment Visa.`;
    }
  } else if (inputs.routeId === 'deposit') {
    const dep = inputs.depositAmount || 0;
    if (dep < 2000000) {
      isEligible = false;
      alternativeMessage = `Fixed deposit (AED ${dep.toLocaleString()}) is below the AED 2,000,000 threshold for 10-Year Bank Deposit Golden Visa.`;
    }
  } else if (inputs.routeId === 'family') {
    const sal = inputs.salary || 0;
    if (sal < rule.thresholdAmount) {
      isEligible = false;
      alternativeMessage = `Sponsor salary (AED ${sal.toLocaleString()}) is below the AED ${rule.thresholdAmount.toLocaleString()} threshold required to sponsor family dependents.`;
    }
  }

  // 2. Base Government & Service Fees from Rules
  const governmentFees: LineItem[] = [...(rule.governmentFees || [])];
  const serviceFees: LineItem[] = [...(rule.serviceFees || [])];

  // 3. Family Dependent Addon Fees
  const familyFees: LineItem[] = [];
  if (dependents > 0) {
    const perDepFee = rule.familyMemberFeePerDependent || 1850;
    familyFees.push({
      label: `Dependent Sponsorship (${dependents} Dependent${dependents > 1 ? 's' : ''})`,
      amount: perDepFee * dependents,
    });
  }

  const totalGovernmentFees = governmentFees.reduce((sum, item) => sum + item.amount, 0);
  const totalServiceFees =
    serviceFees.reduce((sum, item) => sum + item.amount, 0) +
    familyFees.reduce((sum, item) => sum + item.amount, 0);

  const grandTotal = totalGovernmentFees + totalServiceFees;

  return {
    isEligible,
    alternativeMessage,
    governmentFees,
    serviceFees,
    familyFees,
    totalGovernmentFees,
    totalServiceFees,
    grandTotal,
  };
}
