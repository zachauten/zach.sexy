import { Handlers } from "$fresh/server.ts";

/*
 * Redirect blogs that end in ".html".
 */
export const handler: Handlers = {
  GET(req) {
    return Response.redirect(req.url.split(".").slice(0, -1).join("."));
  },
};
