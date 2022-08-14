/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [
      "storage.googleapis.com",
      "lh1.googleusercontent.com",
      "lh2.googleusercontent.com",
      "lh3.googleusercontent.com",
      "lh4.googleusercontent.com",
      "lh5.googleusercontent.com",
      "lh6.googleusercontent.com",
      "lh7.googleusercontent.com",
      "lh8.googleusercontent.com",
      "lh9.googleusercontent.com",
    ],
    // formats: ['image/avif', 'image/webp'],
  },
}

module.exports = nextConfig
