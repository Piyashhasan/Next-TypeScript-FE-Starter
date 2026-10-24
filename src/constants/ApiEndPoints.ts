export const API_ENDPOINTS = {
  // -- Auth --
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    LOGOUT: "/auth/logout",
    REFRESH: "/auth/refresh",
    ME: "/auth/me",
  },

  // -- Post --
  POSTS: "/posts",
} as const;
