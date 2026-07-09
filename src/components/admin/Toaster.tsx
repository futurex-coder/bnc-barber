"use client";

import { Toaster as SonnerToaster } from "sonner";

export function Toaster() {
  return (
    <SonnerToaster
      theme="dark"
      position="top-right"
      toastOptions={{
        style: {
          background: "#141417",
          border: "1px solid rgba(244,241,234,.12)",
          color: "#f4f1ea",
        },
      }}
    />
  );
}
