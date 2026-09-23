import { type RoleOrPermissions } from "../roles";
import type { ReleaseAppId, ReleaseNoteEntry, ReleaseNoteLocale } from "./types";
export declare function sortReleaseNotes(entries: ReleaseNoteEntry[]): ReleaseNoteEntry[];
/** CMS wins over git when slug collides. */
export declare function mergeReleaseNotes(staticEntries: ReleaseNoteEntry[], cmsEntries: ReleaseNoteEntry[]): ReleaseNoteEntry[];
export declare function listVisibleReleaseApps(roleOrPermissions?: RoleOrPermissions): ReleaseAppId[];
export declare function filterReleaseNotesByVisibleApps(entries: ReleaseNoteEntry[], roleOrPermissions?: RoleOrPermissions): ReleaseNoteEntry[];
export declare function filterReleaseNotesByApp(entries: ReleaseNoteEntry[], app: ReleaseAppId | "all"): ReleaseNoteEntry[];
export declare function findReleaseNoteBySlug(entries: ReleaseNoteEntry[], slug: string): ReleaseNoteEntry | undefined;
export declare function localizedReleaseText(value: Record<ReleaseNoteLocale, string> | undefined, locale: ReleaseNoteLocale, fallbackLocale?: ReleaseNoteLocale): string;
export declare function formatReleaseDate(publishedAt: number, locale: ReleaseNoteLocale): string;
//# sourceMappingURL=match.d.ts.map