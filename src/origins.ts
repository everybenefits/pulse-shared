/**
 * Canonical browser origins for Pulse-family apps.
 * Callables CORS, SSO allowlists, and CSP form/connect extras share this list.
 */

export const PRODUCTION_APP_ORIGINS = [
  "https://every-insurance.web.app",
  "https://every-insurance.firebaseapp.com",
  "https://pulse.everybenefits.us",
  "https://studio.everybenefits.us",
  "https://admin.everybenefits.us",
  "https://payments.everybenefits.us",
  "https://developers.everybenefits.us",
  "https://pulse-web-app--every-benefits-us.us-central1.hosted.app",
  "https://studio-web-app--every-benefits-us.us-central1.hosted.app",
  "https://admin-web-app--every-benefits-us.us-central1.hosted.app",
  "https://payments-web-app--every-benefits-us.us-central1.hosted.app",
  "https://payments--every-benefits-us.us-east4.hosted.app",
  "https://developers--every-benefits-us.us-east4.hosted.app",
  "https://developers-web-app--every-benefits-us.us-central1.hosted.app",
] as const;

export const LOCAL_DEV_APP_ORIGINS = [
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  "http://localhost:3001",
  "http://127.0.0.1:3001",
  "http://localhost:3002",
  "http://127.0.0.1:3002",
  "http://localhost:3004",
  "http://127.0.0.1:3004",
  "http://localhost:3005",
  "http://127.0.0.1:3005",
] as const;

export const APP_HOSTING_PREVIEW_SUFFIX =
  "-every-benefits-us.us-central1.hosted.app";

/** Matches Firebase App Hosting preview hosts only (not arbitrary `endsWith`). */
export const APP_HOSTING_PREVIEW_ORIGIN_RE =
  /^https:\/\/[a-z0-9-]+-every-benefits-us\.us-central1\.hosted\.app$/i;

/**
 * True for App Hosting preview URLs.
 * In production, callers should also require `PULSE_SSO_ALLOW_PREVIEWS=true`
 * before trusting these for SSO return URLs.
 */
export function isAppHostingPreviewOrigin(origin: string): boolean {
  const trimmed = origin.trim();
  return APP_HOSTING_PREVIEW_ORIGIN_RE.test(trimmed);
}

/** Space-separated production origins for CSP directives. */
export function productionAppOriginsCsp(): string {
  return PRODUCTION_APP_ORIGINS.join(" ");
}
