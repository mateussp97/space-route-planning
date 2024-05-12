import createMiddleware from "next-intl/middleware";
import { localePrefix, locales } from "./navigation";

export default createMiddleware({
  localePrefix,
  locales,
  // Used when no locale matches
  defaultLocale: "en",
});

export const config = {
  // Match only internationalized pathnames
  matcher: ["/", "/(pt|en)/:path*"],
};
