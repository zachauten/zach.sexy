import { JSX } from "preact";

export default function Title(props: JSX.HTMLAttributes<HTMLTitleElement>) {
  return (
    <>
      <meta
        property="og:title"
        content={props.children as string}
        key="og:title"
      />
      <title>{props.children}</title>
    </>
  );
}
