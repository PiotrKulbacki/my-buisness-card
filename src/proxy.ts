import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

/**
 * Share crawlers (WhatsApp/Facebook/etc.) often drop previews on 307 + Set-Cookie
 * and on OG image URLs without a file extension.
 */
const SHARE_CRAWLER_UA =
  /facebookexternalhit|Facebot|WhatsApp|Twitterbot|LinkedInBot|Slackbot|TelegramBot|Discordbot|Google.*snippet|Pinterest|redditbot|Iframely|Embedly/i;

function isShareCrawler(request: NextRequest): boolean {
  return SHARE_CRAWLER_UA.test(request.headers.get("user-agent") ?? "");
}

function hasLocalePrefix(pathname: string): boolean {
  return routing.locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
}

function withoutLocaleCookie(response: NextResponse): NextResponse {
  response.headers.delete("set-cookie");
  return response;
}

/** Skip locale middleware for OG/Twitter image routes — crawlers dislike Set-Cookie on assets. */
export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname.includes("/opengraph-image") || pathname.includes("/twitter-image")) {
    return NextResponse.next();
  }

  if (isShareCrawler(request)) {
    if (!hasLocalePrefix(pathname)) {
      const suffix = pathname === "/" ? "" : pathname;
      request.nextUrl.pathname = `/${routing.defaultLocale}${suffix}`;
    }
    return withoutLocaleCookie(intlMiddleware(request));
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/", "/(pl|en|de|es|uk)/:path*", "/((?!api|_next|_vercel|.*\\..*).*)"],
};
