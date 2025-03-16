import Title from "../components/Title.tsx";
import Description from "../components/Description.tsx";
import { getPosts } from "../utils/posts.ts";
import ArticleTitle from "../components/ArticleTitle.tsx";

const title = "Zach Auten";

export default async function Home() {
  const posts = await getPosts();
  return (
    <>
      <head>
        <meta
          name="description"
          content="Homepage of Zach's blog."
        />
        <meta property="og:type" content="website" key="og:type" />
        <Title title={title} />
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
