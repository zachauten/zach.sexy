import { Head } from "$fresh/runtime.ts";
import { PageProps } from "$fresh/server.ts";

export default function Error404({ url }: PageProps) {
  return (
    <>
      <Head>
        <title>404 - Page not found</title>
      </Head>
      <p>404 not found: {url.pathname}</p>
    </>
  );
}
