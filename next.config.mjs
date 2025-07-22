/** @type {import('next').NextConfig} */
const nextConfig = {
    swcMinify: true,
    images: {
        remotePatterns: [
            {
                hostname: "image.tmdb.org"
            },
            {
                protocol: 'https',
                hostname: 'watchzy-backend-2.onrender.com',
            },
        ]
    }
};

export default nextConfig;
