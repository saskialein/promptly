"use client";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Prompt } from "./Feed";

export type PromptCardProps = {
  post: Prompt;
  handleTagClick?: (tag: string) => void;
  handleEdit?: (post: Prompt) => void;
  handleDelete?: (post: Prompt) => void;
};

export default function PromptCard({
  post,
  handleTagClick,
  handleEdit,
  handleDelete,
}: PromptCardProps) {
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();

  const [copied, setCopied] = useState("");

  const handleProfileClick = () => {
    console.log(post);

    if (post.creator._id === session?.user.id) return router.push("/profile");

    router.push(`/profile/${post?.creator?._id}?name=${post.creator.username}`);
  };

  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(""), 3000);
  };

  return (
    <div className="prompt_card">
      <div className="flex items-start justify-between gap-5">
        <div
          className="flex flex-1 cursor-pointer items-center justify-start gap-3"
          onClick={handleProfileClick}
        >
          {/* TODO: Fallback img */}
          <Image
            src={post?.creator?.image || ""}
            alt="user-image"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />
          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900 dark:text-gray-300">
              {post?.creator?.username}
            </h3>
            <p className="font-inter text-sm text-gray-500 ">
              {post?.creator?.email}
            </p>
          </div>
        </div>
        <div className="copy_btn" onClick={handleCopy}>
          <Image
            src={
              copied === post?.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            width={15}
            height={15}
            alt="Copied icon"
          />
        </div>
      </div>
      <p className="my-4 font-satoshi text-sm text-gray-700 dark:text-gray-300">
        {post?.prompt}
      </p>
      <p
        className="orange_gradient cursor-pointer font-inter text-sm"
        onClick={() => handleTagClick && handleTagClick(post?.tag)}
      >
        {post?.tag}
      </p>
      {session?.user.id === post?.creator?._id && pathName === "/profile" && (
        <div className="flex-end mt-5 gap-4 border-t border-gray-100 pt-3">
          <p
            className="green_gradient cursor-pointer font-inter text-sm"
            onClick={() => handleEdit && handleEdit(post)}
          >
            Edit
          </p>
          <p
            className="orange_gradient cursor-pointer font-inter text-sm"
            onClick={() => handleDelete && handleDelete(post)}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
}
