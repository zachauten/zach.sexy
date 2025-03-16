interface Props {
  url: string;
}

export default function Canonical(props: Props) {
  return (
    <>
      <meta property="og:url" content={props.url} />
      <link
        rel="canonical"
        href={props.url}
      />
    </>
  );
}
