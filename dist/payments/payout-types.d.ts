import type { MoneyCents } from "./money";
export declare const PAYOUT_PAYEE_KINDS: readonly ["agency", "agent"];
export type PayoutPayeeKind = (typeof PAYOUT_PAYEE_KINDS)[number];
export declare const PAYOUT_RATE_METHODS: readonly ["pmpm", "flat", "percent"];
export type PayoutRateMethod = (typeof PAYOUT_RATE_METHODS)[number];
export declare const PAYOUT_RUN_STATUSES: readonly ["processing", "review", "calculated", "failed"];
export type PayoutRunStatus = (typeof PAYOUT_RUN_STATUSES)[number];
export declare const PAYOUT_EXCEPTION_CODES: readonly ["PAYEE_NOT_FOUND", "AMBIGUOUS_PAYEE", "ASSIGNMENT_NOT_FOUND", "AMBIGUOUS_ASSIGNMENT", "TIER_NOT_FOUND", "INVALID_CALCULATION_INPUT"];
export type PayoutExceptionCode = (typeof PAYOUT_EXCEPTION_CODES)[number];
export type PayoutPayee = {
    id: string;
    name: string;
    kind: PayoutPayeeKind;
    npn: string | null;
    active: boolean;
    createdAt?: string;
    updatedAt?: string;
};
export type PayoutCarrier = {
    id: string;
    name: string;
    code: string;
    active: boolean;
    createdAt?: string;
    updatedAt?: string;
};
export type PayoutCarrierPayeeIdentifier = {
    id: string;
    payeeId: string;
    carrierId: string;
    value: string;
    normalizedValue: string;
    active: boolean;
    createdAt?: string;
    updatedAt?: string;
};
export type PayoutTier = {
    id: string;
    carrierId: string;
    name: string;
    method: PayoutRateMethod;
    rateCents: MoneyCents | number | null;
    rateBasisPoints: number | null;
    version: number;
    effectiveFrom: string;
    effectiveTo: string | null;
    active: boolean;
    createdAt?: string;
    updatedAt?: string;
};
export type PayoutRateAssignment = {
    id: string;
    payeeId: string;
    carrierId: string;
    tierId: string;
    effectiveFrom: string;
    effectiveTo: string | null;
    active: boolean;
    createdAt?: string;
    updatedAt?: string;
};
export type PayoutStatementLineInput = {
    carrierPayeeIdentifier: string | null;
    npn: string | null;
    producerName: string | null;
    quantity: number;
    baseAmountCents: MoneyCents | number;
    effectiveDate: string;
    externalRef: string | null;
    state: string | null;
    productCode: string | null;
};
export type PayoutStatement = {
    id: string;
    carrierId: string;
    label: string;
    periodStart: string;
    periodEnd: string;
    templateKey: string;
    fileName: string;
    fileSha256: string | null;
    lineCount: number;
    status: PayoutRunStatus;
    importedBy: string;
    importedAt?: string;
};
export type PayoutStatementLine = PayoutStatementLineInput & {
    id: string;
    statementId: string;
    sourceRowNumber: number;
    matchedPayeeId: string | null;
};
export type PayoutRun = {
    id: string;
    statementId: string;
    carrierId: string;
    status: PayoutRunStatus;
    allocationCount: number;
    exceptionCount: number;
    totalPayableCents: MoneyCents | number;
    createdBy: string;
    createdAt?: string;
    completedAt?: string | null;
};
export type PayoutAllocation = {
    id: string;
    runId: string;
    statementId: string;
    statementLineId: string;
    sourceRowNumber: number;
    payeeId: string;
    carrierId: string;
    assignmentId: string;
    tierId: string;
    tierVersion: number;
    method: PayoutRateMethod;
    quantity: number;
    baseAmountCents: MoneyCents | number;
    rateCents: MoneyCents | number | null;
    rateBasisPoints: number | null;
    amountCents: MoneyCents | number;
};
export type PayoutException = {
    id: string;
    runId: string;
    statementId: string;
    statementLineId: string;
    sourceRowNumber: number;
    code: PayoutExceptionCode;
    message: string;
    blocking: boolean;
    resolved: boolean;
};
export type PayoutWorkspace = {
    payees: PayoutPayee[];
    carriers: PayoutCarrier[];
    identifiers: PayoutCarrierPayeeIdentifier[];
    tiers: PayoutTier[];
    assignments: PayoutRateAssignment[];
};
export type PayoutRunDetail = {
    run: PayoutRun;
    statement: PayoutStatement;
    allocations: PayoutAllocation[];
    exceptions: PayoutException[];
};
//# sourceMappingURL=payout-types.d.ts.map