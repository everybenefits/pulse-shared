import { z } from "zod";
export declare const payoutPayeeInputSchema: z.ZodObject<{
    name: z.ZodString;
    kind: z.ZodEnum<{
        agent: "agent";
        agency: "agency";
    }>;
    npn: z.ZodPreprocess<z.ZodDefault<z.ZodOptional<z.ZodNullable<z.ZodString>>>, unknown>;
    active: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
}, z.core.$strip>;
export declare const payoutCarrierInputSchema: z.ZodObject<{
    name: z.ZodString;
    code: z.ZodString;
    active: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
}, z.core.$strip>;
export declare const payoutCarrierIdentifierInputSchema: z.ZodObject<{
    payeeId: z.ZodString;
    carrierId: z.ZodString;
    value: z.ZodString;
    active: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
}, z.core.$strip>;
export declare const payoutTierInputSchema: z.ZodObject<{
    carrierId: z.ZodString;
    name: z.ZodString;
    method: z.ZodEnum<{
        flat: "flat";
        pmpm: "pmpm";
        percent: "percent";
    }>;
    rateCents: z.ZodDefault<z.ZodOptional<z.ZodNullable<z.ZodNumber>>>;
    rateBasisPoints: z.ZodDefault<z.ZodOptional<z.ZodNullable<z.ZodNumber>>>;
    version: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
    effectiveFrom: z.ZodString;
    effectiveTo: z.ZodDefault<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
    active: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
}, z.core.$strip>;
export declare const payoutRateAssignmentInputSchema: z.ZodObject<{
    payeeId: z.ZodString;
    carrierId: z.ZodString;
    tierId: z.ZodString;
    effectiveFrom: z.ZodString;
    effectiveTo: z.ZodDefault<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
    active: z.ZodDefault<z.ZodOptional<z.ZodBoolean>>;
}, z.core.$strip>;
export declare const payoutStatementLineInputSchema: z.ZodObject<{
    carrierPayeeIdentifier: z.ZodPreprocess<z.ZodDefault<z.ZodOptional<z.ZodNullable<z.ZodString>>>, unknown>;
    npn: z.ZodPreprocess<z.ZodDefault<z.ZodOptional<z.ZodNullable<z.ZodString>>>, unknown>;
    producerName: z.ZodPreprocess<z.ZodDefault<z.ZodOptional<z.ZodNullable<z.ZodString>>>, unknown>;
    quantity: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
    baseAmountCents: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
    effectiveDate: z.ZodString;
    externalRef: z.ZodPreprocess<z.ZodDefault<z.ZodOptional<z.ZodNullable<z.ZodString>>>, unknown>;
    state: z.ZodPreprocess<z.ZodDefault<z.ZodOptional<z.ZodNullable<z.ZodString>>>, unknown>;
    productCode: z.ZodPreprocess<z.ZodDefault<z.ZodOptional<z.ZodNullable<z.ZodString>>>, unknown>;
}, z.core.$strip>;
export declare const importPayoutStatementInputSchema: z.ZodObject<{
    carrierId: z.ZodString;
    label: z.ZodString;
    periodStart: z.ZodString;
    periodEnd: z.ZodString;
    templateKey: z.ZodDefault<z.ZodString>;
    fileName: z.ZodString;
    fileSha256: z.ZodPreprocess<z.ZodDefault<z.ZodOptional<z.ZodNullable<z.ZodString>>>, unknown>;
    lines: z.ZodArray<z.ZodObject<{
        carrierPayeeIdentifier: z.ZodPreprocess<z.ZodDefault<z.ZodOptional<z.ZodNullable<z.ZodString>>>, unknown>;
        npn: z.ZodPreprocess<z.ZodDefault<z.ZodOptional<z.ZodNullable<z.ZodString>>>, unknown>;
        producerName: z.ZodPreprocess<z.ZodDefault<z.ZodOptional<z.ZodNullable<z.ZodString>>>, unknown>;
        quantity: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
        baseAmountCents: z.ZodDefault<z.ZodOptional<z.ZodNumber>>;
        effectiveDate: z.ZodString;
        externalRef: z.ZodPreprocess<z.ZodDefault<z.ZodOptional<z.ZodNullable<z.ZodString>>>, unknown>;
        state: z.ZodPreprocess<z.ZodDefault<z.ZodOptional<z.ZodNullable<z.ZodString>>>, unknown>;
        productCode: z.ZodPreprocess<z.ZodDefault<z.ZodOptional<z.ZodNullable<z.ZodString>>>, unknown>;
    }, z.core.$strip>>;
}, z.core.$strip>;
//# sourceMappingURL=payout-schemas.d.ts.map