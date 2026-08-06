"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import { Avatar } from "@/components/ui/Avatar";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

const links = [
  { href: "/about", key: "about" as const },
  { href: "/projects", key: "projects" as const },
  { href: "/path", key: "path" as const },
  { href: "/contact", key: "contact" as const },
];

export function Sidebar() {
  const t = useTranslations("nav");
  const tSidebar = useTranslations("sidebar");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const brand = (
    <Link
      href="/"
      onClick={() => setOpen(false)}
      className="focus-ring flex flex-col items-center gap-3 rounded-xl text-center"
    >
      <Avatar />
      <div>
        <p className="text-base leading-tight font-semibold">{siteConfig.name}</p>
        <p className="mt-1 text-sm text-[var(--fg-muted)]">{tSidebar("role")}</p>
      </div>
    </Link>
  );

  const nav = (
    <nav className="flex flex-col gap-3" aria-label="Primary">
      {links.map((link) => {
        const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
        return (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setOpen(false)}
            className={cn(
              "focus-ring rounded-xl px-3 py-3.5 text-base transition-colors",
              active
                ? "bg-white/10 font-medium text-[var(--fg)]"
                : "text-[var(--fg-muted)] hover:bg-white/5 hover:text-[var(--fg)]",
            )}
          >
            {t(link.key)}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-50 flex h-14 items-center justify-between border-b border-[var(--line)] bg-[var(--bg)] px-4 md:hidden">
        <Link href="/" onClick={() => setOpen(false)} className="focus-ring text-sm font-semibold">
          {siteConfig.name}
        </Link>
        <button
          type="button"
          className="focus-ring rounded-full border border-[var(--line)] px-3 py-1.5 text-sm"
          aria-expanded={open}
          aria-controls="side-nav"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? t("closeMenu") : t("openMenu")}
        </button>
      </div>

      {open ? (
        <div
          className="fixed inset-0 z-40 bg-black/60 md:hidden"
          onClick={() => setOpen(false)}
          aria-hidden
        />
      ) : null}

      <aside
        id="side-nav"
        className={cn(
          "fixed top-0 left-0 z-50 flex h-full w-[min(84vw,300px)] flex-col border-r border-[var(--line)] bg-[var(--bg)] px-5 py-6 transition-transform duration-300 md:w-[var(--sidebar-w)] md:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full md:translate-x-0",
        )}
      >
        <div className="mb-6">{brand}</div>
        <div className="mb-6 border-t border-[var(--line)]" />
        <div className="flex-1">{nav}</div>
        <div className="mt-6 space-y-3 border-t border-[var(--line)] pt-4">
          <LanguageSwitcher className="w-full [&_select]:w-full" />
        </div>
      </aside>
    </>
  );
}
