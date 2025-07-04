import { FreshContext } from "fresh";
import { CSS } from "@deno/gfm";
import "npm:prismjs@1.29.0/components/prism-typescript.js";
import "npm:prismjs@1.29.0/components/prism-bash.js";
import ArticleTitle from "../../components/ArticleTitle.tsx";
import { Markdown } from "../../components/Markdown.tsx";
import Comments from "../../islands/Comments.tsx";
import Title from "../../components/Title.tsx";
import Description from "../../components/Description.tsx";
import { getPost } from "../../utils/posts.ts";
import Canonical from "../../components/Canonical.tsx";
import { Post } from "../../utils/posts.ts";

export default async function PostPage(ctx: FreshContext<Post>) {
  const post = await getPost(ctx.params.slug);
  if (post === null) throw new Deno.errors.NotFound();
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
        <Description content={post.snippet} />
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
