/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "localhost",
      "secure-beyond-53875-586b6a225685.herokuapp.com",
      "res.cloudinary.com",
      "cdn.sanity.io",
    ],
  },
};

module.exports = nextConfig;
