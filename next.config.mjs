/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['img.icons8.com']
  },
  env: {
    GITHUB_TOKEN: process.env.NEXT_PUBLIC_GITHUB_TOKEN,
  }
};

export default nextConfig;
