import { Post } from "@/types/posts/post.types";

// -- single post --
export const sanitizeSinglePost = (data?: Partial<Post> | null): Post => {
  return {
    userId: data?.userId as number,
    id: data?.id as number,
    title: data?.title as string,
    body: data?.body as string,
  };
};

// -- list of post objects --
export const sanitizePostList = (data?: Partial<Post>[] | null): Post[] => {
  if (!Array.isArray(data)) return [];
  return data?.map((item) => sanitizeSinglePost(item));
};
