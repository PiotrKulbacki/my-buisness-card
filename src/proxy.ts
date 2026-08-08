import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

/** Skip locale middleware for OG/Twitter image routes — crawlers dislike Set-Cookie on assets. */
export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname.includes("/opengraph-image") || pathname.includes("/twitter-image")) {
    return NextResponse.next();
  }
  return intlMiddleware(request);
}

export const config = {
  matcher: ["/", "/(pl|en|de|es|uk)/:path*", "/((?!api|_next|_vercel|.*\\..*).*)"],
};
