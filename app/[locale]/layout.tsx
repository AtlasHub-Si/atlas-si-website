import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { isLocale, LOCALE_HTML_LANG, locales } from "@/lib/i18n/config";
import "../globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.atlas-si.com";
export const dynamicParams = false;
export function generateStaticParams() { return locales.map(locale => ({ locale })); }
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const title = "Atlas Harness | Atlas SI — AI-Native Enterprise Architecture";
  const description = "Atlas Harness: architecture for autonomous agents, AI-native workforce, governed memory and operational knowledge. V0.1 — early access.";
  return {
    metadataBase: new URL(siteUrl), title, description,
    alternates: { canonical: `/${locale}`, languages: { pt:"/pt",en:"/en",fr:"/fr",es:"/es","x-default":"/pt" } },
    openGraph: { type:"website", siteName:"Atlas SI", title, description, url:`/${locale}`, locale:LOCALE_HTML_LANG[locale] },
    twitter: { card:"summary", title, description },
    robots: { index:true, follow:true }
  };
}
export default async function LocaleLayout({children,params}:{children:React.ReactNode;params:Promise<{locale:string}>}) {
  const {locale}=await params;
  return <html lang={LOCALE_HTML_LANG[isLocale(locale)?locale:"pt"]} className={inter.variable}><body>{children}</body></html>;
}
