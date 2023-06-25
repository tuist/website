import rss from "@astrojs/rss";
import metadata from "../utils/metadata.json";
import { getCollection } from 'astro:content';
import sanitizeHtml from 'sanitize-html';
import MarkdownIt from 'markdown-it';
const parser = new MarkdownIt();

export async function get() {
  const allPosts = await getCollection('posts');

  return rss({
    title: 'Tuist | Blog',
    description: metadata.description,
    site: metadata.url,
    items: await Promise.all(allPosts.map(async (post) => {
      const dateString = post.slug.split("/").slice(0, 3).join("/")
      const date = new Date(dateString)
      return {
        title: post.data.title,
        pubDate: date,
        description: post.data.excerpt,
        link: `/blog/${post.slug}`,
        content: sanitizeHtml(parser.render(post.body)),
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