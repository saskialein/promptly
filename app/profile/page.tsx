"use client";

import { Prompt, PromptList } from "@components/Feed";
import Profile from "@components/Profile";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";

export default function MyProfile() {
  const { data: session } = useSession();
  const router = useRouter();

  const [posts, setPosts] = useState<PromptList>([]);

  const fetchPosts = async () => {
    const response = await fetch(`/api/users/${session?.user.id}/posts`);
    const data = await response.json();
    setPosts(data);
  };

  useEffect(() => {
    if (session?.user.id) fetchPosts();
  }, [session]);

  const handleEdit = (post: Prompt) => {
    router.push(`update-prompt?id=${post._id}`);
  };

  const handleDelete = async (post: Prompt) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt?"
    );

    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: "DELETE",
        });

        const filteredPosts = posts?.filter((p) => p?._id !== post._id);
        setPosts(filteredPosts);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <Profile
      name="My"
      desc="Welcome to your personalised profile page"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
}
