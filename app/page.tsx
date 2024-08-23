import Feed from "@components/Feed";
import Chat from "@components/Chat";

export default function Home() {
  return (
    <section className="flex-center w-full flex-col">
      <h1 className="head_text text-center">
        Craft & Chat
        <br />
        <span className="purple_gradient text-center">
          Your AI Prompt Playground
        </span>
      </h1>
      <p className="desc text-center">
        Discover, craft, and showcase clever AI prompts with Promptly – the
        ultimate playground for your imagination in the AI era.
      </p>
      <Feed />
      <Chat />
    </section>
  );
}
