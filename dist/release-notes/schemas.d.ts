import { z } from "zod";
export declare const releaseNoteSlugSchema: z.ZodString;
export declare const releaseNoteEntrySchema: z.ZodObject<{
    id: z.ZodString;
    app: z.ZodEnum<{
        admin: "admin";
        pulse: "pulse";
        studio: "studio";
        payments: "payments";
        mobile: "mobile";
    }>;
    version: z.ZodString;
    slug: z.ZodString;
    publishedAt: z.ZodNumber;
    pinned: z.ZodOptional<z.ZodBoolean>;
    source: z.ZodEnum<{
        git: "git";
        cms: "cms";
    }>;
    title: z.ZodObject<{
        en: z.ZodString;
        es: z.ZodString;
    }, z.core.$strip>;
    summary: z.ZodOptional<z.ZodObject<{
        en: z.ZodString;
        es: z.ZodString;
    }, z.core.$strip>>;
    bodyMarkdown: z.ZodObject<{
        en: z.ZodString;
        es: z.ZodString;
    }, z.core.$strip>;
    highlights: z.ZodOptional<z.ZodArray<z.ZodObject<{
        kind: z.ZodEnum<{
            feature: "feature";
            fix: "fix";
            improvement: "improvement";
            breaking: "breaking";
        }>;
        text: z.ZodObject<{
            en: z.ZodString;
            es: z.ZodString;
        }, z.core.$strip>;
    }, z.core.$strip>>>;
}, z.core.$strip>;
export declare const releaseNoteStaticMetaSchema: z.ZodObject<{
    id: z.ZodString;
    publishedAt: z.ZodNumber;
    version: z.ZodString;
    title: z.ZodObject<{
        en: z.ZodString;
        es: z.ZodString;
    }, z.core.$strip>;
    slug: z.ZodString;
    app: z.ZodEnum<{
        admin: "admin";
        pulse: "pulse";
        studio: "studio";
        payments: "payments";
        mobile: "mobile";
    }>;
    pinned: z.ZodOptional<z.ZodBoolean>;
    summary: z.ZodOptional<z.ZodObject<{
        en: z.ZodString;
        es: z.ZodString;
    }, z.core.$strip>>;
    highlights: z.ZodOptional<z.ZodArray<z.ZodObject<{
        kind: z.ZodEnum<{
            feature: "feature";
            fix: "fix";
            improvement: "improvement";
            breaking: "breaking";
        }>;
        text: z.ZodObject<{
            en: z.ZodString;
            es: z.ZodString;
        }, z.core.$strip>;
    }, z.core.$strip>>>;
    source: z.ZodOptional<z.ZodLiteral<"git">>;
}, z.core.$strip>;
export declare const releaseNoteUpsertSchema: z.ZodObject<{
    id: z.ZodOptional<z.ZodString>;
    app: z.ZodEnum<{
        admin: "admin";
        pulse: "pulse";
        studio: "studio";
        payments: "payments";
        mobile: "mobile";
    }>;
    version: z.ZodString;
    slug: z.ZodString;
    published: z.ZodOptional<z.ZodBoolean>;
    pinned: z.ZodOptional<z.ZodBoolean>;
    publishedAt: z.ZodOptional<z.ZodNumber>;
    title: z.ZodObject<{
        en: z.ZodString;
        es: z.ZodString;
    }, z.core.$strip>;
    summary: z.ZodOptional<z.ZodObject<{
        en: z.ZodString;
        es: z.ZodString;
    }, z.core.$strip>>;
    bodyMarkdown: z.ZodObject<{
        en: z.ZodString;
        es: z.ZodString;
    }, z.core.$strip>;
    highlights: z.ZodOptional<z.ZodArray<z.ZodObject<{
        kind: z.ZodEnum<{
            feature: "feature";
            fix: "fix";
            improvement: "improvement";
            breaking: "breaking";
        }>;
        text: z.ZodObject<{
            en: z.ZodString;
            es: z.ZodString;
        }, z.core.$strip>;
    }, z.core.$strip>>>;
}, z.core.$strip>;
export type ReleaseNoteUpsertInput = z.infer<typeof releaseNoteUpsertSchema>;
//# sourceMappingURL=schemas.d.ts.map