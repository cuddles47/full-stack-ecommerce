require('dotenv').config()

const allowedOrigins = (process.env.IP_ALLOWED || 'localhost').split(',').map(origin => origin.trim())

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    // swcMinify: true,
    allowedDevOrigins: allowedOrigins,
    async headers() {
        return [
            {
                source: '/:path*',
                headers: [
                    {
                        key: 'Access-Control-Allow-Origin',
                        value: process.env.IP_ALLOWED || 'localhost'
                    }
                ]
            }
        ]
    }
}

module.exports = nextConfig
