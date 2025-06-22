import "~/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";
import { env } from "~/env";

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
      <body>
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
