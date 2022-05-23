/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['api.nasa.gov', 'images-assets.nasa.gov'],
  },
}

module.exports = nextConfig
