"use client";

import { useSWRConfig } from "swr";
import { useState } from "react";
import { postServices, usePosts } from "@/services/posts/postServices";
import { API_ENDPOINTS } from "@/constants/ApiEndPoints";

export default function UserList() {
  const { posts, error, isLoading } = usePosts();
  const { mutate } = useSWRConfig();

  // -- handle create
  const [isCreating, setIsCreating] = useState(false);

  const handleCreate = async () => {
    setIsCreating(true);

    try {
      await postServices.create({
        name: "Rahim",
        email: "rahim@example.com",
      });

      await mutate(API_ENDPOINTS.POSTS);
    } catch (error) {
      console.error("Failed to create user:", error);
    } finally {
      setIsCreating(false);
    }
  };

  // -- handle delete --
  const handleDelete = async (id: number) => {
    try {
      await postServices.delete(id);
      await mutate(API_ENDPOINTS.POSTS);
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };

  if (isLoading) return <p>Loading posts...</p>;
  if (error) return <p>Failed to load posts.</p>;

  return (
    <section>
      <button onClick={handleCreate} disabled={isCreating}>
        {isCreating ? "Creating..." : "Create User"}
      </button>

      <div className="grid grid-cols-3">
        {posts.map((post) => (
          <div key={post.id} className="border m-5 p-5 rounded-2xl">
            <h4>{post.title}</h4>
            <p>{post.body}</p>
            <button onClick={() => handleDelete(post.id)}>Delete</button>
          </div>
        ))}
      </div>
      <p>check </p>
    </section>
  );
}
