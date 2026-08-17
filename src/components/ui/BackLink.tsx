import type { ReactNode } from "react";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

type BackLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
};

export function BackLink({ href, children, className }: BackLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "text-fg-muted hover:text-fg group inline-flex items-center gap-2 text-sm no-underline",
        className,
      )}
    >
      <span aria-hidden="true">←</span>
      <span className="relative after:absolute after:right-0 after:bottom-0 after:left-0 after:h-px after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:after:scale-x-100 motion-reduce:after:transition-none">
        {children}
      </span>
    </Link>
  );
}
