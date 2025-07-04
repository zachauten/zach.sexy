/*
 * Redirect blogs that end in ".html".
 */
import { Handlers } from "fresh/compat";

export const handler: Handlers = {
  GET(ctx) {
    const req = ctx.req;

    return Response.redirect(req.url.split(".").slice(0, -1).join("."));
  },
};
