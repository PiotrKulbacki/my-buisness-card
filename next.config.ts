import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  reactCompiler: true,
  async redirects() {
    return [
      {
        source: "/:locale(pl|en|de|es|uk)/projects/ai-document",
        destination: "/:locale/projects/dokiero",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/og.png",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
