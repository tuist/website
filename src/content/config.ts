import { z, defineCollection } from "astro:content";

const authorsCollection = defineCollection({
  type: "data",
  schema: z.object({
    name: z.string(),
    twitter_handle: z.string().optional(),
    mastodon_url: z.string().optional(),
    github_handle: z.string(),
  }),
});

export const collections = {
  authors: authorsCollection,
};
