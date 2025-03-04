import type {NextConfig} from "next";

const nextConfig: NextConfig = {
    /* config options here */
    images: {
        dangerouslyAllowSVG: true, // TODO: REMOVE THIS BEFORE PRODUCTION
        remotePatterns: [
            {
                protocol: "https",
                hostname: "*",
            },
        ],
    },
    experimental: {
        ppr: "incremental" // ppr => PARTIAL PRE RENDERING
    },
    // HELPS TO VISUALIZE THE BUILD ACTIVITY
    // devIndicators:{
    //     appIsrStatus: true,
    //     buildActivity: true,
    //     buildActivityPosition: "bottom-right"
    // }
};

export default nextConfig;
