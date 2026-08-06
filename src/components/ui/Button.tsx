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
  onClick?: ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
};

const variants = {
  primary:
    "bg-[var(--accent)] text-[var(--accent-ink)] hover:brightness-95 shadow-[0_10px_30px_rgba(184,240,0,0.25)]",
  secondary:
    "bg-[var(--bg-elevated)] text-[var(--fg)] border border-[var(--line)] hover:border-[var(--fg)]",
  ghost: "bg-transparent text-[var(--fg)] hover:bg-black/5",
};

export function Button({
  className,
  variant = "primary",
  children,
  type = "button",
  disabled,
  onClick,
}: ButtonProps) {
  return (
    <motion.button
      type={type}
      disabled={disabled}
      onClick={onClick}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
      className={cn(
        "focus-ring inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition-[filter,background,border-color] duration-200 disabled:cursor-not-allowed disabled:opacity-60",
        variants[variant],
        className,
      )}
    >
      {children}
    </motion.button>
  );
}
