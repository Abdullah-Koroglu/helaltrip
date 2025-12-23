/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: process.env.NODE_ENV !== 'DEV' ? 'export' : 'standalone',
  images: {
    unoptimized: true,
    domains: ['images.unsplash.com', 'img.youtube.com'],
  },
}

module.exports = nextConfig 