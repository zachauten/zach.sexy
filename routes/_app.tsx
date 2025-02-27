import { type PageProps } from "$fresh/server.ts";
import { asset } from "$fresh/src/runtime/utils.ts";
import Header from "../components/Header.tsx";
import Analytics from "../islands/Analytics.tsx";
import { Head } from "$fresh/runtime.ts";

export default function App({ Component }: PageProps) {
  return (
    <html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:type" content="website" key="og:type" />
        <meta property="og:site_name" content="zach.sexy" />
        <link rel="stylesheet" href={asset("/style.css")} media="screen" />
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🐒</text></svg>"
        />
      </Head>
      <Analytics>
        <body>
          <Header />
          <main>
            <Component />
          </main>
        </body>
      </Analytics>
    </html>
  );
}
