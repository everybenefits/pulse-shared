import { describe, expect, it } from "vitest";
import {
  PRODUCTION_APP_ORIGINS,
  isAppHostingPreviewOrigin,
  productionAppOriginsCsp,
} from "./origins";
import { buildContentSecurityPolicy } from "./csp";

describe("origins inventory", () => {
  it("includes production custom domains", () => {
    expect(PRODUCTION_APP_ORIGINS).toContain("https://pulse.everybenefits.us");
    expect(PRODUCTION_APP_ORIGINS).toContain("https://admin.everybenefits.us");
    expect(PRODUCTION_APP_ORIGINS).toContain(
      "https://payments.everybenefits.us",
    );
    expect(PRODUCTION_APP_ORIGINS).toContain(
      "https://developers.everybenefits.us",
    );
  });

  it("recognizes App Hosting preview hosts via strict regex", () => {
    expect(
      isAppHostingPreviewOrigin(
        "https://pulse-web-app--pr12-abcd-every-benefits-us.us-central1.hosted.app",
      ),
    ).toBe(true);
    expect(isAppHostingPreviewOrigin("https://evil.example")).toBe(false);
  });

  it("rejects non-preview hosts that merely end with the App Hosting suffix", () => {
    expect(
      isAppHostingPreviewOrigin(
        "https://evil-every-benefits-us.us-central1.hosted.app.attacker.com",
      ),
    ).toBe(false);
    expect(
      isAppHostingPreviewOrigin(
        "https://not-a-preview.example/every-benefits-us.us-central1.hosted.app",
      ),
    ).toBe(false);
  });

  it("adds production origins to CSP connect/form-action", () => {
    const csp = buildContentSecurityPolicy({ includeEmulators: false });
    expect(csp).toContain("https://pulse.everybenefits.us");
    expect(productionAppOriginsCsp()).toContain("https://studio.everybenefits.us");
  });
});
