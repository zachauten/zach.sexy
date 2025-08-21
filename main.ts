import { App, type Context, staticFiles } from "fresh";
import { type State } from "./utils/utils.ts";

export const app = new App<State>();

app.use(staticFiles());

app.use(async (ctx: Context<State>) => {
  const before = performance.now();
  const response = await ctx.next();
  const after = performance.now();
  response.headers.set("Server-Timing", `server;dur=${after - before}`);
  return response;
});

app.fsRoutes();

if (import.meta.main) {
  await app.listen();
}
