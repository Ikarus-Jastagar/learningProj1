/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode:false,
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'ucarecdn.com',
            pathname: '/**',
          },
        ],
        domains:["s3-ap-south-1.amazonaws.com"]
      },
}
module.exports = nextConfig
