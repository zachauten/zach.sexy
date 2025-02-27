interface Props {
  title: string;
}

export default function Title(props: Props) {
  return (
    <>
      <meta
        property="og:title"
        content={props.title as string}
        key="og:title"
      />
      <title>{props.title}</title>
    </>
  );
}
