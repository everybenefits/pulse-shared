"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.releaseNoteUpsertSchema = exports.releaseNoteStaticMetaSchema = exports.releaseNoteEntrySchema = exports.releaseNoteSlugSchema = void 0;
const zod_1 = require("zod");
const types_1 = require("./types");
const localizedRequired = zod_1.z.object({
    en: zod_1.z.string().trim().min(1).max(200),
    es: zod_1.z.string().trim().min(1).max(200),
});
const localizedOptional = zod_1.z.object({
    en: zod_1.z.string().trim().max(280),
    es: zod_1.z.string().trim().max(280),
});
const localizedBody = zod_1.z.object({
    en: zod_1.z.string().trim().min(1).max(50_000),
    es: zod_1.z.string().trim().min(1).max(50_000),
});
const highlightSchema = zod_1.z.object({
    kind: zod_1.z.enum(types_1.RELEASE_HIGHLIGHT_KINDS),
    text: localizedRequired,
});
exports.releaseNoteSlugSchema = zod_1.z
    .string()
    .trim()
    .regex(/^[a-z0-9][a-z0-9-]{0,80}$/i, "Invalid slug");
exports.releaseNoteEntrySchema = zod_1.z.object({
    id: zod_1.z.string().trim().min(1).max(120),
    app: zod_1.z.enum(types_1.RELEASE_APPS),
    version: zod_1.z.string().trim().min(1).max(40),
    slug: exports.releaseNoteSlugSchema,
    publishedAt: zod_1.z.number().int().positive(),
    pinned: zod_1.z.boolean().optional(),
    source: zod_1.z.enum(["git", "cms"]),
    title: localizedRequired,
    summary: localizedOptional.optional(),
    bodyMarkdown: localizedBody,
    highlights: zod_1.z.array(highlightSchema).max(24).optional(),
});
exports.releaseNoteStaticMetaSchema = exports.releaseNoteEntrySchema
    .omit({ bodyMarkdown: true, source: true })
    .extend({
    source: zod_1.z.literal("git").optional(),
});
exports.releaseNoteUpsertSchema = zod_1.z.object({
    id: zod_1.z.string().trim().max(120).optional(),
    app: zod_1.z.enum(types_1.RELEASE_APPS),
    version: zod_1.z.string().trim().min(1).max(40),
    slug: exports.releaseNoteSlugSchema,
    published: zod_1.z.boolean().optional(),
    pinned: zod_1.z.boolean().optional(),
    publishedAt: zod_1.z.number().int().positive().optional(),
    title: localizedRequired,
    summary: localizedOptional.optional(),
    bodyMarkdown: localizedBody,
    highlights: zod_1.z.array(highlightSchema).max(24).optional(),
});
