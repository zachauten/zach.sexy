import { Handlers } from "$fresh/server.ts";
import RSS from "npm:rss";
import { getPosts } from "../../utils/posts.ts";

const baseURL = "https://zach.sexy/";
const posts = await getPosts();

const feed = new RSS({
  title: "zach.sexy",
  description: "Homepage of Zach's blog",
  site_url: baseURL,
  feed_url: baseURL + "feed/rss.xml",
  pubDate: posts[0].published,
  webMaster: "zja@zach.sexy (Zach Auten)",
});

for (const post of posts) {
  feed.item({
    title: post.title,
    description: post.snippet,
    url: baseURL + "blog/" + post.slug,
    date: post.published,
  });
}

export const handler: Handlers = {
  GET(_req) {
    return new Response(feed.xml());
  },
};
