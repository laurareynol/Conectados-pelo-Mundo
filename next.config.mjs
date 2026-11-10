/**
 * Por padrão, roda como app Next.js normal (npm run dev / build / start).
 * Com PAGES_BASE_PATH definido, gera um site estático (pasta `out/`) para o GitHub Pages:
 *   PAGES_BASE_PATH=/Conectados-pelo-Mundo npm run build:pages
 */
const basePath = process.env.PAGES_BASE_PATH || "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  ...(basePath ? { output: "export", basePath, trailingSlash: true, images: { unoptimized: true } } : {}),
};

export default nextConfig;
