"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const match_1 = require("./match");
function note(partial) {
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
(0, vitest_1.describe)("mergeReleaseNotes", () => {
    (0, vitest_1.it)("dedupes by slug with CMS winning", () => {
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
        const merged = (0, match_1.mergeReleaseNotes)(staticEntries, cmsEntries);
        (0, vitest_1.expect)(merged).toHaveLength(1);
        (0, vitest_1.expect)(merged[0]?.source).toBe("cms");
        (0, vitest_1.expect)(merged[0]?.version).toBe("1.0.1");
    });
    (0, vitest_1.it)("sorts pinned first then publishedAt desc", () => {
        const merged = (0, match_1.sortReleaseNotes)([
            note({ slug: "a", app: "pulse", publishedAt: 100 }),
            note({ slug: "b", app: "pulse", publishedAt: 300, pinned: true }),
            note({ slug: "c", app: "pulse", publishedAt: 200 }),
        ]);
        (0, vitest_1.expect)(merged.map((entry) => entry.slug)).toEqual(["b", "c", "a"]);
    });
});
(0, vitest_1.describe)("filterReleaseNotesByVisibleApps", () => {
    (0, vitest_1.it)("shows pulse and mobile publicly", () => {
        const entries = [
            note({ slug: "p", app: "pulse" }),
            note({ slug: "m", app: "mobile" }),
            note({ slug: "s", app: "studio" }),
        ];
        const visible = (0, match_1.filterReleaseNotesByVisibleApps)(entries);
        (0, vitest_1.expect)(visible.map((entry) => entry.app)).toEqual(["pulse", "mobile"]);
    });
    (0, vitest_1.it)("includes studio for studio access", () => {
        const entries = [note({ slug: "s", app: "studio" })];
        const visible = (0, match_1.filterReleaseNotesByVisibleApps)(entries, "instructor");
        (0, vitest_1.expect)(visible).toHaveLength(1);
    });
});
