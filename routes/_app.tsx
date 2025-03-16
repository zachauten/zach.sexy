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
        <meta property="og:site_name" content="zach.sexy" />
        <link rel="stylesheet" href={asset("/style.css")} media="screen" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
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
