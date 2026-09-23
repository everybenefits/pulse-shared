import type { PulseAppId } from "../apps";

export const RELEASE_APPS = [
  "pulse",
  "mobile",
  "studio",
  "admin",
  "payments",
] as const;

export type ReleaseAppId = PulseAppId | "mobile";

export const RELEASE_NOTE_SOURCES = ["git", "cms"] as const;
export type ReleaseNoteSource = (typeof RELEASE_NOTE_SOURCES)[number];

export const RELEASE_HIGHLIGHT_KINDS = [
  "feature",
  "fix",
  "improvement",
  "breaking",
] as const;
export type ReleaseHighlightKind = (typeof RELEASE_HIGHLIGHT_KINDS)[number];

export const RELEASE_NOTE_LOCALES = ["en", "es"] as const;
export type ReleaseNoteLocale = (typeof RELEASE_NOTE_LOCALES)[number];

export type ReleaseNoteLocalizedString = Record<ReleaseNoteLocale, string>;

export type ReleaseNoteHighlight = {
  kind: ReleaseHighlightKind;
  text: ReleaseNoteLocalizedString;
};

export type ReleaseNoteEntry = {
  id: string;
  app: ReleaseAppId;
  version: string;
  slug: string;
  publishedAt: number;
  pinned?: boolean;
  source: ReleaseNoteSource;
  title: ReleaseNoteLocalizedString;
  summary?: ReleaseNoteLocalizedString;
  bodyMarkdown: ReleaseNoteLocalizedString;
  highlights?: ReleaseNoteHighlight[];
};

/** Apps visible on the public /updates page without authentication. */
export const PUBLIC_RELEASE_APPS: readonly ReleaseAppId[] = [
  "pulse",
  "mobile",
] as const;

export function isReleaseAppId(value: string): value is ReleaseAppId {
  return (RELEASE_APPS as readonly string[]).includes(value);
}
