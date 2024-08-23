import React from "react";
import PromptCard from "./PromptCard";
import { Prompt, PromptList } from "./Feed";

export type ProfileProps = {
  name: string | null;
  desc: string;
  data: PromptList;
  handleEditPrompt?: (post: Prompt) => void;
  handleDeletePrompt?: (post: Prompt) => void;
  handleDeleteAccount?: () => void;
};

export default function Profile({
  name,
  desc,
  data,
  handleEditPrompt,
  handleDeletePrompt,
  handleDeleteAccount,
}: ProfileProps) {
  return (
    <section className="w-full">
      <h1 className="head_text text-left">
        <span className="purple_gradient">{name} Profile</span>
      </h1>

      <p className="desc text-left">{desc}</p>
      {handleDeleteAccount && (
        <button onClick={handleDeleteAccount} className="delete_btn mt-4">
          {" "}
          Delete Profile
        </button>
      )}
      <div className="mt-10 prompt_layout">
        {data.map((post) => (
          <PromptCard
            key={post._id}
            post={post}
            handleEdit={handleEditPrompt}
            handleDelete={handleDeletePrompt}
          />
        ))}
      </div>
    </section>
  );
}
