import { describe, it, expect } from 'vitest';
import { computeFees } from '../src/features/calculator/computeFees';
import { CalculatorRuleDoc } from '../src/lib/converters';

const samplePropertyRule: CalculatorRuleDoc = {
  id: 'property',
  routeName: '10-Year Golden Visa (Property)',
  routeId: 'property',
  thresholdAmount: 2000000,
  governmentFees: [
    { label: 'DLD Admin Fee', amount: 5333 },
    { label: 'Medical & EID', amount: 1150 },
  ],
  serviceFees: [
    { label: 'Bespoke Advisory', amount: 3500 },
  ],
  familyMemberFeePerDependent: 2200,
  timelineDays: 10,
};

const sampleFamilyRule: CalculatorRuleDoc = {
  id: 'family',
  routeName: 'Family Residency Sponsorship',
  routeId: 'family',
  thresholdAmount: 4000,
  governmentFees: [
    { label: 'Entry Permit', amount: 1100 },
    { label: 'Medical & EID', amount: 950 },
  ],
  serviceFees: [
    { label: 'Family Sponsorship Processing', amount: 1500 },
  ],
  familyMemberFeePerDependent: 1500,
  timelineDays: 5,
};

describe('computeFees Pure Calculation Unit Tests', () => {
  it('1. Computes valid Property Golden Visa calculation above AED 2,000,000 threshold', () => {
    const result = computeFees(samplePropertyRule, {
      routeId: 'property',
      propertyValue: 2500000,
      dependentsCount: 0,
    });

    expect(result.isEligible).toBe(true);
    expect(result.totalGovernmentFees).toBe(6483); // 5333 + 1150
    expect(result.totalServiceFees).toBe(3500);
    expect(result.grandTotal).toBe(9983); // 6483 + 3500
    expect(result.alternativeMessage).toBeUndefined();
  });

  it('2. Computes Family Visa with 2 dependents recalculating live totals', () => {
    const result = computeFees(sampleFamilyRule, {
      routeId: 'family',
      salary: 15000,
      dependentsCount: 2,
    });

    expect(result.isEligible).toBe(true);
    expect(result.familyFees).toHaveLength(1);
    expect(result.familyFees[0].amount).toBe(3000); // 1500 * 2
    expect(result.totalGovernmentFees).toBe(2050); // 1100 + 950
    expect(result.totalServiceFees).toBe(4500); // 1500 service + 3000 family
    expect(result.grandTotal).toBe(6550);
  });

  it('3. Surfaces closest eligible alternative message when property value is below AED 2M threshold', () => {
    const result = computeFees(samplePropertyRule, {
      routeId: 'property',
      propertyValue: 1200000,
    });

    expect(result.isEligible).toBe(false);
    expect(result.alternativeMessage).toContain('Property value (AED 1,200,000) is below the AED 2,000,000 threshold');
    expect(result.alternativeMessage).toContain('Closest alternative: 2-Year Property Visa');
  });
});
