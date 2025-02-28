import { PageProps } from "$fresh/server.ts";
import Code from "../../components/Code.tsx";
import Comments from "../../islands/Comments.tsx";
import Title from "../../components/Title.tsx";
import ArticleTitle from "../../components/ArticleTitle.tsx";
import Description from "../../components/Description.tsx";

const snippet1 =
  `function each<T>(params: Record<string, T>, cb: (p: T) => void) {
  Object.keys(params).map(title => {
    Deno.test(title, () => { cb(params[title]) });
  });
}
`;

const snippet2 =
  `import { assertEquals } from "https://deno.land/std@0.107.0/testing/asserts.ts";
each<[number[], number]>(
  {
    "1 + 2 + 3 == 6":     [[1, 2, 3], 6],
    "-1 + -2 + -3 == -6": [[-1, -2, -3], -6],
    "1 + 1 == 2":         [[1, 1], 2],
    "10 + 9 + 8 + 7 == ": [[10, 9, 8, 7], 34],
  },
  ([vals, expected]) => {
    const actual = vals.reduce((a,b) => a + b);
    assertEquals(expected, actual);
  }
);
`;

const title = "Parameterized testing in Deno";
export const articleTitle = (
  <ArticleTitle
    href="/blog/parameterized_testing_deno"
    date={new Date("2021-09-21")}
    title={title}
  />
);

export const intro = (
  <p>
    I'd like to share a simple function I wrote for parameterized testing in
    {" "}
    <a href="https://deno.land/">Deno</a>.
  </p>
);

export default function parameterized_testing_deno(_props: PageProps) {
  return (
    <>
      <head>
        <link
          rel="canonical"
          href="https://zach.sexy/blog/parameterized_testing_deno"
        />
        <meta property="og:type" content="article" key="og:type" />
        <Title title={title} />
        <Description content="A couple code snippets used to add parameterized testing to Deno's unit tests." />
      </head>
      <article>
        {articleTitle}
        {intro}
        <p>
          One of the things I like about Deno is that the developers are
          building in a lot of boilerplate tooling into the runtime. This
          reduces a lot of the code that seems to come along by default with
          node projects. A mid-sized node project can easily have a dozen or so
          primary dependencies supporting testing, and many more transitive
          dependencies.
        </p>
        <p>
          Deno, on the other hand, only has one function related to testing in
          the global api
          (<a href="https://doc.deno.land/builtin/stable#Deno.test">
            Deno.test
          </a>, to register tests), and a{" "}
          <a href="https://deno.land/std@0.107.0/testing">
            small handful of assertions
          </a>{" "}
          in the standard library. It's all you
          <i>really</i> need, but sometimes the extras can be nice.
        </p>
        <p>
          Like parameterized tests. If you haven't used a test library that
          supports them, parameterized tests are basically just a syntactic
          sugar for running the same test case on different inputs. For example,
          <a href="https://jestjs.io/blog/2018/05/29/jest-23-blazing-fast-delightful-testing#jest-each">
            Jest's .each
          </a>
          function.
        </p>
        <p>
          To achieve something similar in Deno, give this a try (I called it
          'each' as well, for lack of a better name):
        </p>
        <Code>{snippet1}</Code>
        <p>Calling it looks like this:</p>
        <Code>{snippet2}</Code>
        <p>
          Hopefully this can be helpful to someone, at least until more
          comprehensive testing features are added to the Deno runtime. You can
          read some of the ongoing discussion around a new test related api{" "}
          <a href="https://github.com/denoland/deno/discussions/10771">here</a>.
        </p>
      </article>
      <Comments />
    </>
  );
}
