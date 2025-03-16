import { Handlers } from "$fresh/server.ts";
import { PageProps } from "$fresh/server.ts";
import { CSS } from "@deno/gfm";
import "npm:prismjs@1.29.0/components/prism-typescript.js";
import "npm:prismjs@1.29.0/components/prism-bash.js";
import ArticleTitle from "../../components/ArticleTitle.tsx";
import { Markdown } from "../../components/Markdown.tsx";
import Comments from "../../islands/Comments.tsx";
import Title from "../../components/Title.tsx";
import Description from "../../components/Description.tsx";
import { getPost, Post } from "../../utils/posts.ts";
import Canonical from "../../components/Canonical.tsx";

export const handler: Handlers<Post> = {
  async GET(_req, ctx) {
    const post = await getPost(ctx.params.slug);
    if (post === null) return ctx.renderNotFound();
    return ctx.render(post);
  },
};

export default function PostPage(props: PageProps<Post>) {
  const post = props.data;
  return (
    <>
      <head>
        <style
          // deno-lint-ignore react-no-danger
          dangerouslySetInnerHTML={{ __html: CSS }}
        />
        <meta property="og:type" content="article" key="og:type" />
        {post.image ? <meta property="og:image" content={post.image} /> : null}
        <Canonical url={"https://zach.sexy/blog/" + post.slug} />
        <Title title={post.title} />
        <Description content="An article about the recent support for Open Telemetry in Deno" />
      </head>
      <ArticleTitle
        href={post.slug}
        date={post.published}
        title={post.title}
      />
      <Markdown source={post.content} />
      <Comments />
    </>
  );
}
