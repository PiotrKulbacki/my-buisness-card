"use client";

import { useTranslations } from "next-intl";
import type { ReactNode } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import { BrandLogo } from "@/components/brand/BrandLogo";
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

function NavIcon({ children }: { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-5 shrink-0"
      aria-hidden
    >
      {children}
    </svg>
  );
}

const icons: Record<(typeof links)[number]["key"], ReactNode> = {
  about: (
    <NavIcon>
      {/* Person + spark — identity */}
      <circle cx="12" cy="8" r="3.25" />
      <path d="M5.5 19.5c1.2-3.2 3.4-4.8 6.5-4.8s5.3 1.6 6.5 4.8" />
      <path d="M18.2 4.2l.4 1.1 1.1.4-1.1.4-.4 1.1-.4-1.1-1.1-.4 1.1-.4z" />
    </NavIcon>
  ),
  projects: (
    <NavIcon>
      {/* Stacked boards — projects */}
      <rect x="4" y="5" width="14" height="10" rx="2" />
      <path d="M7 17h11a2 2 0 0 0 2-2V8" />
      <path d="M8 9.5h6M8 12.5h4" />
    </NavIcon>
  ),
  path: (
    <NavIcon>
      {/* Ascending path / milestones */}
      <path d="M4 17.5c2.2-1.2 3.4-3.4 5.2-5.1 1.5-1.4 3.1-1.4 4.6 0L18 16" />
      <circle cx="6.2" cy="16.2" r="1.4" />
      <circle cx="12" cy="11.2" r="1.4" />
      <circle cx="18" cy="15.8" r="1.4" />
      <path d="M18 12.5v-3.2h-3.2" />
    </NavIcon>
  ),
  contact: (
    <NavIcon>
      {/* Chat bubble with pulse */}
      <path d="M5.5 17.5 4 20l3.2-.9A7.8 7.8 0 1 0 5.5 17.5Z" />
      <path d="M9 11h.01M12 11h.01M15 11h.01" />
    </NavIcon>
  ),
};

export function Sidebar() {
  const t = useTranslations("nav");
  const pathname = usePathname();

  return (
    <>
      {/* Mobile top bar: avatar + brand lockup | language */}
      <header className="border-line bg-bg/95 fixed inset-x-0 top-0 z-50 flex h-14 items-center justify-between gap-3 border-b px-4 backdrop-blur-md md:hidden">
        <div className="flex min-w-0 items-center gap-2.5">
          <Avatar size="sm" />
          <Link
            href="/"
            className="focus-ring block max-w-46 min-w-0 rounded-lg"
            aria-label={siteConfig.name}
          >
            <BrandLogo
              variant="lockupHorizontal"
              decorative
              loading="eager"
              sizes="184px"
              className="h-7 w-auto max-w-full"
            />
          </Link>
        </div>
        <LanguageSwitcher compact menuPlacement="below" />
      </header>

      {/* Mobile bottom tab bar */}
      <nav
        className="border-line bg-bg/95 fixed inset-x-0 bottom-0 z-50 border-t backdrop-blur-md md:hidden"
        style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
        aria-label={t("primaryNav")}
      >
        <ul className="grid h-14 grid-cols-4">
          {links.map((link) => {
            const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <li key={link.href} className="flex min-w-0 items-center justify-center">
                <Link
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "focus-ring mx-1 flex h-12 w-full flex-col items-center justify-center gap-0.5 rounded-xl px-1 text-center text-[10px] leading-tight transition-colors",
                    active
                      ? "bg-accent/10 text-accent font-medium"
                      : "text-fg-muted active:text-fg",
                  )}
                >
                  {icons[link.key]}
                  <span className="line-clamp-1">
                    {link.key === "path" ? t("pathMobile") : t(link.key)}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Desktop sidebar */}
      <aside
        className="border-line bg-bg fixed top-0 left-0 z-50 hidden h-full w-(--sidebar-w) flex-col border-r pt-6 md:flex"
        aria-label={t("primaryNav")}
      >
        <div className="mb-6 flex flex-col items-center gap-3 px-5 text-center">
          <Avatar />
          <Link
            href="/"
            className="focus-ring w-full max-w-40 rounded-xl"
            aria-label={siteConfig.name}
          >
            <BrandLogo
              variant="lockupSide"
              decorative
              loading="eager"
              sizes="160px"
              className="mx-auto h-auto w-full max-w-40"
            />
          </Link>
        </div>
        <div className="border-line mx-5 mb-6 border-t" />
        <nav className="flex flex-1 flex-col gap-3 px-5" aria-label={t("primaryNav")}>
          {links.map((link) => {
            const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "focus-ring rounded-xl px-3 py-3.5 text-base transition-colors",
                  active
                    ? "text-fg bg-white/10 font-medium"
                    : "text-fg-muted hover:text-fg hover:bg-white/5",
                )}
              >
                {t(link.key)}
              </Link>
            );
          })}
        </nav>
        <div className="border-line flex h-(--site-footer-h) shrink-0 items-center border-t px-5">
          <LanguageSwitcher className="w-full" />
        </div>
      </aside>
    </>
  );
}
