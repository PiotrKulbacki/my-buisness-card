"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";
import { useEffect, useState, useSyncExternalStore } from "react";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";
import {
  COOKIE_SETTINGS_EVENT,
  getConsentServerSnapshot,
  getConsentSnapshot,
  subscribeConsent,
  writeConsentCookie,
} from "@/lib/cookie-consent";

function subscribeIsClient(onStoreChange: () => void) {
  queueMicrotask(onStoreChange);
  return () => {};
}

function getIsClientSnapshot() {
  return true;
}

function getIsClientServerSnapshot() {
  return false;
}

export function CookieConsent() {
  const t = useTranslations("cookies");
  const reduce = useReducedMotion();
  const isClient = useSyncExternalStore(
    subscribeIsClient,
    getIsClientSnapshot,
    getIsClientServerSnapshot,
  );
  const consent = useSyncExternalStore(
    subscribeConsent,
    getConsentSnapshot,
    getConsentServerSnapshot,
  );
  const [forceOpen, setForceOpen] = useState(false);
  const visible = isClient && (forceOpen || consent === null);

  useEffect(() => {
    function onOpenSettings() {
      setForceOpen(true);
    }
    window.addEventListener(COOKIE_SETTINGS_EVENT, onOpenSettings);
    return () => window.removeEventListener(COOKIE_SETTINGS_EVENT, onOpenSettings);
  }, []);

  function save(analytics: boolean) {
    writeConsentCookie(analytics);
    setForceOpen(false);
  }

  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          role="dialog"
          aria-modal="false"
          aria-labelledby="cookie-consent-title"
          aria-describedby="cookie-consent-desc"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduce ? undefined : { opacity: 0, y: 12 }}
          transition={reduce ? { duration: 0 } : { duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="border-line bg-bg-elevated/95 fixed inset-x-3 bottom-[calc(4.5rem+env(safe-area-inset-bottom,0px))] z-60 max-w-lg rounded-2xl border p-4 shadow-(--shadow) backdrop-blur-md md:inset-x-auto md:right-6 md:bottom-6 md:p-5"
        >
          <h2 id="cookie-consent-title" className="text-fg text-sm font-medium">
            {t("title")}
          </h2>
          <p id="cookie-consent-desc" className="text-fg-muted mt-2 text-sm leading-relaxed">
            {t("body")}{" "}
            <Link href="/privacy#cookies" className="underline underline-offset-4">
              {t("learnMore")}
            </Link>
          </p>
          <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-end">
            <Button variant="secondary" className="px-4 py-2.5" onClick={() => save(false)}>
              {t("necessaryOnly")}
            </Button>
            <Button variant="primary" className="px-4 py-2.5" onClick={() => save(true)}>
              {t("acceptAll")}
            </Button>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
