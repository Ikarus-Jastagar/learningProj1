/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode:false,
    images: {
        unoptimized: true,
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'ucarecdn.com',
            pathname: '/**',
          },
        ],
        domains:["s3-ap-south-1.amazonaws.com"]
      },
    output:"export"
}
module.exports = nextConfig
