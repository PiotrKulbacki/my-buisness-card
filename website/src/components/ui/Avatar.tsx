import Image from "next/image";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

type AvatarProps = {
  className?: string;
};

/** Classic circular avatar with a light ring and headroom in the crop. */
export function Avatar({ className }: AvatarProps) {
  return (
    <div
      className={cn(
        "relative size-28 shrink-0 overflow-hidden rounded-full border border-[var(--line)] bg-[#141414]",
        className,
      )}
    >
      {siteConfig.avatarEnabled ? (
        <Image
          src={siteConfig.avatarSrc}
          alt={siteConfig.name}
          fill
          sizes="112px"
          priority
          className="object-cover object-[center_8%]"
        />
      ) : (
        <div
          aria-hidden
          className="flex size-full items-center justify-center text-sm tracking-wide text-[var(--fg-muted)]"
        >
          Foto
        </div>
      )}
    </div>
  );
}
