/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Build mandiri (.next/standalone) untuk image Docker yang ramping.
  output: 'standalone',
};

export default nextConfig;
