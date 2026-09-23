import { describe, expect, it } from "vitest";
import {
  filterReleaseNotesByVisibleApps,
  mergeReleaseNotes,
  sortReleaseNotes,
} from "./match";
import type { ReleaseNoteEntry } from "./types";

function note(
  partial: Partial<ReleaseNoteEntry> & Pick<ReleaseNoteEntry, "slug" | "app">,
): ReleaseNoteEntry {
  return {
    id: partial.id ?? partial.slug,
    version: partial.version ?? "1.0.0",
    publishedAt: partial.publishedAt ?? 1_000,
    source: partial.source ?? "git",
    title: partial.title ?? { en: partial.slug, es: partial.slug },
    bodyMarkdown: partial.bodyMarkdown ?? { en: "body", es: "cuerpo" },
    ...partial,
  };
}

describe("mergeReleaseNotes", () => {
  it("dedupes by slug with CMS winning", () => {
    const staticEntries = [
      note({ slug: "pulse-1-0-0", app: "pulse", source: "git", version: "1.0.0" }),
    ];
    const cmsEntries = [
      note({
        slug: "pulse-1-0-0",
        app: "pulse",
        source: "cms",
        version: "1.0.1",
      }),
    ];
    const merged = mergeReleaseNotes(staticEntries, cmsEntries);
    expect(merged).toHaveLength(1);
    expect(merged[0]?.source).toBe("cms");
    expect(merged[0]?.version).toBe("1.0.1");
  });

  it("sorts pinned first then publishedAt desc", () => {
    const merged = sortReleaseNotes([
      note({ slug: "a", app: "pulse", publishedAt: 100 }),
      note({ slug: "b", app: "pulse", publishedAt: 300, pinned: true }),
      note({ slug: "c", app: "pulse", publishedAt: 200 }),
    ]);
    expect(merged.map((entry) => entry.slug)).toEqual(["b", "c", "a"]);
  });
});

describe("filterReleaseNotesByVisibleApps", () => {
  it("shows pulse and mobile publicly", () => {
    const entries = [
      note({ slug: "p", app: "pulse" }),
      note({ slug: "m", app: "mobile" }),
      note({ slug: "s", app: "studio" }),
    ];
    const visible = filterReleaseNotesByVisibleApps(entries);
    expect(visible.map((entry) => entry.app)).toEqual(["pulse", "mobile"]);
  });

  it("includes studio for studio access", () => {
    const entries = [note({ slug: "s", app: "studio" })];
    const visible = filterReleaseNotesByVisibleApps(entries, "instructor");
    expect(visible).toHaveLength(1);
  });
});
