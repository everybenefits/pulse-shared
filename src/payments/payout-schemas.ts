import { z } from "zod";
import {
  PAYOUT_PAYEE_KINDS,
  PAYOUT_RATE_METHODS,
} from "./payout-types";

const isoDateSchema = z
  .string()
  .trim()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Expected YYYY-MM-DD.");

const optionalText = z.preprocess(
  (value) =>
    typeof value === "string" && value.trim() === "" ? null : value,
  z.string().trim().min(1).nullable().optional().default(null),
);

export const payoutPayeeInputSchema = z.object({
  name: z.string().trim().min(1).max(160),
  kind: z.enum(PAYOUT_PAYEE_KINDS),
  npn: optionalText,
  active: z.boolean().optional().default(true),
});

export const payoutCarrierInputSchema = z.object({
  name: z.string().trim().min(1).max(160),
  code: z.string().trim().min(1).max(50),
  active: z.boolean().optional().default(true),
});

export const payoutCarrierIdentifierInputSchema = z.object({
  payeeId: z.string().trim().min(1),
  carrierId: z.string().trim().min(1),
  value: z.string().trim().min(1).max(120),
  active: z.boolean().optional().default(true),
});

export const payoutTierInputSchema = z
  .object({
    carrierId: z.string().trim().min(1),
    name: z.string().trim().min(1).max(160),
    method: z.enum(PAYOUT_RATE_METHODS),
    rateCents: z.number().int().nonnegative().nullable().optional().default(null),
    rateBasisPoints: z
      .number()
      .int()
      .nonnegative()
      .nullable()
      .optional()
      .default(null),
    version: z.number().int().positive().optional().default(1),
    effectiveFrom: isoDateSchema,
    effectiveTo: isoDateSchema.nullable().optional().default(null),
    active: z.boolean().optional().default(true),
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

export const payoutRateAssignmentInputSchema = z
  .object({
    payeeId: z.string().trim().min(1),
    carrierId: z.string().trim().min(1),
    tierId: z.string().trim().min(1),
    effectiveFrom: isoDateSchema,
    effectiveTo: isoDateSchema.nullable().optional().default(null),
    active: z.boolean().optional().default(true),
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

export const payoutStatementLineInputSchema = z.object({
  carrierPayeeIdentifier: optionalText,
  npn: optionalText,
  producerName: optionalText,
  quantity: z.number().int().nonnegative().optional().default(0),
  baseAmountCents: z.number().int().nonnegative().optional().default(0),
  effectiveDate: isoDateSchema,
  externalRef: optionalText,
  state: optionalText,
  productCode: optionalText,
});

export const importPayoutStatementInputSchema = z
  .object({
    carrierId: z.string().trim().min(1),
    label: z.string().trim().min(1).max(200),
    periodStart: isoDateSchema,
    periodEnd: isoDateSchema,
    templateKey: z.string().trim().min(1).max(120).default("canonical-v1"),
    fileName: z.string().trim().min(1).max(255),
    fileSha256: optionalText,
    lines: z.array(payoutStatementLineInputSchema).min(1).max(5000),
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
