import { extract } from "@std/front-matter/yaml";
import { join } from "@std/path";

const POST_DIR = "./posts";

export interface Post extends FrontMatter {
  slug: string;
  content: string;
}

export interface FrontMatter {
  title: string;
  published: Date;
  snippet: string;
  image: string;
}

export async function getPosts(): Promise<Post[]> {
  const files = Deno.readDir(POST_DIR);
  const promises = [];
  for await (const file of files) {
    const slug = file.name.replace(".md", "");
    promises.push(getPost(slug));
  }
  const posts = await Promise.all(promises) as Post[];
  posts.sort((a, b) => b.published.getTime() - a.published.getTime());
  return posts;
}

export async function getPost(slug: string): Promise<Post | null> {
  try {
    const text = await Deno.readTextFile(join(POST_DIR, `${slug}.md`));
    const { attrs, body } = extract<FrontMatter>(text);
    return {
      slug,
      title: attrs.title,
      published: new Date(attrs.published),
      content: body,
      snippet: attrs.snippet,
      image: attrs.image,
    };
  } catch (error) {
    console.warn(error);
    return null;
  }
}
