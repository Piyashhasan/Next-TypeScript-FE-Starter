import { API_ENDPOINTS } from "@/constants/ApiEndPoints";
import { apiRequest, useApi } from "@/lib/api";
import { sanitizeSinglePost, sanitizePostList } from "@/sanitizer/posts/postSanitizer";
import { CreateUserPayload, Post } from "@/types/posts/post.types";

export const postServices = {
  create: (payload: CreateUserPayload) =>
    apiRequest<Post, CreateUserPayload>({
      url: API_ENDPOINTS.POSTS,
      method: "POST",
      payload,
    }),

  update: (id: number, payload: Partial<CreateUserPayload>) =>
    apiRequest<Post, Partial<CreateUserPayload>>({
      url: `${API_ENDPOINTS.POSTS}/${id}`,
      method: "PATCH",
      payload,
    }),

  delete: (id: number) =>
    apiRequest<void>({
      url: `${API_ENDPOINTS.POSTS}/${id}`,
      method: "DELETE",
    }),
};

// ----------------------------
// -- SWR hook for post list --
// ----------------------------
export function usePosts() {
  const result = useApi<Post[]>(API_ENDPOINTS.POSTS);

  return {
    posts: result.data ? sanitizePostList(result.data) : [],
    error: result.error,
    isLoading: result.isLoading,
    isValidating: result.isValidating,
    mutate: result.mutate,
  };
}

// ------------------------------------
// -- SWR hook for single post by ID --
// ------------------------------------
export function usePost(id?: number | string | null) {
  const result = useApi<Post>(id ? `${API_ENDPOINTS.POSTS}/${id}` : null);

  return {
    post: result.data ? sanitizeSinglePost(result.data) : null,
    error: result.error,
    isLoading: result.isLoading,
    isValidating: result.isValidating,
    mutate: result.mutate,
  };
}
