/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Cho phép load ảnh từ các domain ngoài
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
      { protocol: 'http', hostname: '**' },
    ],
    domains: [
      'media-cdn-v2.laodong.vn',
    ],
  },
};

export default nextConfig;
