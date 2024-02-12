import ogImage from "../../../utils/og-image.js";
const posts = import.meta.glob("../../../content/posts/**/*.{md,mdx}");
import { getCollection } from "astro:content";
const allAuthors = await getCollection("authors");

export async function getStaticPaths() {
  const paths = await Promise.all(
    Object.entries(posts).map(async ([_, getPost]) => {
      const post = await getPost();
      const slug = `${post.url}`.replace("src/content/", "").replace("posts/", "").replace(".mdx", "");
      return {
        params: {
          slug: slug,
        },
      };
    })
  );
  return paths;
}

export const GET = async function get({ params, request }) {
  const moduleId = new URL(request.url).pathname
    .replace("/og-images", "../../../content")
    .replace("/blog/", "/posts/")
    .replace(".jpg", ".mdx");

  const postModule = await posts[moduleId]();
  let footer = ""
  if (postModule.frontmatter.type === 'release') {
    footer = "New release"
  } else if (postModule.frontmatter.type === "interview") {
    footer = `Interviewee: ${postModule.frontmatter.interviewee_name}`
    if (postModule.frontmatter.interviewee_twitter_handle) {
      footer += ` (@${postModule.frontmatter.interviewee_twitter_handle})`
    }
  } else {
    const author = allAuthors.find((author) => author.id === postModule.frontmatter.author);
    footer = `Written by ${author?.data?.name}`
    if (author?.data?.twitter_handle) {
      footer += ` (@${author?.data?.twitter_handle})`
    }
  }
  const png = await ogImage({
    title: postModule.frontmatter.title,
    header: "Tuist Blog",
    footer: footer,
  });
  return new Response(png, {
    headers: {
      "Content-Type": "image/jpg",
    },
  });
};
