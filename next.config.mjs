import { withAxiom } from "next-axiom";
/**
 * Don't be scared of the generics here.
 * All they do is to give us autocompletion when using this.
 *
 * @template {import('next').NextConfig} T
 * @param {T} config - A generic parameter that flows through to the return type
 * @constraint {{import('next').NextConfig}}
 */
function defineNextConfig(config) {
  return withAxiom(config);
}

export default defineNextConfig({
  reactStrictMode: false,
  swcMinify: true,
  // Next.js i18n docs: https://nextjs.org/docs/advanced-features/i18n-routing
  i18n: {
    locales: ["vi"],
    defaultLocale: "vi",
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "drive.google.com",
        pathname: "/uc",
      },
      {
        protocol: "https",
        hostname: "aladin-w22g4.s3.ap-southeast-1.amazonaws.com",
        pathname: "/next-s3-uploads",
      },
    ],
  },
});
