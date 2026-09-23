"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PUBLIC_RELEASE_APPS = exports.RELEASE_NOTE_LOCALES = exports.RELEASE_HIGHLIGHT_KINDS = exports.RELEASE_NOTE_SOURCES = exports.RELEASE_APPS = void 0;
exports.isReleaseAppId = isReleaseAppId;
exports.RELEASE_APPS = [
    "pulse",
    "mobile",
    "studio",
    "admin",
    "payments",
];
exports.RELEASE_NOTE_SOURCES = ["git", "cms"];
exports.RELEASE_HIGHLIGHT_KINDS = [
    "feature",
    "fix",
    "improvement",
    "breaking",
];
exports.RELEASE_NOTE_LOCALES = ["en", "es"];
/** Apps visible on the public /updates page without authentication. */
exports.PUBLIC_RELEASE_APPS = [
    "pulse",
    "mobile",
];
function isReleaseAppId(value) {
    return exports.RELEASE_APPS.includes(value);
}
