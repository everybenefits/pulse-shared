import type { PulseAppId } from "../apps";
export declare const RELEASE_APPS: readonly ["pulse", "mobile", "studio", "admin", "payments"];
export type ReleaseAppId = PulseAppId | "mobile";
export declare const RELEASE_NOTE_SOURCES: readonly ["git", "cms"];
export type ReleaseNoteSource = (typeof RELEASE_NOTE_SOURCES)[number];
export declare const RELEASE_HIGHLIGHT_KINDS: readonly ["feature", "fix", "improvement", "breaking"];
export type ReleaseHighlightKind = (typeof RELEASE_HIGHLIGHT_KINDS)[number];
export declare const RELEASE_NOTE_LOCALES: readonly ["en", "es"];
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
export declare const PUBLIC_RELEASE_APPS: readonly ReleaseAppId[];
export declare function isReleaseAppId(value: string): value is ReleaseAppId;
//# sourceMappingURL=types.d.ts.map