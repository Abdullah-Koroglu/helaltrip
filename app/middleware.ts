// middleware.ts
import createMiddleware from "next-intl/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const intlMiddleware = createMiddleware({
  locales: ["tr", "en"],
  defaultLocale: "tr",
});

export default function middleware(request: NextRequest) {
  const response = intlMiddleware(request);

  response.headers.set(
    "Content-Security-Policy",
    `
default-src 'self';
script-src 'self' 'unsafe-inline' 'unsafe-eval'
  https://www.googletagmanager.com
  https://www.google-analytics.com
  https://www.googleadservices.com
  https://googleads.g.doubleclick.net
  https://stats.g.doubleclick.net
  https://www.google.com;
connect-src 'self'
  https://www.google-analytics.com
  https://www.googletagmanager.com
  https://www.googleadservices.com
  https://www.google.com
  https://googleads.g.doubleclick.net
  https://stats.g.doubleclick.net;
img-src 'self' data: https:;
style-src 'self' 'unsafe-inline';
frame-src https://www.googletagmanager.com;
`.replace(/\s{2,}/g, " ").trim()
  );

  return response;
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
