import Title from "../components/Title.tsx";
import Description from "../components/Description.tsx";
import { getPosts } from "../utils/posts.ts";
import ArticleTitle from "../components/ArticleTitle.tsx";

export default async function Home() {
  const posts = await getPosts();
  return (
    <>
      <head>
        <meta property="og:type" content="website" key="og:type" />
        <Title title="Zach Auten" />
        <Description content="Homepage of Zach's blog" />
      </head>
      {posts.map((post) => {
        return (
          <article>
            <ArticleTitle
              href={"blog/" + post.slug}
              date={post.published}
              title={post.title}
            />
            <p>{post.snippet}</p>
          </article>
        );
      })}
    </>
  );
}
