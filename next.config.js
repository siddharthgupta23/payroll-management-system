/** @type {import('next').NextConfig} */
const nextConfig = {
  // Use a proxy for API calls during local development to avoid CORS errors.
  // This forwards requests from /api/* to your local Express backend server.
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        // Change the port (4000) if your backend runs on a different port.
        destination: 'https://payroll-management-system-hyln.onrender.com/api/:path*',  
      },
    ]
  },
  // Other Next.js configuration goes here...
};

export default nextConfig;