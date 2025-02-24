import * as parameterizedTesting from "./blog/parameterized_testing_deno.tsx";
import * as denoOtel from "./blog/deno_open_telemetry.tsx";

export default function Home() {
  return (
    <>
      <article>
        <div class="title">
          <h1>
            <a href="/blog/deno_open_telemetry">
              {denoOtel.title}
            </a>
          </h1>
          {denoOtel.intro}
          <time datetime="2024-02-24">24 Feb 2024</time>
        </div>
      </article>
      <article>
        <div class="title">
          <h1>
            <a href="/blog/parameterized_testing_deno">
              {parameterizedTesting.title}
            </a>
          </h1>
          {parameterizedTesting.intro}
          <time datetime="2021-09-21">21 Sep 2021</time>
        </div>
      </article>
    </>
  );
}
