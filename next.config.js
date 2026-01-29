const createNextIntlPlugin = require("next-intl/plugin");

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,

    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "img.youtube.com",
        pathname: "/**",
      },
    ],
  },

  // ✅ CSP EKLENDİ
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: `
              default-src 'self';
              script-src 'self' 'unsafe-inline' 'unsafe-eval'
                https://www.googletagmanager.com
                https://www.google-analytics.com
                https://www.googleadservices.com;
              connect-src 'self'
                https://www.google-analytics.com
                https://www.googleadservices.com
                https://stats.g.doubleclick.net;
              img-src 'self' data:
                https://www.google-analytics.com
                https://www.googleadservices.com
                https://stats.g.doubleclick.net;
              frame-src https://www.googletagmanager.com;
            `.replace(/\s{2,}/g, " ").trim(),
          },
        ],
      },
    ];
  },
};

const withNextIntl = createNextIntlPlugin("");

module.exports = withNextIntl(nextConfig);
