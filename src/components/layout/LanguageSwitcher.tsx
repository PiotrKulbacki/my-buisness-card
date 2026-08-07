"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useId, useRef, useState } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { locales, type Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

function GlobeIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3a14 14 0 0 1 0 18" />
      <path d="M12 3a14 14 0 0 0 0 18" />
    </svg>
  );
}

type LanguageSwitcherProps = {
  className?: string;
  /** Short locale codes (PL, EN, …) — used on mobile header. */
  compact?: boolean;
  /** Dropdown opens below the trigger (mobile top bar). Default: above. */
  menuPlacement?: "above" | "below";
};

export function LanguageSwitcher({
  className,
  compact = false,
  menuPlacement = "above",
}: LanguageSwitcherProps) {
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

  function labelFor(code: Locale) {
    return compact ? tLang(`short.${code}`) : tLang(code);
  }

  return (
    <div ref={rootRef} className={cn("relative", compact ? "w-auto" : "w-full", className)}>
      <button
        type="button"
        className={cn(
          "border-line bg-bg-elevated flex cursor-pointer items-center gap-2 rounded-full border text-left text-sm transition-[outline-color,border-color] duration-200",
          compact ? "px-2.5 py-1.5" : "w-full justify-between px-3 py-2",
          open
            ? "outline-accent outline outline-2 outline-offset-3"
            : "focus-visible:outline-accent outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3",
        )}
        aria-label={t("language")}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((value) => !value)}
      >
        <span className="flex min-w-0 items-center gap-2">
          <GlobeIcon className="text-fg-muted size-4 shrink-0" />
          <span>{labelFor(locale)}</span>
        </span>
        <motion.span
          aria-hidden
          className="text-fg-muted inline-block"
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
            initial={
              reduce ? false : { opacity: 0, y: menuPlacement === "below" ? -6 : 6, scaleY: 0.92 }
            }
            animate={{ opacity: 1, y: 0, scaleY: 1 }}
            exit={
              reduce
                ? undefined
                : { opacity: 0, y: menuPlacement === "below" ? -4 : 4, scaleY: 0.94 }
            }
            transition={reduce ? { duration: 0 } : { duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: menuPlacement === "below" ? "top center" : "bottom center" }}
            className={cn(
              "border-line bg-bg-elevated absolute z-20 overflow-hidden rounded-2xl border py-1 shadow-(--shadow)",
              compact ? "right-0 min-w-[7.5rem]" : "inset-x-0",
              menuPlacement === "below" ? "top-full mt-2" : "bottom-full mb-2",
            )}
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
                        ? "text-fg bg-white/10 font-medium"
                        : "text-fg-muted hover:text-fg hover:bg-white/5",
                    )}
                    onClick={() => selectLocale(code)}
                  >
                    {labelFor(code)}
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
