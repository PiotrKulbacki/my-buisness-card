"use client";

import { useRouter } from "@/i18n/navigation";
import { Button } from "@/components/ui/Button";

type BriefSuccessProps = {
  title: string;
  body: string;
  contactLabel: string;
  homeLabel: string;
};

export function BriefSuccess({ title, body, contactLabel, homeLabel }: BriefSuccessProps) {
  const router = useRouter();

  return (
    <div className="border-line mx-auto flex max-w-xl flex-col items-center border-t pt-8 text-center">
      <h2 className="display text-2xl md:text-3xl">{title}</h2>
      <p className="text-fg-muted mt-4 text-base md:text-lg">{body}</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button type="button" className="min-w-44" onClick={() => router.push("/contact")}>
          {contactLabel}
        </Button>
        <Button type="button" variant="secondary" onClick={() => router.push("/")}>
          {homeLabel}
        </Button>
      </div>
    </div>
  );
}
