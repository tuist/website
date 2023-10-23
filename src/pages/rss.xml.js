import rss from "@astrojs/rss";
import metadata from "../utils/metadata.json";
import { getCollection } from 'astro:content';
import sanitizeHtml from 'sanitize-html';
import MarkdownIt from 'markdown-it';
const parser = new MarkdownIt();

export async function get() {
  const allPosts = await getCollection('posts');
  const tuistCloudHTML = `<h2>Tuist Cloud  ☁️</h2>
<p>
${metadata["cloud"]["paragraph"]}
</p>
<p>
<a ref="${metadata["cloud"]["link"]}">Sponsor Tuist</a>
</p>`
  return rss({
    title: 'Tuist | Blog',
    description: metadata.description,
    site: metadata.url,
    items: await Promise.all(allPosts.map(async (post) => {
      const body = `${parser.render(post.body)}\n${tuistCloudHTML}`
      const dateString = post.slug.split("/").slice(0, 3).join("/")
      const date = new Date(dateString)
      const payload = {
        title: post.data.title,
        pubDate: date,
        description: post.data.excerpt,
        link: `/blog/${post.slug}`,
        content: sanitizeHtml(body),
      }
      return payload;
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