import { IS_BROWSER } from "$fresh/runtime.ts";
import { ComponentChildren } from "preact";

interface Props {
  children: ComponentChildren;
}

export default function ClarityProvider({ children }: Props) {
  if (!IS_BROWSER) {
    return;
  }
  return (
    <>
      <head>
        <script type="text/javascript">
          {`(function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "qg60f2v1is");`}
        </script>
      </head>
      {children}
    </>
  );
}
