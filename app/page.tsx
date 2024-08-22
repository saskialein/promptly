import Feed from "@components/Feed";

export default function Home() {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Search & Share
        <br/>
        <span className="purple_gradient text-center">AI-Powered Prompts</span>
      </h1>
      <p className="desc text-center">
        Search, create, and share innovative AI prompts with Promptly – your
        go-to tool for unlocking creativity in the modern world
      </p>
      <Feed />
    </section>
  )
}
