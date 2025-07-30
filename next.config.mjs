/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    useEslintrc: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
        pathname: '/images/**',
      },
    ],
  },
};

export default nextConfig;
