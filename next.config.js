/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'knqniswvwblfgsnidcxv.supabase.co',
        pathname: '/storage/v1/object/sign/product-images/**',
      },
    ],
    unoptimized: true
  },
}