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
          toast: "border border-line bg-bg-elevated text-fg shadow-(--shadow)",
        },
      }}
    />
  );
}
