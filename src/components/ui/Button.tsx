"use client";

import { motion } from "motion/react";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonProps = {
  variant?: "primary" | "secondary" | "ghost";
  children: ReactNode;
  className?: string;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
  disabled?: boolean;
  loading?: boolean;
  onClick?: ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
};

const variants = {
  primary:
    "bg-[var(--accent)] text-[var(--accent-ink)] hover:brightness-95 shadow-[0_10px_30px_rgba(184,240,0,0.25)]",
  secondary:
    "bg-[var(--bg-elevated)] text-[var(--fg)] border border-[var(--line)] hover:border-[var(--fg)]",
  ghost: "bg-transparent text-[var(--fg)] hover:bg-white/5",
};

function Spinner({ className }: { className?: string }) {
  return (
    <svg
      className={cn("size-4 animate-spin", className)}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity="0.25" strokeWidth="3" />
      <path d="M21 12a9 9 0 00-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export function Button({
  className,
  variant = "primary",
  children,
  type = "button",
  disabled,
  loading = false,
  onClick,
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <motion.button
      type={type}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      onClick={onClick}
      whileTap={isDisabled ? undefined : { scale: 0.97 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
      className={cn(
        "focus-ring inline-flex cursor-pointer items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition-[filter,background,border-color] duration-200 disabled:cursor-not-allowed disabled:opacity-60",
        variants[variant],
        className,
      )}
    >
      {loading ? <Spinner /> : null}
      {children}
    </motion.button>
  );
}
