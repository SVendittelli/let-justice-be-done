import "~/styles/globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { env } from "~/env";
import { TRPCReactProvider } from "~/trpc/react";
import { type Metadata } from "next";
import { Geist } from "next/font/google";

export const metadata: Metadata = {
  title: "Let Justice Be Done",
  description: "Let Justice Be Done",
  icons: [
    {
      rel: "icon",
      url: env.NODE_ENV === "production" ? "/favicon.ico" : "/favicon-dev.ico",
      sizes: "32x32",
    },
    {
      rel: "icon",
      url: env.NODE_ENV === "production" ? "/icon.svg" : "/icon-dev.svg",
      type: "image/svg+xml",
    },
    { rel: "apple-touch-icon", url: "/apple-touch-icon.png" },
  ],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable}`}>
      <body className="bg-gold prose-a:no-underline">
        <div className="min-h-dvh rounded-xl bg-gradient-to-b from-red-medium to-red-dark inset-ring-6 inset-ring-gold sm:inset-ring-8">
          <TRPCReactProvider>{children}</TRPCReactProvider>
          <Analytics />
          <SpeedInsights />
        </div>
      </body>
    </html>
  );
}
