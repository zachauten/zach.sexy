import * as Cronitor from "@cronitorio/cronitor-rum";
import { ComponentChildren } from "preact";
import { IS_BROWSER } from "$fresh/runtime.ts";

interface Props {
  children: ComponentChildren;
}

export default function Analytics({ children }: Props) {
  if (!IS_BROWSER) {
    return;
  }
  Cronitor.load("9d66f6b97cb4f65407112fc31a855345", {
    debug: false, // <-- You can enable this to see logs in the console
    trackMode: "off", // <-- You can change this to 'off' to track events manually
  });
  Cronitor.track("Pageview");
  return (
    <>
      {children}
    </>
  );
}
