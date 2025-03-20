import { Feed } from "npm:feed";
import { getPosts } from "./posts.ts";

const posts = await getPosts();

const baseURL = "https://zach.sexy/";
const author = {
  name: "Zach Auten",
  email: "zja@zach.sexy",
  link: baseURL,
};

const feed = new Feed({
  title: "zach.sexy",
  description: "Homepage of Zach's blog",
  id: baseURL,
  link: baseURL,
  language: "en",
  image: baseURL + "img/opengraph.png",
  favicon: baseURL + "favicon.ico",
  copyright: "All rights reserved 2025, Zach Auten",
  updated: posts[0].published,
  feedLinks: {
    rss: baseURL + "feed/rss.xml",
    atom: baseURL + "feed/atom.xml",
  },
  author,
});

for (const post of posts) {
  const url = baseURL + "blog/" + post.slug;
  feed.addItem({
    title: post.title,
    id: url,
    link: url,
    description: post.snippet,
    content: post.content,
    author: [author],
    date: post.published,
    image: post.image,
  });
}

export default feed;
