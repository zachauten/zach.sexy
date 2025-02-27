import { JSX } from "preact";

export default function Description(props: JSX.MetaHTMLAttributes) {
  return (
    <>
      <meta name="description" content={props.content} />
      <meta property="og:description" content={props.content} />
    </>
  );
}
