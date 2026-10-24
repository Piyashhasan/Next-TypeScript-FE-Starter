"use client";

import { SWRConfig } from "swr";
import type { ReactNode } from "react";

import { apiRequest } from "@/lib/api";

const swrConfig = {
  fetcher: (url: string) => apiRequest({ url }),
  revalidateOnFocus: true,
  revalidateOnReconnect: true,
  shouldRetryOnError: false,
  dedupingInterval: 2_000,
};

export default function SWRProvider({ children }: { children: ReactNode }) {
  return <SWRConfig value={swrConfig}>{children}</SWRConfig>;
}
