module.exports = {
  middleware: [
    (req, res, next) => {
      res.setHeader("X-Blitz", "Blitz.js App")
      return next()
    },
  ],
  env: {
    DATABASE_URL: process.env.DATABASE_URL,
  },
  experimental: {
    reactRoot: true,
  },
  future: {
    webpack5: true,
  },
  images: {
    domains: ['example.com'],
  },
  session: {
    cookiePrefix: "blitz",
    isSameSite: "lax",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    domain: process.env.SESSION_COOKIE_DOMAIN,
    secure: process.env.NODE_ENV === "production",
  },
  i18n: {
    locales: ["en-US"],
    defaultLocale: "en-US",
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  productionBrowserSourceMaps: true,
}