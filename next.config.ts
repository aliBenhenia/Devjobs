import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['logo.clearbit.com'],
  },
  // Optional: Tailwind (if you're not using PostCSS config file)
  postcss: {
    plugins: [require('tailwindcss'), require('autoprefixer')],
  },
};

export default nextConfig;
