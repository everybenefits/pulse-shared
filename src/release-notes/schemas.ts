import { z } from "zod";
import {
  RELEASE_APPS,
  RELEASE_HIGHLIGHT_KINDS,
  RELEASE_NOTE_LOCALES,
} from "./types";

const localizedRequired = z.object({
  en: z.string().trim().min(1).max(200),
  es: z.string().trim().min(1).max(200),
});

const localizedOptional = z.object({
  en: z.string().trim().max(280),
  es: z.string().trim().max(280),
});

const localizedBody = z.object({
  en: z.string().trim().min(1).max(50_000),
  es: z.string().trim().min(1).max(50_000),
});

const highlightSchema = z.object({
  kind: z.enum(RELEASE_HIGHLIGHT_KINDS),
  text: localizedRequired,
});

export const releaseNoteSlugSchema = z
  .string()
  .trim()
  .regex(/^[a-z0-9][a-z0-9-]{0,80}$/i, "Invalid slug");

export const releaseNoteEntrySchema = z.object({
  id: z.string().trim().min(1).max(120),
  app: z.enum(RELEASE_APPS),
  version: z.string().trim().min(1).max(40),
  slug: releaseNoteSlugSchema,
  publishedAt: z.number().int().positive(),
  pinned: z.boolean().optional(),
  source: z.enum(["git", "cms"]),
  title: localizedRequired,
  summary: localizedOptional.optional(),
  bodyMarkdown: localizedBody,
  highlights: z.array(highlightSchema).max(24).optional(),
});

export const releaseNoteStaticMetaSchema = releaseNoteEntrySchema
  .omit({ bodyMarkdown: true, source: true })
  .extend({
    source: z.literal("git").optional(),
  });

export const releaseNoteUpsertSchema = z.object({
  id: z.string().trim().max(120).optional(),
  app: z.enum(RELEASE_APPS),
  version: z.string().trim().min(1).max(40),
  slug: releaseNoteSlugSchema,
  published: z.boolean().optional(),
  pinned: z.boolean().optional(),
  publishedAt: z.number().int().positive().optional(),
  title: localizedRequired,
  summary: localizedOptional.optional(),
  bodyMarkdown: localizedBody,
  highlights: z.array(highlightSchema).max(24).optional(),
});

export type ReleaseNoteUpsertInput = z.infer<typeof releaseNoteUpsertSchema>;
