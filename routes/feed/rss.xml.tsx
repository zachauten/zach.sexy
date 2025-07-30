import feed from "../../utils/feed.ts";
import { Handlers } from "fresh/compat";

export const handler: Handlers = {
  GET() {
    return new Response(feed.rss2(), {
      headers: { "Content-Type": "application/rss+xml" },
    });
  },
};
