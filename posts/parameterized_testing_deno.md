---
title: Parameterized testing in Deno
published: 2021-9-21
snippet: "I'd like to share a simple function I wrote for parameterized testing in Deno."
---

I'd like to share a simple function I wrote for parameterized testing in
[Deno](https://deno.land/).

One of the things I like about Deno is that the developers are building in a lot
of boilerplate tooling into the runtime. This reduces a lot of the code that
seems to come along by default with node projects. A mid-sized node project can
easily have a dozen or so primary dependencies supporting testing, and many more
transitive dependencies.

Deno, on the other hand, only has one function related to testing in the global
api (Deno.test, to register tests), and a
[small handful of assertions](https://deno.land/std@0.107.0/testing) in the
standard library. It's all you really need, but sometimes the extras can be
nice.

Like parameterized tests. If you haven't used a test library that supports them,
parameterized tests are basically just a syntactic sugar for running the same
test case on different inputs. For example,
[Jest's "each"](https://jestjs.io/blog/2018/05/29/jest-23-blazing-fast-delightful-testing#jest-each)
function.

To achieve something similar in Deno, give this a try (I called it 'each' as
well, for lack of a better name):

```typescript
function each<T>(params: Record<string, T>, cb: (p: T) => void) {
  Object.keys(params).map((title) => {
    Deno.test(title, () => {
      cb(params[title]);
    });
  });
}
```

Calling it looks like this:

```typescript
import { assertEquals } from "https://deno.land/std@0.107.0/testing/asserts.ts";
each<[number[], number]>(
  {
    "1 + 2 + 3 == 6": [[1, 2, 3], 6],
    "-1 + -2 + -3 == -6": [[-1, -2, -3], -6],
    "1 + 1 == 2": [[1, 1], 2],
    "10 + 9 + 8 + 7 == ": [[10, 9, 8, 7], 34],
  },
  ([vals, expected]) => {
    const actual = vals.reduce((a, b) => a + b);
    assertEquals(expected, actual);
  },
);
```

Hopefully this can be helpful to someone, at least until more comprehensive
testing features are added to the Deno runtime. You can read some of the ongoing
discussion around a new test related api
[here](https://github.com/denoland/deno/discussions/10771).
