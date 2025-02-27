interface Props {
  href: string;
  date: Date;
  title: string;
}

export default function ArticleTitle(props: Props) {
  return (
    <div class="title">
      <h1>
        <a href={props.href}>
          {props.title}
        </a>
      </h1>
      <time datetime={props.date.toString()}>
        Published {props.date.toDateString().split(" ").slice(1).join(" ")}
      </time>
    </div>
  );
}
