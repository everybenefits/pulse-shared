"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PAYOUT_EXCEPTION_CODES = exports.PAYOUT_RUN_STATUSES = exports.PAYOUT_RATE_METHODS = exports.PAYOUT_PAYEE_KINDS = void 0;
exports.PAYOUT_PAYEE_KINDS = ["agency", "agent"];
exports.PAYOUT_RATE_METHODS = ["pmpm", "flat", "percent"];
exports.PAYOUT_RUN_STATUSES = [
    "processing",
    "review",
    "calculated",
    "failed",
];
exports.PAYOUT_EXCEPTION_CODES = [
    "PAYEE_NOT_FOUND",
    "AMBIGUOUS_PAYEE",
    "ASSIGNMENT_NOT_FOUND",
    "AMBIGUOUS_ASSIGNMENT",
    "TIER_NOT_FOUND",
    "INVALID_CALCULATION_INPUT",
];
