/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";

/** @type {import("next").NextConfig} */
const config = {
  images: {
    remotePatterns: [
      new URL("https://i.ibb.co/**"),
      // Dev image URLs
      new URL("https://i.pravatar.cc/**"),
      new URL("https://picsum.photos/**"),
    ],
  },
};

export default config;
