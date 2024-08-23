import Link from "next/link";
import { Dispatch, FormEvent, SetStateAction } from "react";

type FormProps = {
  type: string;
  post: {
    prompt: string;
    tag: string;
  };
  setPost: Dispatch<SetStateAction<{ prompt: string; tag: string }>>;
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  submitting: boolean;
};

export default function Form({
  type,
  post,
  setPost,
  handleSubmit,
  submitting,
}: FormProps) {
  return (
    <section className="flex-start w-full max-w-full flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{type} Prompt</span>
      </h1>
      <p className="desc max-w-md text-left">
        {type} and share amazing propmts with the world, and let your
        imagination run wild with any AI-powered platform.
      </p>

      <form
        onSubmit={handleSubmit}
        className="glassmorphism mt-10 flex w-full max-w-2xl flex-col gap-7"
      >
        <label>
          <span className="font-satoshi text-base font-semibold text-gray-700 dark:text-gray-400">
            Your AI Prompt
          </span>
          <textarea
            value={post.prompt}
            onChange={(e) => setPost({ ...post, prompt: e.target.value })}
            placeholder="Write your prompt here..."
            required
            className="form_textarea"
          />
        </label>
        <label>
          <span className="font-satoshi text-base font-semibold text-gray-700 dark:text-gray-400">
            Tag{" "}
            <span className="font-normal">
              (#product, #webdevelopment, #idea)
            </span>
          </span>
          <input
            value={post.tag}
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
            placeholder="#tag"
            required
            className="form_input"
          />
        </label>
        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href="/" className="text-sm text-gray-500 dark:text-gray-300">
            Cancel
          </Link>
          <button
            type="submit"
            disabled={submitting}
            className="rounded-full bg-primary-orange px-5 py-1.5 text-sm text-white"
          >
            {submitting ? `${type}ing...` : type}
          </button>
        </div>
      </form>
    </section>
  );
}
