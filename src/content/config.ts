import { z, defineCollection } from "astro:content";

const authorsCollection = defineCollection({
  type: "data",
  schema: z.object({
    name: z.string(),
    x_handle: z.string().optional(),
    mastodon_url: z.string().optional(),
    github_handle: z.string(),
  }),
});

const testimonialsCollection = defineCollection({
  type: "data",
  schema: z.object({
    name: z.string(),
    role: z.string(),
    company: z.string(),
    testimony: z.string(),
    avatar_href: z.string()
  }),
});

const postsCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    categories: z.array(z.string()),
    excerpt: z.string(),
    author: z.string(),
    type: z.literal('release').optional(),
    og_image: z.string().optional()
  }).or(z.object({
    title: z.string(),
    categories: z.array(z.string()),
    excerpt: z.string(),
    interviewee_name: z.string(),
    og_image: z.string().optional(),
    interviewee_url: z.string().optional(),
    interviewee_x_handle: z.string().optional(),
    interviewee_avatar: z.string(),
    type: z.literal('interview')
  })),
});

export const collections = {
  authors: authorsCollection,
  posts: postsCollection,
  testimonials: testimonialsCollection
};
