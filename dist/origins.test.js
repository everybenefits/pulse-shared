"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const origins_1 = require("./origins");
const csp_1 = require("./csp");
(0, vitest_1.describe)("origins inventory", () => {
    (0, vitest_1.it)("includes production custom domains", () => {
        (0, vitest_1.expect)(origins_1.PRODUCTION_APP_ORIGINS).toContain("https://pulse.everybenefits.us");
        (0, vitest_1.expect)(origins_1.PRODUCTION_APP_ORIGINS).toContain("https://admin.everybenefits.us");
        (0, vitest_1.expect)(origins_1.PRODUCTION_APP_ORIGINS).toContain("https://payments.everybenefits.us");
        (0, vitest_1.expect)(origins_1.PRODUCTION_APP_ORIGINS).toContain("https://developers.everybenefits.us");
    });
    (0, vitest_1.it)("recognizes App Hosting preview hosts via strict regex", () => {
        (0, vitest_1.expect)((0, origins_1.isAppHostingPreviewOrigin)("https://pulse-web-app--pr12-abcd-every-benefits-us.us-central1.hosted.app")).toBe(true);
        (0, vitest_1.expect)((0, origins_1.isAppHostingPreviewOrigin)("https://evil.example")).toBe(false);
    });
    (0, vitest_1.it)("rejects non-preview hosts that merely end with the App Hosting suffix", () => {
        (0, vitest_1.expect)((0, origins_1.isAppHostingPreviewOrigin)("https://evil-every-benefits-us.us-central1.hosted.app.attacker.com")).toBe(false);
        (0, vitest_1.expect)((0, origins_1.isAppHostingPreviewOrigin)("https://not-a-preview.example/every-benefits-us.us-central1.hosted.app")).toBe(false);
    });
    (0, vitest_1.it)("adds production origins to CSP connect/form-action", () => {
        const csp = (0, csp_1.buildContentSecurityPolicy)({ includeEmulators: false });
        (0, vitest_1.expect)(csp).toContain("https://pulse.everybenefits.us");
        (0, vitest_1.expect)((0, origins_1.productionAppOriginsCsp)()).toContain("https://studio.everybenefits.us");
    });
});
