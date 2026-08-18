import { getTranslations, setRequestLocale } from "next-intl/server";
import { ReplyForm } from "@/components/contact/ReplyForm";
import { Reveal } from "@/components/motion/Reveal";
import { BackLink } from "@/components/ui/BackLink";
import { verifyReplyToken } from "@/lib/reply-token";

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ t?: string | string[] }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "reply" });
  return {
    title: t("title"),
    description: t("lead"),
    robots: { index: false, follow: false },
  };
}

export default async function ReplyPage({ params, searchParams }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("reply");
  const query = await searchParams;
  const rawToken = query.t;
  const token = Array.isArray(rawToken) ? rawToken[0] : rawToken;
  const payload = verifyReplyToken(token);

  return (
    <section className="py-6 md:py-8">
      <Reveal>
        <p className="mb-4">
          <BackLink href="/">{t("backHome")}</BackLink>
        </p>
        <h1 className="display text-4xl md:text-5xl lg:text-6xl">{t("title")}</h1>
        <p className="text-fg-muted mt-4 max-w-2xl">{payload ? t("lead") : t("invalid")}</p>
      </Reveal>
      {payload && token ? (
        <Reveal delay={0.08} className="mt-8">
          <ReplyForm token={token} recipientName={payload.name} recipientEmail={payload.to} />
        </Reveal>
      ) : null}
    </section>
  );
}
