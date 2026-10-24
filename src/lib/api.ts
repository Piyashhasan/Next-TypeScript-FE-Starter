"use client";

import useSWR from "swr";
import toast from "react-hot-toast";
import { axiosInstance } from "./axios";
import type { AxiosRequestConfig, Method } from "axios";

type ApiRequestConfig<TPayload = unknown> = {
  url: string;
  method?: Method;
  payload?: TPayload;
  params?: Record<string, unknown>;
  headers?: AxiosRequestConfig["headers"];
  signal?: AbortSignal;
};

// -- Reusable API request --
export async function apiRequest<TResponse = unknown, TPayload = unknown>({
  url,
  method = "GET",
  payload,
  params,
  headers,
  signal,
}: ApiRequestConfig<TPayload>): Promise<TResponse> {
  try {
    const response = await axiosInstance.request<TResponse>({
      url,
      method,
      data: payload,
      params,
      headers,
      signal,
    });

    const data = response?.data as { message?: string } | undefined;

    if (method !== "GET" && data?.message) {
      toast.success(data.message);
    }

    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      toast.error(error.message);
    }
    throw error;
  }
}

// -- Reusable SWR hook --
export function useApi<TResponse>(url: string | null) {
  const { data, error, isLoading, isValidating, mutate } = useSWR<TResponse>(url);

  return {
    data,
    error,
    isLoading,
    isValidating,
    mutate,
  };
}
