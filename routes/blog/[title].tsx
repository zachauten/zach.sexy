import { PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";

export default function Blog(props: PageProps) {
  return (
    <>
      <Head>
        <title>{props.params.name}</title>
      </Head>
    </>
  );
}
