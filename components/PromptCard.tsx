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
      <div className="flex justify-between items-start gap-5">
        <div
          className="flex-1 flex justify-start items-center gap-3 cursor-pointer"
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
        className="font-inter text-sm orange_gradient cursor-pointer"
        onClick={() => handleTagClick && handleTagClick(post?.tag)}
      >
        {post?.tag}
      </p>
      {session?.user.id === post?.creator?._id && pathName === "/profile" && (
        <div className="mt-5 flex-end gap-4 border-t border-gray-100 pt-3">
          <p
            className="font-inter text-sm green_gradient cursor-pointer"
            onClick={() => handleEdit && handleEdit(post)}
          >
            Edit
          </p>
          <p
            className="font-inter text-sm orange_gradient cursor-pointer"
            onClick={() => handleDelete && handleDelete(post)}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
}
