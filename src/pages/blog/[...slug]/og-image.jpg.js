import ogImage from "../../../utils/og-image.js";
const posts = import.meta.glob("../**/*.{md,mdx}");
import authors from '../../../content/authors.js'

export async function getStaticPaths() {
  return await Promise.all(
    Object.entries(posts).map(async ([_, getPost]) => {
      const post = await getPost();
      const slug = `${post.url}`.replace("/blog/", "");
      return {
        params: {
          slug: slug,
        },
      };
    })
  );
}

export const get = async function get({ params, request }) {
  const moduleId = new URL(request.url).pathname
    .replace("/blog", "..")
    .replace("/og-image.jpg", ".mdx");
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
    footer = `Written by ${authors[postModule.frontmatter.author].name}`
    if (authors[postModule.frontmatter.author].twitter_handle) {
      footer += ` (@${authors[postModule.frontmatter.author].twitter_handle})`
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
