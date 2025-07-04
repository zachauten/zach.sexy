import { PageProps } from "fresh";

export default function Error404({ url }: PageProps) {
  return (
    <>
      <head>
        <title>404 - Page not found</title>
      </head>
      <p>404 not found: {url.pathname}</p>
    </>
  );
}
