import axios, { AxiosError } from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 10_000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// -- Request Interceptor: Attach Auth Token --
axiosInstance.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("accessToken");

      if (token && config.headers) {
        config.headers.set("Authorization", `Bearer ${token}`);
      }
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// -- Response Interceptor: Centralized Error & Auth Handling --
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError<{ message?: string }>) => {
    const status = error.response?.status;
    const responseData = error.response?.data;

    // token expire (401) & clear localStorage and redirect
    if (status === 401 && typeof window !== "undefined") {
      localStorage.removeItem("accessToken");

      if (!window.location.pathname.includes("/login")) {
        window.location.replace("/login");
      }
    }

    // backend error message clean and return
    const customErrorMessage =
      responseData?.message || error.message || "Something went wrong. Please try again.";

    return Promise.reject(new Error(customErrorMessage));
  },
);
