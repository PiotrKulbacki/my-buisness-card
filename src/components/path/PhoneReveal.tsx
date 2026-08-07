"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

/** Base64 — not plain phone text for naive HTML scrapers. */
const PHONE_B64 = "KzQ5IDE1NzMgNTE2Njg3MQ==";
const TEL_B64 = "KzQ5MTU3MzUxNjY4NzE=";

function decodePhone() {
  return {
    display: atob(PHONE_B64),
    tel: atob(TEL_B64),
  };
}

type Props = {
  className?: string;
};

export function PhoneReveal({ className }: Props) {
  const t = useTranslations("path");
  const [revealed, setRevealed] = useState(false);

  if (!revealed) {
    return (
      <button
        type="button"
        onClick={() => setRevealed(true)}
        className={cn(
          "focus-ring text-fg-muted hover:text-fg inline-flex cursor-pointer items-center gap-2 rounded-lg text-sm transition-colors",
          className,
        )}
      >
        <span aria-hidden className="tracking-wider blur-[5px] select-none">
          +49 0000 0000000
        </span>
        <span className="decoration-line underline underline-offset-4">{t("showPhone")}</span>
      </button>
    );
  }

  const phone = decodePhone();

  return (
    <a
      href={`tel:${phone.tel}`}
      className={cn(
        "focus-ring text-fg hover:text-accent inline-flex cursor-pointer rounded-lg text-sm transition-colors",
        className,
      )}
    >
      {phone.display}
    </a>
  );
}
