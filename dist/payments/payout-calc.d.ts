import type { PayoutAllocation, PayoutCarrierPayeeIdentifier, PayoutExceptionCode, PayoutPayee, PayoutRateAssignment, PayoutStatementLineInput, PayoutTier } from "./payout-types";
export type PayoutCalculationAllocationDraft = Omit<PayoutAllocation, "id" | "runId" | "statementId" | "statementLineId"> & {
    lineIndex: number;
};
export type PayoutCalculationExceptionDraft = {
    lineIndex: number;
    sourceRowNumber: number;
    code: PayoutExceptionCode;
    message: string;
};
export type PayoutCalculationResult = {
    allocations: PayoutCalculationAllocationDraft[];
    exceptions: PayoutCalculationExceptionDraft[];
    totalPayableCents: number;
    totalsByPayee: Array<{
        payeeId: string;
        amountCents: number;
    }>;
};
export declare function normalizePayoutIdentifier(value: string): string;
export declare function calculateTierAmountCents(args: {
    tier: PayoutTier;
    line: PayoutStatementLineInput;
}): number;
export declare function runStandalonePayoutCalculation(args: {
    carrierId: string;
    lines: readonly PayoutStatementLineInput[];
    payees: readonly PayoutPayee[];
    identifiers: readonly PayoutCarrierPayeeIdentifier[];
    tiers: readonly PayoutTier[];
    assignments: readonly PayoutRateAssignment[];
}): PayoutCalculationResult;
//# sourceMappingURL=payout-calc.d.ts.map