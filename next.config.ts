import { createMDX } from "fumadocs-mdx/next"
import type { NextConfig } from "next"

const withMDX = createMDX()

const nextConfig: NextConfig = {
    rewrites() {
        return [
            {
                source: "/docs/:path*.md",
                destination: "/llm/:path*",
            },
        ]
    },
}

export default withMDX(nextConfig)
