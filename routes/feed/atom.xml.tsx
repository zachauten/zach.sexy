import { Handlers } from "$fresh/server.ts";
import feed from "../../utils/feed.ts";

export const handler: Handlers = {
  GET(_req) {
    return new Response(feed.atom1());
  },
};
