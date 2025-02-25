import { PageProps } from "$fresh/server.ts";

export const title = "Deno + Open Telemetry";
export const intro = (
  <p>
    The most <a href="https://deno.com/blog/v2.2">recent release of Deno</a>
    {" "}
    last week included a feature that I think is very exciting: it built support
    for Open Telemetry directly into the runtime.
  </p>
);

export default function deno_open_telemetry(_props: PageProps) {
  return (
    <>
      <head>
        <link
          rel="canonical"
          href="https://zach.sexy/blog/deno_open_telemetry"
        />
        <meta property="og:type" content="website" key="og:type" />
        <meta
          property="og:title"
          content={title}
          key="og:title"
        />
        <meta
          name="description"
          content="An article about the recent support for Open Telemetry in Deno"
        />
        <title>{title}</title>
      </head>
      <article>
        <div class="title">
          <h1>{title}</h1>
          <time datetime="2024-02-24">Published 24 Feb 2024</time>
        </div>
        {intro}
        <p>
          Deno's an incredible platform, but the lack of observability support
          has made it a non-starter for anything serious in production. While
          logging is obviously built in, and you could use an existing metrics
          library like prometheus with npm specifiers for custom metrics,{" "}
          <a href="https://github.com/DataDog/dd-trace-js/issues/1892">
            existing tracing libraries
          </a>{" "}
          are highly coupled to Node due to differences in the way things like
          promises are handled by the runtime. Even Open Telemetry only supports
          Node and the browser. There's been an issue tacking Deno support open
          for almost 4 years now, but it's been{" "}
          <a href="https://github.com/open-telemetry/opentelemetry-js/issues/2293#issuecomment-1700862868">
            slow to progress
          </a>. This isn't unreasonable - Node has{" "}
          <a href="https://survey.stackoverflow.co/2024/technology#1-web-frameworks-and-technologies">
            orders of magnitude more users than Deno
          </a>.
        </p>
        <p>
          Open Telemetry makes a lot of sense for Deno - mostly because it's the
          new-ish kid on the block, and there's not much incentive for every
          vendor to put energy into supporting it. But if there's an open
          protocol that all the vendors support, there's a single API that the
          Deno maintainers need to implement and suddenly they support all the
          major vendors.
        </p>
        <p>
          There were a few{" "}
          <a href="https://github.com/deno-otel">3rd party attempts</a>{" "}
          to get Open Telemetry working in Deno, but it feels like this sort of
          native support came out of nowhere. The first PR looks like it was
          opened only a couple months ago, mid November last year.
        </p>
        <p>
          I'm very excited to see what happens when this feature is stabilized,
          because the stable Deno features tend to make their way into Deno
          Deploy.
        </p>
        {
          /* Example of full stack app using Deno tracing + browser:

Video Demo of running a Deno/Fresh application on Fly.io and sending telemetry to Honeycomb.io
 */
        }
      </article>
    </>
  );
}
