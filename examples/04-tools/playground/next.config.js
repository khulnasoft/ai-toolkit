/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ['@ai-toolkit/provider'],
  transpilePackages: ['ai-toolkit'],
};

export default nextConfig;
