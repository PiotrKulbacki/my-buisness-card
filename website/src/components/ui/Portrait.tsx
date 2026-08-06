import Image from "next/image";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

type PortraitProps = {
  className?: string;
  priority?: boolean;
};

/** Hero portrait with soft edge blend into page background. */
export function Portrait({ className, priority }: PortraitProps) {
  return (
    <div className={cn("relative overflow-hidden bg-transparent", className)}>
      {siteConfig.portraitEnabled ? (
        <Image
          src={siteConfig.portraitSrc}
          alt={siteConfig.name}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, 48vw"
          className="object-cover object-top"
        />
      ) : (
        <>
          <div
            aria-hidden
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,#2a2a2a,transparent_55%),linear-gradient(180deg,#1a1a1a,#050505)]"
          />
          <div
            aria-hidden
            className="absolute inset-x-[18%] top-[12%] bottom-[-8%] rounded-[45%_45%_35%_35%] bg-[#2c2c2c]"
          />
        </>
      )}
      {/* Soft blend: bottom + sides + mild top into --bg */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            linear-gradient(to top, var(--bg) 0%, transparent 28%),
            linear-gradient(to bottom, var(--bg) 0%, transparent 14%),
            linear-gradient(to right, var(--bg) 0%, transparent 18%),
            linear-gradient(to left, var(--bg) 0%, transparent 18%)
          `,
        }}
      />
    </div>
  );
}
