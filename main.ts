import { App, type FreshContext, fsRoutes, staticFiles } from "fresh";
import { type State } from "./utils/utils.ts";

export const app = new App<State>();

app.use(staticFiles());

app.use(async (ctx: FreshContext<State>) => {
  const before = performance.now();
  const response = await ctx.next();
  const after = performance.now();
  response.headers.set("Server-Timing", `server;dur=${after - before}`);
  return response;
});

await fsRoutes(app, {
  loadIsland: (path) => import(`./islands/${path}`),
  loadRoute: (path) => import(`./routes/${path}`),
});

if (import.meta.main) {
  await app.listen();
}
