import rss from "@astrojs/rss";
import metadata from "../content/metadata.js";
const posts = import.meta.glob('./blog/**/*.{md,mdx}');
import sanitizeHtml from 'sanitize-html';
import MarkdownIt from 'markdown-it';
const parser = new MarkdownIt();

export async function get() {
  return rss({
    title: 'Tuist | Blog',
    description: metadata.description,
    site: metadata.url,
    items: await Promise.all(Object.entries(posts).map(async ([path, post]) => {
      const postContent = await post()
      const dateString = postContent.url.split("/").slice(2, 5).join("/")
      const date = new Date(dateString)
      return {
        title: postContent.frontmatter.title,
        pubDate: date,
        description: postContent.frontmatter.excerpt,
        link: postContent.url,
      }
    })),
    customData: `<language>en-us</language>`,
  });
}

function pubDate(date) {

  if (typeof date === 'undefined') {
    date = new Date();
  }

  var pieces     = date.toString().split(' '),
      offsetTime = pieces[5].match(/[-+]\d{4}/),
      offset     = (offsetTime) ? offsetTime : pieces[5],
      parts      = [
        pieces[0] + ',',
        pieces[2],
        pieces[1],
        pieces[3],
        pieces[4],
        offset
      ];

  return parts.join(' ');
}