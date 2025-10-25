/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['@xata.io/client'],
  },
  images: {
    domains: ['pbxt.replicate.delivery', 'replicate.delivery', 'avatars.githubusercontent.com', 'lh3.googleusercontent.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.public.blob.vercel-storage.com',
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: false,
  },
};

module.exports = nextConfig;
