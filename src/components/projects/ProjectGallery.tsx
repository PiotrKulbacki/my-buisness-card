"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useRef, useState } from "react";
import type { ProjectGalleryItem } from "@/content/projects";
import type { Locale } from "@/i18n/routing";
import { ProjectImageLightbox } from "@/components/projects/ProjectImageLightbox";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

type ProjectGalleryProps = {
  items: ProjectGalleryItem[];
  locale: Locale;
  title: string;
};

function useFineHover() {
  const [fineHover, setFineHover] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => setFineHover(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return fineHover;
}

function GalleryFigure({
  item,
  locale,
  index,
  fineHover,
  hovered,
  dimmed,
  onHoverStart,
  onHoverEnd,
  onOpen,
}: {
  item: ProjectGalleryItem;
  locale: Locale;
  index: number;
  fineHover: boolean;
  hovered: boolean;
  dimmed: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
  onOpen: () => void;
}) {
  const t = useTranslations("projects");
  const reduce = useReducedMotion();
  const figureRef = useRef<HTMLElement>(null);
  const inView = useInView(figureRef, { once: false, amount: 0.45 });

  const enterFromLeft = index % 2 === 0;
  const mobileFocus = !fineHover && !reduce && inView;

  return (
    <motion.figure
      ref={figureRef}
      className={cn("space-y-2", fineHover && hovered && "relative z-2")}
      initial={
        reduce
          ? false
          : {
              opacity: 0,
              y: 36,
              x: enterFromLeft ? -24 : 24,
            }
      }
      whileInView={reduce ? undefined : { opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.65, delay: 0.07 * index, ease: EASE }}
    >
      <motion.div
        animate={reduce ? undefined : fineHover ? undefined : { y: mobileFocus ? -4 : 0 }}
        transition={{ duration: 0.45, ease: EASE }}
      >
        <div
          role={item.src ? "button" : undefined}
          tabIndex={item.src ? 0 : undefined}
          aria-label={item.src ? t("expandImage") : undefined}
          className={cn(
            "border-line bg-bg-elevated relative aspect-4/3 overflow-hidden rounded-2xl border md:rounded-[20px]",
            item.src && "focus-ring cursor-pointer",
            mobileFocus && "border-accent/40 shadow-[0_0_0_1px_rgba(200,245,66,0.18)]",
          )}
          style={item.src || !item.gradient ? undefined : { background: item.gradient }}
          onClick={() => {
            if (item.src) onOpen();
          }}
          onKeyDown={(event) => {
            if (!item.src) return;
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              onOpen();
            }
          }}
          onMouseEnter={() => {
            if (!fineHover || reduce) return;
            onHoverStart();
          }}
          onMouseLeave={() => {
            if (!fineHover || reduce) return;
            onHoverEnd();
          }}
        >
          {item.src ? (
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 p-2 md:p-2.5">
              {/* Native img — same sharpness path as lightbox; Next/Image + CSS transform softens UI text */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.src}
                alt={item.caption[locale]}
                className="max-h-full max-w-full object-contain"
                loading="lazy"
                decoding="async"
              />
            </div>
          ) : null}

          <div
            aria-hidden
            className={cn(
              "pointer-events-none absolute inset-0 bg-(--bg)/55 transition-opacity duration-300",
              fineHover && dimmed ? "opacity-100" : "opacity-0",
            )}
          />
        </div>

        <div className="mt-2 space-y-1.5">
          <motion.div
            className="bg-accent h-px origin-left"
            initial={false}
            animate={{
              scaleX: !reduce && ((fineHover && hovered) || mobileFocus) ? 1 : 0,
            }}
            transition={{ duration: 0.35, ease: EASE }}
          />
          <figcaption
            className={cn(
              "text-fg-muted line-clamp-2 min-h-10 text-sm transition-opacity duration-300",
              fineHover && dimmed && "opacity-45",
            )}
          >
            {item.caption[locale]}
          </figcaption>
        </div>
      </motion.div>
    </motion.figure>
  );
}

export function ProjectGallery({ items, locale, title }: ProjectGalleryProps) {
  const t = useTranslations("projects");
  const reduce = useReducedMotion();
  const fineHover = useFineHover();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);
  const closeLightbox = useCallback(() => setLightbox(null), []);

  return (
    <section className="mt-10 md:mt-12">
      <motion.h2
        className="display text-2xl md:text-3xl"
        initial={reduce ? false : { opacity: 0, y: 22 }}
        whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.5, ease: EASE }}
      >
        {title}
      </motion.h2>
      <div className="mt-5 grid max-w-4xl gap-5 sm:grid-cols-2 md:mt-6 md:gap-6">
        {items.map((item, index) => (
          <GalleryFigure
            key={item.caption.en}
            item={item}
            locale={locale}
            index={index}
            fineHover={fineHover}
            hovered={hoveredIndex === index}
            dimmed={fineHover && hoveredIndex !== null && hoveredIndex !== index}
            onHoverStart={() => setHoveredIndex(index)}
            onHoverEnd={() => setHoveredIndex(null)}
            onOpen={() => {
              if (!item.src) return;
              setLightbox({ src: item.src, alt: item.caption[locale] });
            }}
          />
        ))}
      </div>

      <ProjectImageLightbox
        src={lightbox?.src ?? null}
        alt={lightbox?.alt ?? ""}
        closeLabel={t("closeImage")}
        onClose={closeLightbox}
      />
    </section>
  );
}
