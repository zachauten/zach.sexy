import * as parameterizedTesting from "./blog/parameterized_testing_deno.tsx";
import * as denoOtel from "./blog/deno_open_telemetry.tsx";
import Title from "../components/Title.tsx";
import Description from "../components/Description.tsx";

const title = "Zach's site! 👋";

export default function Home() {
  return (
    <>
      <head>
        <meta
          name="description"
          content="Homepage of Zach's blog."
        />
        <Title>{title}</Title>
        <Description content="Homepage of Zach's blog" />
      </head>
      <article>
        {denoOtel.title}
        {denoOtel.intro}
      </article>
      <article>
        {parameterizedTesting.title}
        {parameterizedTesting.intro}
      </article>
    </>
  );
}
