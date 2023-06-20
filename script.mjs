#!/usr/bin/env node

import fg from "fast-glob";
import fs from "fs";
import path from "path";
import * as url from "url";
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

const postPaths = fg.sync(["**/*.md", "**/*.mdx"], {
  cwd: path.join(__dirname, "src/pages/blog"),
  absolute: true,
});

// https://tuist.io/blog/2023/01/18/issue-bounties/

for (const postPath of postPaths) {
  let slug = postPath
    .split("/pages/blog/")[1]
    .replace("/post.mdx", "")
    .replace("/post.md", "");
  let newPath = path.join(
    __dirname,
    "src/pages/blog",
    slug.split("-").slice(0, 3).join("/"),
    slug.replace(`${slug.split("-").slice(0, 3).join("-")}-`, "/")
  );
  newPath = `${newPath}.mdx`;
  if (!fs.existsSync(path.dirname(newPath))) {
    fs.mkdirSync(path.dirname(newPath), { recursive: true });
  }
  fs.renameSync(postPath, newPath)
}
