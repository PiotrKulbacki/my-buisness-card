import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Geist, Geist_Mono, Syne } from "next/font/google";
import type { ReactNode } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Footer } from "@/components/layout/Footer";
import { CookieAndAnalytics } from "@/components/cookies/CookieAndAnalytics";
import { PageTransition } from "@/components/motion/PageTransition";
import { JsonLd } from "@/components/seo/JsonLd";
import { AppToaster } from "@/components/ui/AppToaster";
import { routing } from "@/i18n/routing";
import { siteConfig } from "@/config/site";
import { brandShareImage, buildPageMetadata } from "@/lib/seo";
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
  const page = buildPageMetadata({
    locale,
    path: "",
    description: t("description"),
  });

  const facebookAppId = process.env.NEXT_PUBLIC_FACEBOOK_APP_ID?.trim();
  const shareImage = brandShareImage(locale);

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: t("title"),
      template: `%s · ${siteConfig.name}`,
    },
    description: t("description"),
    icons: {
      icon: [
        { url: "/brand/google-120.png", sizes: "120x120", type: "image/png" },
        { url: "/favicon-192.png", sizes: "192x192", type: "image/png" },
        { url: "/favicon-96.png", sizes: "96x96", type: "image/png" },
        { url: "/favicon-48.png", sizes: "48x48", type: "image/png" },
        { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
        { url: "/favicon.ico", sizes: "48x48" },
      ],
      apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    },
    alternates: page.alternates,
    openGraph: {
      ...page.openGraph,
      siteName: siteConfig.name,
      title: t("title"),
      description: t("description"),
      images: [shareImage],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: [shareImage.url],
    },
    ...(facebookAppId ? { facebook: { appId: facebookAppId } } : {}),
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
      className={`${geistSans.variable} ${geistMono.variable} ${syne.variable} h-full overflow-hidden antialiased`}
    >
      <body className="relative h-dvh overflow-hidden md:h-full" suppressHydrationWarning>
        <NextIntlClientProvider messages={messages}>
          <div className="site-grid" aria-hidden />
          <div className="site-grain" aria-hidden />
          <Sidebar />
          <div className="relative z-10 flex h-dvh flex-col overflow-hidden pt-14 pb-[calc(3.5rem+env(safe-area-inset-bottom,0px))] md:h-svh md:pt-0 md:pb-0 md:pl-(--sidebar-w)">
            <div className="min-h-0 flex-1 overflow-y-auto overscroll-y-contain" id="site-scroll">
              <main className="mx-auto w-full max-w-5xl px-5 py-6 md:px-8 md:py-8">
                <PageTransition>{children}</PageTransition>
              </main>
              <div className="md:hidden">
                <Footer />
              </div>
            </div>
            <div className="hidden shrink-0 md:block">
              <Footer />
            </div>
          </div>
          <AppToaster />
          <JsonLd />
          <CookieAndAnalytics />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
