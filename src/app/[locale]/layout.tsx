import { Analytics } from "@vercel/analytics/react";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Geist, Geist_Mono, Syne } from "next/font/google";
import type { ReactNode } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Footer } from "@/components/layout/Footer";
import { PageTransition } from "@/components/motion/PageTransition";
import { JsonLd } from "@/components/seo/JsonLd";
import { AppToaster } from "@/components/ui/AppToaster";
import { routing } from "@/i18n/routing";
import { siteConfig } from "@/config/site";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "latin-ext"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600", "700"],
});

type Props = {
  children: ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: t("title"),
      template: `%s · ${siteConfig.name}`,
    },
    description: t("description"),
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: siteConfig.url,
      siteName: siteConfig.name,
      locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
    },
    alternates: {
      languages: Object.fromEntries(routing.locales.map((code) => [code, `/${code}`])),
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} ${syne.variable} h-full antialiased`}
    >
      <body className="relative min-h-full" suppressHydrationWarning>
        <NextIntlClientProvider messages={messages}>
          <div className="site-grid" aria-hidden />
          <div className="site-grain" aria-hidden />
          <Sidebar />
          <div className="relative z-10 flex min-h-full flex-col pt-14 md:pt-0 md:pl-[var(--sidebar-w)]">
            <main className="mx-auto w-full max-w-5xl flex-1 px-5 py-6 md:px-8 md:py-8">
              <PageTransition>{children}</PageTransition>
            </main>
            <Footer />
          </div>
          <AppToaster />
          <JsonLd />
          <Analytics />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
