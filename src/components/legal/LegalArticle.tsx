import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";

export function LegalArticle({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: ReactNode;
}) {
  return (
    <section className="py-16 md:py-24">
      <Reveal>
        <h1 className="display text-4xl md:text-6xl">{title}</h1>
        {subtitle ? <p className="text-fg-muted mt-3 text-sm">{subtitle}</p> : null}
        <div className="prose-like text-fg-muted mt-8 max-w-3xl space-y-8">{children}</div>
      </Reveal>
    </section>
  );
}

export function LegalSection({ heading, children }: { heading: string; children: ReactNode }) {
  return (
    <div className="space-y-2">
      <h2 className="text-fg text-lg font-medium">{heading}</h2>
      {children}
    </div>
  );
}

/** Split i18n bodies that use blank lines as paragraph breaks. */
export function LegalParagraphs({ text }: { text: string }) {
  return text.split(/\n\n+/).map((paragraph, index) => (
    <p key={`${index}:${paragraph.length}`} className="whitespace-pre-wrap">
      {paragraph}
    </p>
  ));
}
