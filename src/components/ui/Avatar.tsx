"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useEffect, useId, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

type AvatarProps = {
  className?: string;
  /** `sm` for mobile header; `lg` for desktop sidebar. */
  size?: "sm" | "lg";
};

function subscribe() {
  return () => {};
}

function useIsClient() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}

/** Classic circular avatar — click to open an enlarged lightbox preview. */
export function Avatar({ className, size = "lg" }: AvatarProps) {
  const t = useTranslations("common");
  const reduce = useReducedMotion();
  const titleId = useId();
  const isClient = useIsClient();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const ring = (
    <span
      className={cn(
        "border-line relative block overflow-hidden rounded-full border bg-[#141414]",
        size === "sm" ? "size-8" : "size-28",
        className,
      )}
    >
      {siteConfig.avatarEnabled ? (
        <Image
          src={siteConfig.avatarSrc}
          alt={siteConfig.name}
          fill
          sizes={size === "sm" ? "32px" : "112px"}
          priority
          className={cn(
            "object-cover object-[center_8%]",
            // Mobile header: zoom so the crop ends at the waist; lightbox keeps the full portrait.
            size === "sm" && "origin-[center_30%] scale-[1.55]",
          )}
        />
      ) : (
        <span
          aria-hidden
          className="text-fg-muted flex size-full items-center justify-center text-sm tracking-wide"
        >
          Foto
        </span>
      )}
    </span>
  );

  if (!siteConfig.avatarEnabled) {
    return ring;
  }

  const lightbox =
    isClient &&
    createPortal(
      <AnimatePresence>
        {open ? (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="fixed inset-0 z-100 flex items-center justify-center p-6"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? undefined : { opacity: 0 }}
            transition={reduce ? { duration: 0 } : { duration: 0.2 }}
          >
            <button
              type="button"
              className="absolute inset-0 cursor-pointer bg-black/80"
              aria-label={t("closeAvatar")}
              onClick={() => setOpen(false)}
            />

            <motion.div
              className="relative z-10 flex w-full max-w-sm flex-col items-center gap-4"
              initial={reduce ? false : { opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduce ? undefined : { opacity: 0, scale: 0.96 }}
              transition={reduce ? { duration: 0 } : { duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              <p id={titleId} className="sr-only">
                {siteConfig.name}
              </p>
              <div className="border-line relative aspect-square w-full max-w-[min(80vw,22rem)] overflow-hidden rounded-full border bg-[#141414] shadow-(--shadow)">
                <Image
                  src={siteConfig.avatarSrc}
                  alt={siteConfig.name}
                  fill
                  sizes="(max-width: 480px) 80vw, 352px"
                  className="object-cover object-[center_8%]"
                  priority
                />
              </div>
              <button
                type="button"
                className="focus-ring border-line bg-bg-elevated text-fg hover:border-fg cursor-pointer rounded-full border px-4 py-2 text-sm transition-colors"
                onClick={() => setOpen(false)}
              >
                {t("closeAvatar")}
              </button>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>,
      document.body,
    );

  return (
    <>
      <button
        type="button"
        className="focus-ring shrink-0 cursor-pointer rounded-full transition-[outline-color] duration-200"
        aria-label={t("expandAvatar")}
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen(true)}
      >
        {ring}
      </button>
      {lightbox}
    </>
  );
}
