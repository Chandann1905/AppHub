/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    transpilePackages: ['@apphub/db', '@apphub/config'],
    eslint: {
        dirs: ['app', 'src'],
    },
};

module.exports = nextConfig;
