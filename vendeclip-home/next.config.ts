import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  images: { unoptimized: true },
  devIndicators: false,
};

export default createNextIntlPlugin("./src/i18n/request.ts")(nextConfig);
