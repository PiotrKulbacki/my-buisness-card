"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useId, useRef, useState } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { locales, type Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

export function LanguageSwitcher({ className }: { className?: string }) {
  const t = useTranslations("nav");
  const tLang = useTranslations("languages");
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const listId = useId();

  useEffect(() => {
    if (!open) return;

    function onPointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  function selectLocale(next: Locale) {
    setOpen(false);
    if (next === locale) return;
    router.replace(pathname, { locale: next });
  }

  return (
    <div ref={rootRef} className={cn("relative w-full", className)}>
      <button
        type="button"
        className={cn(
          "flex w-full cursor-pointer items-center justify-between gap-2 rounded-full border border-[var(--line)] bg-[var(--bg-elevated)] px-3 py-2 text-left text-sm transition-[outline-color,border-color] duration-200",
          open
            ? "outline outline-2 outline-offset-3 outline-[var(--accent)]"
            : "outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[var(--accent)]",
        )}
        aria-label={t("language")}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((value) => !value)}
      >
        <span>{tLang(locale)}</span>
        <motion.span
          aria-hidden
          className="inline-block text-[var(--fg-muted)]"
          animate={{ rotate: open ? 180 : 0 }}
          transition={reduce ? { duration: 0 } : { duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
        >
          ▾
        </motion.span>
      </button>

      <AnimatePresence>
        {open ? (
          <motion.ul
            id={listId}
            role="listbox"
            aria-label={t("language")}
            initial={reduce ? false : { opacity: 0, y: -6, scaleY: 0.92 }}
            animate={{ opacity: 1, y: 0, scaleY: 1 }}
            exit={reduce ? undefined : { opacity: 0, y: -4, scaleY: 0.94 }}
            transition={reduce ? { duration: 0 } : { duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: "top center" }}
            className="absolute inset-x-0 bottom-full z-20 mb-2 overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--bg-elevated)] py-1 shadow-[var(--shadow)]"
          >
            {locales.map((code) => {
              const selected = code === locale;
              return (
                <li key={code} role="option" aria-selected={selected}>
                  <button
                    type="button"
                    className={cn(
                      "flex w-full cursor-pointer px-3 py-2.5 text-left text-sm transition-colors",
                      selected
                        ? "bg-white/10 font-medium text-[var(--fg)]"
                        : "text-[var(--fg-muted)] hover:bg-white/5 hover:text-[var(--fg)]",
                    )}
                    onClick={() => selectLocale(code)}
                  >
                    {tLang(code)}
                  </button>
                </li>
              );
            })}
          </motion.ul>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
