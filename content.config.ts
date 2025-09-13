import { defineContentConfig, defineCollection, z } from '@nuxt/content';

export default defineContentConfig({
    collections: {
        blog: defineCollection({
            type: 'page',
            source: 'blog/*.md',
            // Define custom schema for blog collection
            schema: z.object({
                tags: z.array(z.string()),
                image: z.string().optional(),
                date: z.date(),
            }),
        }),
    },
});
