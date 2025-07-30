import feed from "../../utils/feed.ts";
import { Handlers } from "fresh/compat";

export const handler: Handlers = {
  GET() {
    return new Response(feed.atom1(), {
      headers: { "Content-Type": "application/atom+xml" },
    });
  },
};
