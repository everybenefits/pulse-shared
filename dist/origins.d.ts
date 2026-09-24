/**
 * Canonical browser origins for Pulse-family apps.
 * Callables CORS, SSO allowlists, and CSP form/connect extras share this list.
 */
export declare const PRODUCTION_APP_ORIGINS: readonly ["https://every-insurance.web.app", "https://every-insurance.firebaseapp.com", "https://pulse.everybenefits.us", "https://studio.everybenefits.us", "https://admin.everybenefits.us", "https://payments.everybenefits.us", "https://developers.everybenefits.us", "https://pulse-web-app--every-benefits-us.us-central1.hosted.app", "https://studio-web-app--every-benefits-us.us-central1.hosted.app", "https://admin-web-app--every-benefits-us.us-central1.hosted.app", "https://payments-web-app--every-benefits-us.us-central1.hosted.app", "https://payments--every-benefits-us.us-east4.hosted.app", "https://developers--every-benefits-us.us-east4.hosted.app", "https://developers-web-app--every-benefits-us.us-central1.hosted.app"];
export declare const LOCAL_DEV_APP_ORIGINS: readonly ["http://localhost:3000", "http://127.0.0.1:3000", "http://localhost:3001", "http://127.0.0.1:3001", "http://localhost:3002", "http://127.0.0.1:3002", "http://localhost:3004", "http://127.0.0.1:3004", "http://localhost:3005", "http://127.0.0.1:3005"];
export declare const APP_HOSTING_PREVIEW_SUFFIX = "-every-benefits-us.us-central1.hosted.app";
/** Matches Firebase App Hosting preview hosts only (not arbitrary `endsWith`). */
export declare const APP_HOSTING_PREVIEW_ORIGIN_RE: RegExp;
/**
 * True for App Hosting preview URLs.
 * In production, callers should also require `PULSE_SSO_ALLOW_PREVIEWS=true`
 * before trusting these for SSO return URLs.
 */
export declare function isAppHostingPreviewOrigin(origin: string): boolean;
/** Space-separated production origins for CSP directives. */
export declare function productionAppOriginsCsp(): string;
//# sourceMappingURL=origins.d.ts.map