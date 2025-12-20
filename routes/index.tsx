import Description from "../components/Description.tsx";
import Title from "../components/Title.tsx";

export default function About() {
  return (
    <>
      <head>
        <meta property="og:type" content="website" key="og:type" />
        <meta
          property="og:image"
          content="https://zach.sexy/img/opengraph.png"
        />
        <Title title="Zach Auten" />
        <Description content="Zach's blog" />
      </head>
      <div class="about-container">
        <p>
          Hi, I'm Zach! I am a full stack software engineer out of North
          Carolina with a great domain name. 😄
        </p>
        <img class="about-img" src="/img/about/zach.avif" />
      </div>
    </>
  );
}
