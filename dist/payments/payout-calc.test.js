"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const payout_calc_1 = require("./payout-calc");
const payees = [
    { id: "agency-a", name: "Agency A", kind: "agency", npn: "123", active: true },
    { id: "agent-b", name: "Agent B", kind: "agent", npn: "456", active: true },
];
const identifiers = [
    {
        id: "identifier-a",
        payeeId: "agency-a",
        carrierId: "carrier-a",
        value: "FB-100",
        normalizedValue: "FB-100",
        active: true,
    },
];
const tiers = [
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
const assignments = [
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
const line = {
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
(0, vitest_1.describe)("standalone payout calculation", () => {
    (0, vitest_1.it)("normalizes exact carrier identifiers", () => {
        (0, vitest_1.expect)((0, payout_calc_1.normalizePayoutIdentifier)(" fb  - 100 ")).toBe("FB-100");
    });
    (0, vitest_1.it)("uses the carrier identifier before NPN and calculates PMPM", () => {
        const result = (0, payout_calc_1.runStandalonePayoutCalculation)({
            carrierId: "carrier-a",
            lines: [line],
            payees,
            identifiers,
            tiers,
            assignments,
        });
        (0, vitest_1.expect)(result.exceptions).toEqual([]);
        (0, vitest_1.expect)(result.allocations).toHaveLength(1);
        (0, vitest_1.expect)(result.allocations[0]?.payeeId).toBe("agency-a");
        (0, vitest_1.expect)(result.totalPayableCents).toBe(76_200);
    });
    (0, vitest_1.it)("calculates percentages in integer basis points", () => {
        (0, vitest_1.expect)((0, payout_calc_1.calculateTierAmountCents)({
            tier: {
                ...tiers[0],
                id: "percent",
                method: "percent",
                rateCents: null,
                rateBasisPoints: 1250,
            },
            line: { ...line, baseAmountCents: 10_001 },
        })).toBe(1_250);
    });
    (0, vitest_1.it)("creates a blocking exception instead of guessing a payee", () => {
        const result = (0, payout_calc_1.runStandalonePayoutCalculation)({
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
        (0, vitest_1.expect)(result.allocations).toEqual([]);
        (0, vitest_1.expect)(result.exceptions[0]?.code).toBe("PAYEE_NOT_FOUND");
    });
    (0, vitest_1.it)("rejects overlapping effective assignments", () => {
        const result = (0, payout_calc_1.runStandalonePayoutCalculation)({
            carrierId: "carrier-a",
            lines: [line],
            payees,
            identifiers,
            tiers,
            assignments: [
                ...assignments,
                { ...assignments[0], id: "assignment-overlap" },
            ],
        });
        (0, vitest_1.expect)(result.allocations).toEqual([]);
        (0, vitest_1.expect)(result.exceptions[0]?.code).toBe("AMBIGUOUS_ASSIGNMENT");
    });
});
