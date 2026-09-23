"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.importPayoutStatementInputSchema = exports.payoutStatementLineInputSchema = exports.payoutRateAssignmentInputSchema = exports.payoutTierInputSchema = exports.payoutCarrierIdentifierInputSchema = exports.payoutCarrierInputSchema = exports.payoutPayeeInputSchema = void 0;
const zod_1 = require("zod");
const payout_types_1 = require("./payout-types");
const isoDateSchema = zod_1.z
    .string()
    .trim()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Expected YYYY-MM-DD.");
const optionalText = zod_1.z.preprocess((value) => typeof value === "string" && value.trim() === "" ? null : value, zod_1.z.string().trim().min(1).nullable().optional().default(null));
exports.payoutPayeeInputSchema = zod_1.z.object({
    name: zod_1.z.string().trim().min(1).max(160),
    kind: zod_1.z.enum(payout_types_1.PAYOUT_PAYEE_KINDS),
    npn: optionalText,
    active: zod_1.z.boolean().optional().default(true),
});
exports.payoutCarrierInputSchema = zod_1.z.object({
    name: zod_1.z.string().trim().min(1).max(160),
    code: zod_1.z.string().trim().min(1).max(50),
    active: zod_1.z.boolean().optional().default(true),
});
exports.payoutCarrierIdentifierInputSchema = zod_1.z.object({
    payeeId: zod_1.z.string().trim().min(1),
    carrierId: zod_1.z.string().trim().min(1),
    value: zod_1.z.string().trim().min(1).max(120),
    active: zod_1.z.boolean().optional().default(true),
});
exports.payoutTierInputSchema = zod_1.z
    .object({
    carrierId: zod_1.z.string().trim().min(1),
    name: zod_1.z.string().trim().min(1).max(160),
    method: zod_1.z.enum(payout_types_1.PAYOUT_RATE_METHODS),
    rateCents: zod_1.z.number().int().nonnegative().nullable().optional().default(null),
    rateBasisPoints: zod_1.z
        .number()
        .int()
        .nonnegative()
        .nullable()
        .optional()
        .default(null),
    version: zod_1.z.number().int().positive().optional().default(1),
    effectiveFrom: isoDateSchema,
    effectiveTo: isoDateSchema.nullable().optional().default(null),
    active: zod_1.z.boolean().optional().default(true),
})
    .superRefine((value, ctx) => {
    if (value.effectiveTo && value.effectiveTo < value.effectiveFrom) {
        ctx.addIssue({
            code: "custom",
            path: ["effectiveTo"],
            message: "effectiveTo must be on or after effectiveFrom.",
        });
    }
    if (value.method === "percent") {
        if (value.rateBasisPoints == null) {
            ctx.addIssue({
                code: "custom",
                path: ["rateBasisPoints"],
                message: "Percent tiers require rateBasisPoints.",
            });
        }
        return;
    }
    if (value.rateCents == null) {
        ctx.addIssue({
            code: "custom",
            path: ["rateCents"],
            message: "PMPM and flat tiers require rateCents.",
        });
    }
});
exports.payoutRateAssignmentInputSchema = zod_1.z
    .object({
    payeeId: zod_1.z.string().trim().min(1),
    carrierId: zod_1.z.string().trim().min(1),
    tierId: zod_1.z.string().trim().min(1),
    effectiveFrom: isoDateSchema,
    effectiveTo: isoDateSchema.nullable().optional().default(null),
    active: zod_1.z.boolean().optional().default(true),
})
    .superRefine((value, ctx) => {
    if (value.effectiveTo && value.effectiveTo < value.effectiveFrom) {
        ctx.addIssue({
            code: "custom",
            path: ["effectiveTo"],
            message: "effectiveTo must be on or after effectiveFrom.",
        });
    }
});
exports.payoutStatementLineInputSchema = zod_1.z.object({
    carrierPayeeIdentifier: optionalText,
    npn: optionalText,
    producerName: optionalText,
    quantity: zod_1.z.number().int().nonnegative().optional().default(0),
    baseAmountCents: zod_1.z.number().int().nonnegative().optional().default(0),
    effectiveDate: isoDateSchema,
    externalRef: optionalText,
    state: optionalText,
    productCode: optionalText,
});
exports.importPayoutStatementInputSchema = zod_1.z
    .object({
    carrierId: zod_1.z.string().trim().min(1),
    label: zod_1.z.string().trim().min(1).max(200),
    periodStart: isoDateSchema,
    periodEnd: isoDateSchema,
    templateKey: zod_1.z.string().trim().min(1).max(120).default("canonical-v1"),
    fileName: zod_1.z.string().trim().min(1).max(255),
    fileSha256: optionalText,
    lines: zod_1.z.array(exports.payoutStatementLineInputSchema).min(1).max(5000),
})
    .superRefine((value, ctx) => {
    if (value.periodEnd < value.periodStart) {
        ctx.addIssue({
            code: "custom",
            path: ["periodEnd"],
            message: "periodEnd must be on or after periodStart.",
        });
    }
});
