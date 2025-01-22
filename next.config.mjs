/** @type {import('next').NextConfig} */
const nextConfig = {
   images: {
      domains: ['cdn.sanity.io', 'image.icons8.com'],
    },
    staticPageGenerationTimeout: 120,
};

export default nextConfig;
