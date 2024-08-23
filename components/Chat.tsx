"use client";

import { useChat } from "ai/react";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "/api/chat/openai",
  });

  return (
    <section className="chat">
      <div className="w-full max-w-2xl">
        <div className="relative flex max-h-[500px] w-full flex-col justify-end overflow-y-auto rounded-lg bg-white/5 p-4 shadow-md">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`my-2 whitespace-pre-wrap dark:text-white ${
                m.role === "user" ? "text-right" : "text-left"
              }`}
            >
              <span
                className={`font-semibold ${
                  m.role === "user" ? "green_gradient" : "orange_gradient"
                }`}
              >
                {m.role === "user" ? "You: " : "AI: "}
              </span>
              <span className="inline-block max-w-[80%] break-words">
                {m.content}
              </span>
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit} className="flex-center w-full">
          <input
            className="search_input"
            value={input}
            placeholder="Say something..."
            onChange={handleInputChange}
            type="text"
          />
        </form>
      </div>
    </section>
  );
}
