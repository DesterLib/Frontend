/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['anilist.co', 'www.themoviedb.org', 's4.anilist.co', 'localhost', '192.168.0.178'],
  },
};

module.exports = nextConfig;
