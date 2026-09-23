"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizePayoutIdentifier = normalizePayoutIdentifier;
exports.calculateTierAmountCents = calculateTierAmountCents;
exports.runStandalonePayoutCalculation = runStandalonePayoutCalculation;
const money_1 = require("./money");
function normalizePayoutIdentifier(value) {
    return value.trim().toUpperCase().replace(/\s+/g, "");
}
function activeOn(value, date) {
    return (value.active &&
        value.effectiveFrom <= date &&
        (!value.effectiveTo || value.effectiveTo >= date));
}
function multiplySafe(left, right) {
    if (!Number.isSafeInteger(left) || !Number.isSafeInteger(right)) {
        throw new Error("Calculation inputs must be safe integers.");
    }
    const product = left * right;
    if (!Number.isSafeInteger(product)) {
        throw new Error("Calculated amount exceeds the safe integer range.");
    }
    return product;
}
function roundRatioHalfAwayFromZero(numerator, denominator) {
    if (!Number.isSafeInteger(numerator) || denominator <= 0) {
        throw new Error("Invalid integer ratio.");
    }
    const sign = numerator < 0 ? -1 : 1;
    const value = Math.round(Math.abs(numerator) / denominator) * sign;
    if (!Number.isSafeInteger(value)) {
        throw new Error("Calculated amount exceeds the safe integer range.");
    }
    return value;
}
function calculateTierAmountCents(args) {
    const { tier, line } = args;
    if (tier.method === "pmpm") {
        if (tier.rateCents == null || !Number.isSafeInteger(tier.rateCents)) {
            throw new Error("PMPM tier has no valid rateCents.");
        }
        return roundRatioHalfAwayFromZero(multiplySafe(tier.rateCents, line.quantity), 1);
    }
    if (tier.method === "flat") {
        if (tier.rateCents == null || !Number.isSafeInteger(tier.rateCents)) {
            throw new Error("Flat tier has no valid rateCents.");
        }
        return (0, money_1.asCents)(tier.rateCents);
    }
    if (tier.rateBasisPoints == null ||
        !Number.isSafeInteger(tier.rateBasisPoints) ||
        !Number.isSafeInteger(line.baseAmountCents)) {
        throw new Error("Percent tier has invalid calculation inputs.");
    }
    return roundRatioHalfAwayFromZero(multiplySafe(line.baseAmountCents, tier.rateBasisPoints), 10_000);
}
function matchPayee(args) {
    const activePayees = args.payees.filter((payee) => payee.active);
    const byId = new Map(activePayees.map((payee) => [payee.id, payee]));
    if (args.line.carrierPayeeIdentifier) {
        const normalized = normalizePayoutIdentifier(args.line.carrierPayeeIdentifier);
        const matches = args.identifiers
            .filter((identifier) => identifier.active &&
            identifier.carrierId === args.carrierId &&
            identifier.normalizedValue === normalized)
            .map((identifier) => byId.get(identifier.payeeId))
            .filter((payee) => Boolean(payee));
        const unique = Array.from(new Map(matches.map((p) => [p.id, p])).values());
        if (unique.length === 1)
            return { payee: unique[0] };
        if (unique.length > 1) {
            return {
                payee: null,
                code: "AMBIGUOUS_PAYEE",
                message: "Carrier identifier matches multiple active payees.",
            };
        }
    }
    if (args.line.npn) {
        const normalizedNpn = normalizePayoutIdentifier(args.line.npn);
        const matches = activePayees.filter((payee) => payee.npn != null &&
            normalizePayoutIdentifier(payee.npn) === normalizedNpn);
        if (matches.length === 1)
            return { payee: matches[0] };
        if (matches.length > 1) {
            return {
                payee: null,
                code: "AMBIGUOUS_PAYEE",
                message: "NPN matches multiple active payees.",
            };
        }
    }
    return {
        payee: null,
        code: "PAYEE_NOT_FOUND",
        message: "No active payee matched the carrier identifier or NPN.",
    };
}
function runStandalonePayoutCalculation(args) {
    const allocations = [];
    const exceptions = [];
    args.lines.forEach((line, lineIndex) => {
        const sourceRowNumber = lineIndex + 2;
        const matched = matchPayee({
            line,
            carrierId: args.carrierId,
            payees: args.payees,
            identifiers: args.identifiers,
        });
        if (!matched.payee) {
            exceptions.push({
                lineIndex,
                sourceRowNumber,
                code: matched.code ?? "PAYEE_NOT_FOUND",
                message: matched.message ?? "Payee not found.",
            });
            return;
        }
        const matchingAssignments = args.assignments.filter((assignment) => assignment.payeeId === matched.payee.id &&
            assignment.carrierId === args.carrierId &&
            activeOn(assignment, line.effectiveDate));
        if (matchingAssignments.length === 0) {
            exceptions.push({
                lineIndex,
                sourceRowNumber,
                code: "ASSIGNMENT_NOT_FOUND",
                message: "No active tier assignment exists for the effective date.",
            });
            return;
        }
        if (matchingAssignments.length > 1) {
            exceptions.push({
                lineIndex,
                sourceRowNumber,
                code: "AMBIGUOUS_ASSIGNMENT",
                message: "Multiple tier assignments overlap for the effective date.",
            });
            return;
        }
        const assignment = matchingAssignments[0];
        const tier = args.tiers.find((candidate) => candidate.id === assignment.tierId &&
            candidate.carrierId === args.carrierId &&
            activeOn(candidate, line.effectiveDate));
        if (!tier) {
            exceptions.push({
                lineIndex,
                sourceRowNumber,
                code: "TIER_NOT_FOUND",
                message: "The assigned tier is missing or inactive for this date.",
            });
            return;
        }
        try {
            const amountCents = calculateTierAmountCents({ tier, line });
            allocations.push({
                lineIndex,
                sourceRowNumber,
                payeeId: matched.payee.id,
                carrierId: args.carrierId,
                assignmentId: assignment.id,
                tierId: tier.id,
                tierVersion: tier.version,
                method: tier.method,
                quantity: line.quantity,
                baseAmountCents: line.baseAmountCents,
                rateCents: tier.rateCents,
                rateBasisPoints: tier.rateBasisPoints,
                amountCents,
            });
        }
        catch (error) {
            exceptions.push({
                lineIndex,
                sourceRowNumber,
                code: "INVALID_CALCULATION_INPUT",
                message: error instanceof Error ? error.message : "Invalid calculation input.",
            });
        }
    });
    const totals = new Map();
    for (const allocation of allocations) {
        totals.set(allocation.payeeId, (totals.get(allocation.payeeId) ?? 0) + allocation.amountCents);
    }
    return {
        allocations,
        exceptions,
        totalPayableCents: (0, money_1.sumCents)(allocations.map((a) => a.amountCents)),
        totalsByPayee: Array.from(totals, ([payeeId, amountCents]) => ({
            payeeId,
            amountCents,
        })).sort((a, b) => b.amountCents - a.amountCents),
    };
}
