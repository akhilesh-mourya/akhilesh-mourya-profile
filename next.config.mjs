const nextConfig = {
  reactStrictMode: true,
  allowedDevOrigins: ["127.0.0.1"],
  // Keep optional production verification separate from a running development server.
  distDir: process.env.PORTFOLIO_BUILD_DIR || ".next",
  experimental: { cpus: 2 },
};
export default nextConfig;
