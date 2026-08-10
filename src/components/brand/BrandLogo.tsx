import Image from "next/image";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

const variants = {
  mark: {
    src: siteConfig.brand.mark,
    width: 499,
    height: 705,
  },
  lockupHorizontal: {
    src: siteConfig.brand.lockupHorizontal,
    width: 1065,
    height: 272,
  },
  lockupStacked: {
    src: siteConfig.brand.lockupStacked,
    width: 502,
    height: 757,
  },
  lockupSide: {
    src: siteConfig.brand.lockupSide,
    width: 1388,
    height: 622,
  },
} as const;

export type BrandLogoVariant = keyof typeof variants;

type BrandLogoProps = {
  variant: BrandLogoVariant;
  className?: string;
  /** Intrinsic layout hint for next/image `sizes` */
  sizes?: string;
  priority?: boolean;
  /** Above-fold chrome: eager without competing LCP preload (`priority`). */
  loading?: "eager" | "lazy";
  /** Decorative when parent already names the brand (e.g. linked logo). */
  decorative?: boolean;
};

export function BrandLogo({
  variant,
  className,
  sizes,
  priority = false,
  loading,
  decorative = false,
}: BrandLogoProps) {
  const asset = variants[variant];

  return (
    <Image
      src={asset.src}
      alt={decorative ? "" : siteConfig.name}
      width={asset.width}
      height={asset.height}
      sizes={sizes}
      priority={priority}
      loading={priority ? undefined : loading}
      className={cn("object-contain", className)}
    />
  );
}
