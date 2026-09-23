import {
  canAccessAdmin,
  canAccessPayments,
  canAccessStudio,
  type RoleOrPermissions,
} from "../roles";
import type { ReleaseAppId, ReleaseNoteEntry, ReleaseNoteLocale } from "./types";
import { PUBLIC_RELEASE_APPS } from "./types";

export function sortReleaseNotes(entries: ReleaseNoteEntry[]): ReleaseNoteEntry[] {
  return [...entries].sort((a, b) => {
    const pinA = a.pinned ? 1 : 0;
    const pinB = b.pinned ? 1 : 0;
    if (pinA !== pinB) return pinB - pinA;
    return b.publishedAt - a.publishedAt;
  });
}

/** CMS wins over git when slug collides. */
export function mergeReleaseNotes(
  staticEntries: ReleaseNoteEntry[],
  cmsEntries: ReleaseNoteEntry[],
): ReleaseNoteEntry[] {
  const bySlug = new Map<string, ReleaseNoteEntry>();
  for (const entry of staticEntries) {
    bySlug.set(entry.slug, entry);
  }
  for (const entry of cmsEntries) {
    bySlug.set(entry.slug, entry);
  }
  return sortReleaseNotes([...bySlug.values()]);
}

export function listVisibleReleaseApps(
  roleOrPermissions?: RoleOrPermissions,
): ReleaseAppId[] {
  const apps: ReleaseAppId[] = [...PUBLIC_RELEASE_APPS];
  if (roleOrPermissions && canAccessStudio(roleOrPermissions)) {
    apps.push("studio");
  }
  if (roleOrPermissions && canAccessAdmin(roleOrPermissions)) {
    apps.push("admin");
  }
  if (roleOrPermissions && canAccessPayments(roleOrPermissions)) {
    apps.push("payments");
  }
  return apps;
}

export function filterReleaseNotesByVisibleApps(
  entries: ReleaseNoteEntry[],
  roleOrPermissions?: RoleOrPermissions,
): ReleaseNoteEntry[] {
  const allowed = new Set(listVisibleReleaseApps(roleOrPermissions));
  return entries.filter((entry) => allowed.has(entry.app));
}

export function filterReleaseNotesByApp(
  entries: ReleaseNoteEntry[],
  app: ReleaseAppId | "all",
): ReleaseNoteEntry[] {
  if (app === "all") return entries;
  return entries.filter((entry) => entry.app === app);
}

export function findReleaseNoteBySlug(
  entries: ReleaseNoteEntry[],
  slug: string,
): ReleaseNoteEntry | undefined {
  return entries.find((entry) => entry.slug === slug);
}

export function localizedReleaseText(
  value: Record<ReleaseNoteLocale, string> | undefined,
  locale: ReleaseNoteLocale,
  fallbackLocale: ReleaseNoteLocale = "en",
): string {
  if (!value) return "";
  return value[locale]?.trim() || value[fallbackLocale]?.trim() || "";
}

export function formatReleaseDate(
  publishedAt: number,
  locale: ReleaseNoteLocale,
): string {
  return new Intl.DateTimeFormat(locale === "es" ? "es-US" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(publishedAt));
}
