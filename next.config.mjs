/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  allowedDevOrigins: [
    "www.atit-rajarata.edu.lk",
    "atit-rajarata.edu.lk",
  ],
  serverActions: {
    allowedOrigins: [
      "www.atit-rajarata.edu.lk",
      "atit-rajarata.edu.lk",
      "localhost:3000",
    ],
  },
}

export default nextConfig
