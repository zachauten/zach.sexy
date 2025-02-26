import { PageProps } from "$fresh/server.ts";
import { asset } from "$fresh/runtime.ts";
import Code from "../../components/Code.tsx";
import Comments from "../../islands/Comments.tsx";

export const title = "Deno + Open Telemetry";
export const intro = (
  <p>
    The most <a href="https://deno.com/blog/v2.2">recent release of Deno</a>
    {" "}
    last week included a feature that I think is very exciting: it built support
    for Open Telemetry directly into the runtime.
  </p>
);

const runSnippet = `OTEL_DENO=true \\
OTEL_EXPORTER_OTLP_ENDPOINT='https://api.honeycomb.io' \\
OTEL_EXPORTER_OTLP_HEADERS='x-honeycomb-team=lkvJ6F0f7D8b9pqkR7uZ6C' \\
OTEL_SERVICE_NAME='fresh-project' \\
deno run --unstable-otel -A --watch=static/,routes/ dev.ts
`;

const traceProviderSnippet = `import {
  CompositePropagator,
  W3CBaggagePropagator,
  W3CTraceContextPropagator,
} from "@opentelemetry/core";
import { WebTracerProvider } from "@opentelemetry/sdk-trace-web";
import { SimpleSpanProcessor } from "@opentelemetry/sdk-trace-base";
import { registerInstrumentations } from "@opentelemetry/instrumentation";
import { getWebAutoInstrumentations } from "@opentelemetry/auto-instrumentations-web";
import { Resource } from "@opentelemetry/resources";
import { ATTR_SERVICE_NAME } from "@opentelemetry/semantic-conventions";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";
import { ComponentChildren } from "preact";

const { ZoneContextManager } = await import("@opentelemetry/context-zone");

const exporter = new OTLPTraceExporter({
  url: "https://api.honeycomb.io/v1/traces",
  headers: {
    "x-honeycomb-team": "lkvJ6F0f7D8b9pqkR7uZ6C",
  },
});

const provider = new WebTracerProvider({
  resource: new Resource({
    [ATTR_SERVICE_NAME]: "fresh-project",
    "user_agent.original": globalThis.navigator.userAgent,
  }),
  spanProcessors: [
    new SimpleSpanProcessor(exporter),
  ],
});

const contextManager = new ZoneContextManager();

provider.register({
  contextManager,
  propagator: new CompositePropagator({
    propagators: [
      new W3CBaggagePropagator(),
      new W3CTraceContextPropagator(),
    ],
  }),
});

registerInstrumentations({
  tracerProvider: provider,
  instrumentations: [
    getWebAutoInstrumentations({
      "@opentelemetry/instrumentation-fetch": {
        propagateTraceHeaderCorsUrls: /.*/,
        clearTimingResources: true,
        applyCustomAttributesOnSpan(span) {
          span.setAttribute("app.synthetic_request", "false");
        },
      },
    }),
  ],
});

interface Props {
  children: ComponentChildren;
}

export default function TraceProvider({ children }: Props) {
  return (
    <>
      {children}
    </>
  );
}
`;

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
        <p>
          I played around with the new Open Telemetry functionality, I'll share
          the steps to recreate. I'm using{" "}
          <a href="https://fresh.deno.dev/">Fresh</a>, which is a web framework
          built for Deno, and sending the telemetry to{" "}
          <a href="https://www.honeycomb.io/">Honeycomb</a>. Sending data to
          other vendors may be different, some may require you to use an Open
          Telemetry collector if they don't suport direct OTLP ingest.
        </p>
        <p>
          First, create a new project:{" "}
          <Code>deno run -A -r https://fresh.deno.dev</Code>
        </p>
        <p>
          Start the application with:
        </p>
        <Code>{runSnippet}</Code>
        Then open the home page in a browser. Log in to Honeycomb and we should
        see the data showing up under a dataset named "fresh-project", or
        whatever name was used for{" "}
        <code>OTEL_SERVICE_NAME</code>. We should see the traces generated by
        GET requests to the server have been sent to Honeycomb. This is because
        Deno.serve has been auto-instrumented by the runtime.
        <img alt="screenshot of honeycomb.io showing traces generated by Deno" src={asset("/img/demo-traces-1.webp")} />
        <p>We can also see logs from the server's startup.</p>
        <img alt="screenshot of honeycomb.io showing some startup logs" src={asset("/img/demo-logs.webp")} />
        <p>
          If we want to recieve some telemetry from the browser, we can make a
          couple small updates. This isn't technically showcasing any
          Deno-related features because it's on the client side, but I think
          it's nice to include.
        </p>
        <p>
          First, add a provider component to the application wrapper. It's
          basically just some example code provided in the Open Telemetry
          documentation. We'll also need to install some extra dependencies the
          new component uses.
        </p>
        <Code>{traceProviderSnippet}</Code>
        <p>
          If we visit Honeycomb again after reloading the page, we should see
          traces that look a little different (more spans). These represent the
          document loading.
        </p>
        <img alt="screenshot of honeycomb.io showing some traces with multiple spans generated by the browser" src={asset("/img/demo-traces-2.webp")} />
        {
          // Demo:
          //
          // Add some more dependencies to deno.json and install them (some of these require the --allow-scripts flag for npm compatibility)
          // deno install --allow-scripts=npm:protobufjs@7.4.0
          // Finally, we can get a trace from the inital GET request by sending traceparent
        }
      </article>
      <Comments />
    </>
  );
}
