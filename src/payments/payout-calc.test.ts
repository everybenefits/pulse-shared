import { describe, expect, it } from "vitest";
import {
  calculateTierAmountCents,
  normalizePayoutIdentifier,
  runStandalonePayoutCalculation,
} from "./payout-calc";
import type {
  PayoutCarrierPayeeIdentifier,
  PayoutPayee,
  PayoutRateAssignment,
  PayoutStatementLineInput,
  PayoutTier,
} from "./payout-types";

const payees: PayoutPayee[] = [
  { id: "agency-a", name: "Agency A", kind: "agency", npn: "123", active: true },
  { id: "agent-b", name: "Agent B", kind: "agent", npn: "456", active: true },
];

const identifiers: PayoutCarrierPayeeIdentifier[] = [
  {
    id: "identifier-a",
    payeeId: "agency-a",
    carrierId: "carrier-a",
    value: "FB-100",
    normalizedValue: "FB-100",
    active: true,
  },
];

const tiers: PayoutTier[] = [
  {
    id: "tier-pmpm",
    carrierId: "carrier-a",
    name: "Gold",
    method: "pmpm",
    rateCents: 600,
    rateBasisPoints: null,
    version: 1,
    effectiveFrom: "2026-01-01",
    effectiveTo: null,
    active: true,
  },
];

const assignments: PayoutRateAssignment[] = [
  {
    id: "assignment-a",
    payeeId: "agency-a",
    carrierId: "carrier-a",
    tierId: "tier-pmpm",
    effectiveFrom: "2026-01-01",
    effectiveTo: null,
    active: true,
  },
];

const line: PayoutStatementLineInput = {
  carrierPayeeIdentifier: " fb-100 ",
  npn: "456",
  producerName: "Wrong NPN candidate",
  quantity: 127,
  baseAmountCents: 0,
  effectiveDate: "2026-07-01",
  externalRef: "row-1",
  state: "FL",
  productCode: "ACA",
};

describe("standalone payout calculation", () => {
  it("normalizes exact carrier identifiers", () => {
    expect(normalizePayoutIdentifier(" fb  - 100 ")).toBe("FB-100");
  });

  it("uses the carrier identifier before NPN and calculates PMPM", () => {
    const result = runStandalonePayoutCalculation({
      carrierId: "carrier-a",
      lines: [line],
      payees,
      identifiers,
      tiers,
      assignments,
    });

    expect(result.exceptions).toEqual([]);
    expect(result.allocations).toHaveLength(1);
    expect(result.allocations[0]?.payeeId).toBe("agency-a");
    expect(result.totalPayableCents).toBe(76_200);
  });

  it("calculates percentages in integer basis points", () => {
    expect(
      calculateTierAmountCents({
        tier: {
          ...tiers[0]!,
          id: "percent",
          method: "percent",
          rateCents: null,
          rateBasisPoints: 1250,
        },
        line: { ...line, baseAmountCents: 10_001 },
      }),
    ).toBe(1_250);
  });

  it("creates a blocking exception instead of guessing a payee", () => {
    const result = runStandalonePayoutCalculation({
      carrierId: "carrier-a",
      lines: [
        {
          ...line,
          carrierPayeeIdentifier: "unknown",
          npn: "unknown",
        },
      ],
      payees,
      identifiers,
      tiers,
      assignments,
    });

    expect(result.allocations).toEqual([]);
    expect(result.exceptions[0]?.code).toBe("PAYEE_NOT_FOUND");
  });

  it("rejects overlapping effective assignments", () => {
    const result = runStandalonePayoutCalculation({
      carrierId: "carrier-a",
      lines: [line],
      payees,
      identifiers,
      tiers,
      assignments: [
        ...assignments,
        { ...assignments[0]!, id: "assignment-overlap" },
      ],
    });

    expect(result.allocations).toEqual([]);
    expect(result.exceptions[0]?.code).toBe("AMBIGUOUS_ASSIGNMENT");
  });
});
