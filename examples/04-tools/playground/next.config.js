/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ['@ai-toolkit/provider'],
  transpilePackages: ['ai'],
};

export default nextConfig;
