"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sortReleaseNotes = sortReleaseNotes;
exports.mergeReleaseNotes = mergeReleaseNotes;
exports.listVisibleReleaseApps = listVisibleReleaseApps;
exports.filterReleaseNotesByVisibleApps = filterReleaseNotesByVisibleApps;
exports.filterReleaseNotesByApp = filterReleaseNotesByApp;
exports.findReleaseNoteBySlug = findReleaseNoteBySlug;
exports.localizedReleaseText = localizedReleaseText;
exports.formatReleaseDate = formatReleaseDate;
const roles_1 = require("../roles");
const types_1 = require("./types");
function sortReleaseNotes(entries) {
    return [...entries].sort((a, b) => {
        const pinA = a.pinned ? 1 : 0;
        const pinB = b.pinned ? 1 : 0;
        if (pinA !== pinB)
            return pinB - pinA;
        return b.publishedAt - a.publishedAt;
    });
}
/** CMS wins over git when slug collides. */
function mergeReleaseNotes(staticEntries, cmsEntries) {
    const bySlug = new Map();
    for (const entry of staticEntries) {
        bySlug.set(entry.slug, entry);
    }
    for (const entry of cmsEntries) {
        bySlug.set(entry.slug, entry);
    }
    return sortReleaseNotes([...bySlug.values()]);
}
function listVisibleReleaseApps(roleOrPermissions) {
    const apps = [...types_1.PUBLIC_RELEASE_APPS];
    if (roleOrPermissions && (0, roles_1.canAccessStudio)(roleOrPermissions)) {
        apps.push("studio");
    }
    if (roleOrPermissions && (0, roles_1.canAccessAdmin)(roleOrPermissions)) {
        apps.push("admin");
    }
    if (roleOrPermissions && (0, roles_1.canAccessPayments)(roleOrPermissions)) {
        apps.push("payments");
    }
    return apps;
}
function filterReleaseNotesByVisibleApps(entries, roleOrPermissions) {
    const allowed = new Set(listVisibleReleaseApps(roleOrPermissions));
    return entries.filter((entry) => allowed.has(entry.app));
}
function filterReleaseNotesByApp(entries, app) {
    if (app === "all")
        return entries;
    return entries.filter((entry) => entry.app === app);
}
function findReleaseNoteBySlug(entries, slug) {
    return entries.find((entry) => entry.slug === slug);
}
function localizedReleaseText(value, locale, fallbackLocale = "en") {
    if (!value)
        return "";
    return value[locale]?.trim() || value[fallbackLocale]?.trim() || "";
}
function formatReleaseDate(publishedAt, locale) {
    return new Intl.DateTimeFormat(locale === "es" ? "es-US" : "en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    }).format(new Date(publishedAt));
}
