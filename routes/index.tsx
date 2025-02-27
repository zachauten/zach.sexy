import * as parameterizedTesting from "./blog/parameterized_testing_deno.tsx";
import * as denoOtel from "./blog/deno_open_telemetry.tsx";
import Title from "../components/Title.tsx";
import Description from "../components/Description.tsx";

const title = "Zach Auten";

export default function Home() {
  return (
    <>
      <head>
        <meta
          name="description"
          content="Homepage of Zach's blog."
        />
        <Title title={title} />
        <Description content="Homepage of Zach's blog" />
      </head>
      <article>
        {denoOtel.articleTitle}
        {denoOtel.intro}
      </article>
      <article>
        {parameterizedTesting.articleTitle}
        {parameterizedTesting.intro}
      </article>
    </>
  );
}
