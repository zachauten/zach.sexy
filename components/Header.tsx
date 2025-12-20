import { JSX } from "preact";

export default function Header(props: JSX.HTMLAttributes<HTMLElement>) {
  return (
    <header {...props}>
      <nav>
        <a href="/">about</a>
        <a href="/blog">blog</a>
        <a href="https://github.com/zachauten">github</a>
        <a href="https://www.linkedin.com/in/zachauten/">linkedin</a>
        <a href="/resume.html">resume</a>
      </nav>
    </header>
  );
}
