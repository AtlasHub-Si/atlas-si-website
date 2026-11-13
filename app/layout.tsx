import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { OPENBOT_SITE_DESCRIPTION, OPENBOT_SITE_TITLE } from "@/lib/site";
import "./globals.css";

/* Self-hosted Inter Variable, matching the original @fontsource import. */
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

/* Production metadata base: set NEXT_PUBLIC_SITE_URL (or VERCEL_URL, set
   automatically by Vercel) to the deployed origin; falls back to localhost. */
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: OPENBOT_SITE_TITLE,
  description: OPENBOT_SITE_DESCRIPTION,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
