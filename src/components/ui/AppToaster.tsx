"use client";

import { Toaster } from "sonner";

export function AppToaster() {
  return (
    <Toaster
      theme="dark"
      position="top-center"
      richColors
      closeButton
      toastOptions={{
        classNames: {
          toast:
            "border border-[var(--line)] bg-[var(--bg-elevated)] text-[var(--fg)] shadow-[var(--shadow)]",
        },
      }}
    />
  );
}
