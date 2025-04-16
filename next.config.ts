import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  postcss: {
    plugins: [require('tailwindcss')],
  },
};

export default nextConfig;
