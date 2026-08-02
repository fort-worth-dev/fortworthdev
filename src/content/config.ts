import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    // The site's two learning tracks: `assistants` (using AI coding
    // assistants well) and `agents` (agentic & workflow development).
    // `notes` is for everything that fits neither.
    category: z.enum(['assistants', 'agents', 'notes']).default('notes'),
    draft: z.boolean().optional().default(false),
  }),
});

export const collections = { blog };
