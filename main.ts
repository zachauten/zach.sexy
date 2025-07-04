import { App, fsRoutes, staticFiles } from "fresh";
import { type State } from "./utils/utils.ts";

export const app = new App<State>();

app.use(staticFiles());

await fsRoutes(app, {
  loadIsland: (path) => import(`./islands/${path}`),
  loadRoute: (path) => import(`./routes/${path}`),
});

if (import.meta.main) {
  await app.listen();
}
