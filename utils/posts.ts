import { join } from "@std/path";
import Asciidoctor from "asciidoctor";

const asciidoctor: Asciidoctor.Asciidoctor = new Asciidoctor();
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
    const slug = file.name.replace(".adoc", "");
    promises.push(getPost(slug));
  }
  const posts = await Promise.all(promises) as Post[];
  posts.sort((a, b) => b.published.getTime() - a.published.getTime());
  return posts;
}

export async function getPost(slug: string): Promise<Post | null> {
  try {
    const document = asciidoctor.loadFile(join(POST_DIR, `${slug}.adoc`));
    const attributes = document.getAttributes();
    const content = await document.convert();

    const image = join("/", slug, attributes.image);
    return {
      slug,
      title: attributes.doctitle,
      published: new Date(attributes.published),
      content,
      snippet: attributes.snippet,
      image,
    };
  } catch (error) {
    console.warn(error);
    return null;
  }
}
