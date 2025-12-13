//next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  
};
module.exports = {
  reactStrictMode: false,
}
export default nextConfig;
