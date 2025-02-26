import { ComponentChildren } from "preact";

interface Props {
  children: ComponentChildren;
}

export default function Code({ children }: Props) {
  return (
    <div class="sourceCode">
      <pre>
    <code>{children}</code></pre>
    </div>
  );
}
