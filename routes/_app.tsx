import { type PageProps } from "fresh";
import Header from "../components/Header.tsx";
import Analytics from "../islands/Analytics.tsx";
import { version } from "../utils/version.ts";
import ServerTiming from "../islands/ServerTiming.tsx";

export default function App({ Component }: PageProps) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:site_name" content="zach.sexy" />
        <link rel="stylesheet" href="/style.css" media="screen" />
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
      </head>
        <body>
          <Header />
          <main>
            <Component />
          </main>
          <footer>
            <a href="/feed/rss.xml">rss</a>
            <a href="/feed/atom.xml">atom</a>
            <a href={"https://github.com/zachauten/zach.sexy/tree/" + version}>
              {version.slice(0, 7)}
            </a>
            <ServerTiming/>
          </footer>
        </body>
    </html>
  );
}
