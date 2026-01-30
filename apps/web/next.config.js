/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: ['@apphub/db', '@apphub/config'],
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**.supabase.co',
            },
        ],
    },
    experimental: {
        typedRoutes: false,
    },
};

module.exports = nextConfig;
