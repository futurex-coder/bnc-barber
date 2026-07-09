import type { NextConfig } from "next";

// Allow next/image to serve images uploaded to Supabase Storage (public bucket).
const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://qqaiagnnebjkzmxfyjvu.supabase.co";
const supabaseHost = supabaseUrl ? new URL(supabaseUrl).hostname : undefined;

const nextConfig: NextConfig = {
  images: {
    remotePatterns: supabaseHost
      ? [
          {
            protocol: "https",
            hostname: supabaseHost,
            pathname: "/storage/v1/object/public/**",
          },
        ]
      : [],
  },
};

export default nextConfig;
