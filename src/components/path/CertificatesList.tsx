"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";
import { useEffect, useId, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { PdfPagePreview } from "@/components/path/PdfPagePreview";
import { cn } from "@/lib/utils";

type CertificateItem = {
  id: string;
  title: string;
  issuer?: string;
  period: string;
  fileUrls?: string[];
};

type Props = {
  items: CertificateItem[];
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

function isImageUrl(url: string) {
  return /\.(png|jpe?g|webp|gif)$/i.test(url);
}

export function CertificatesList({ items }: Props) {
  const t = useTranslations("path");
  const reduce = useReducedMotion();
  const titleId = useId();
  const isClient = useIsClient();
  const [active, setActive] = useState<{ url: string; title: string } | null>(null);

  useEffect(() => {
    if (!active) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setActive(null);
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [active]);

  const modal =
    isClient &&
    createPortal(
      <AnimatePresence>
        {active ? (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="fixed inset-0 z-100 flex items-center justify-center p-4 md:p-8"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? undefined : { opacity: 0 }}
            transition={reduce ? { duration: 0 } : { duration: 0.2 }}
          >
            <button
              type="button"
              className="absolute inset-0 cursor-pointer bg-black/80"
              aria-label={t("closeCertificate")}
              onClick={() => setActive(null)}
            />

            <motion.div
              className="border-line bg-bg-elevated relative z-10 flex h-[min(82dvh,52rem)] w-[min(100%,92vw)] max-w-4xl flex-col overflow-hidden rounded-[20px] border shadow-(--shadow)"
              initial={reduce ? false : { opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduce ? undefined : { opacity: 0, scale: 0.98 }}
              transition={reduce ? { duration: 0 } : { duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="border-line flex shrink-0 items-start justify-between gap-3 border-b px-4 py-3 md:px-5">
                <div className="min-w-0">
                  <p id={titleId} className="truncate text-sm font-medium">
                    {active.title}
                  </p>
                  <a
                    href={active.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="focus-ring text-accent hover:text-fg mt-1 inline-block rounded text-xs underline underline-offset-4"
                  >
                    {t("openCertificateTab")}
                  </a>
                </div>
                <button
                  type="button"
                  className="focus-ring border-line text-fg hover:border-fg bg-bg shrink-0 cursor-pointer rounded-full border px-3 py-1.5 text-sm transition-colors"
                  onClick={() => setActive(null)}
                >
                  {t("closeCertificate")}
                </button>
              </div>
              {isImageUrl(active.url) ? (
                <div className="flex min-h-0 flex-1 items-center justify-center overflow-hidden bg-black/40 p-3 md:p-6">
                  {/* eslint-disable-next-line @next/next/no-img-element -- local certificate asset preview */}
                  <img
                    src={active.url}
                    alt={active.title}
                    className="max-h-[min(70dvh,100%)] max-w-[min(85vw,100%)] object-contain"
                  />
                </div>
              ) : (
                <PdfPagePreview url={active.url} title={active.title} />
              )}
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>,
      document.body,
    );

  return (
    <>
      <ul className="mt-5 space-y-3">
        {items.map((cert) => (
          <li key={cert.id} className="border-line border-t pt-3 first:border-t-0 first:pt-0">
            <p className="text-sm font-medium">{cert.title}</p>
            <p className="text-fg-muted mt-1 text-xs leading-normal">
              {cert.issuer ? `${cert.issuer} · ` : null}
              {cert.period}
            </p>
            {cert.fileUrls && cert.fileUrls.length > 0 ? (
              <div className="mt-1.5 flex flex-wrap gap-x-3 gap-y-1">
                {cert.fileUrls.map((url, index) => (
                  <button
                    key={url}
                    type="button"
                    onClick={() => setActive({ url, title: cert.title })}
                    className={cn(
                      "focus-ring text-accent hover:text-fg inline-block cursor-pointer rounded text-[12px] leading-tight font-normal underline underline-offset-2",
                    )}
                  >
                    {cert.fileUrls!.length > 1
                      ? `${t("viewCertificate")} ${index + 1}`
                      : t("viewCertificate")}
                  </button>
                ))}
              </div>
            ) : null}
          </li>
        ))}
      </ul>
      {modal}
    </>
  );
}
