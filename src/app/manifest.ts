import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Let Justice Be Done",
    short_name: "Let Justice Be Done",
    description: "Let Justice Be Done",
    start_url: "/",
    display: "standalone",
    icons: [
      { src: "/icon-192.png", type: "image/png", sizes: "192x192" },
      {
        src: "/icon-mask.png",
        type: "image/png",
        sizes: "512x512",
        purpose: "maskable",
      },
      { src: "/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
  };
}
