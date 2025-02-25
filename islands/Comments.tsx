import Giscus from "https://esm.sh/@giscus/react@^3.1.0?alias=react:preact/compat&alias=react-dom:preact/compat&external=preact";

export default function Comments() {
  return (
    <div className="comments-container">
      <Giscus
        id="comments"
        repo="zachauten/zach.sexy"
        repoId="R_kgDOGFxOwA"
        category="Announcements"
        categoryId="DIC_kwDOGFxOwM4CnTk-"
        mapping="pathname"
        strict="1"
        term="Welcome to @giscus/preact component!"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme="light"
        lang="en"
      />
    </div>
  );
}
