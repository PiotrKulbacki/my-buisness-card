"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useId, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";

type ProjectImageLightboxProps = {
  src: string | null;
  alt: string;
  closeLabel: string;
  onClose: () => void;
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

export function ProjectImageLightbox({ src, alt, closeLabel, onClose }: ProjectImageLightboxProps) {
  const reduce = useReducedMotion();
  const titleId = useId();
  const isClient = useIsClient();

  useEffect(() => {
    if (!src) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [src, onClose]);

  if (!isClient) return null;

  return createPortal(
    <AnimatePresence>
      {src ? (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          className="fixed inset-0 z-100 flex items-center justify-center p-3 md:p-8"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={reduce ? undefined : { opacity: 0 }}
          transition={reduce ? { duration: 0 } : { duration: 0.2 }}
        >
          <button
            type="button"
            className="absolute inset-0 cursor-pointer bg-black/85"
            aria-label={closeLabel}
            onClick={onClose}
          />

          <motion.div
            className="border-line bg-bg-elevated relative z-10 flex max-h-[92dvh] w-full max-w-5xl flex-col overflow-hidden rounded-[20px] border shadow-(--shadow)"
            // Opacity/y only — CSS `scale` on the shell softens UI screenshots in the lightbox
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: 8 }}
            transition={reduce ? { duration: 0 } : { duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="border-line flex items-center justify-between gap-3 border-b px-4 py-3">
              <p id={titleId} className="text-fg-muted min-w-0 truncate text-sm">
                {alt}
              </p>
              <button
                type="button"
                className="focus-ring border-line text-fg hover:border-fg bg-bg shrink-0 cursor-pointer rounded-full border px-3 py-1.5 text-sm transition-colors"
                onClick={onClose}
              >
                {closeLabel}
              </button>
            </div>
            <div className="flex flex-1 items-center justify-center overflow-auto bg-black/40 p-3 md:p-6">
              {/* eslint-disable-next-line @next/next/no-img-element -- lightbox needs natural full-size preview */}
              <img
                src={src}
                alt={alt}
                className="max-h-[min(80dvh,52rem)] max-w-full object-contain [image-rendering:auto]"
                decoding="sync"
              />
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
