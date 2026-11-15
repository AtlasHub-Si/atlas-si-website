import type { Metadata } from "next";
import { LandingPage } from "@/components/landing/landing-page";
import { isLocale, localePath, alternateLanguages } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { atlasCopy } from "@/lib/i18n/atlas-v2";
import { notFound } from "next/navigation";
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
 const {locale}=await params;if(!isLocale(locale))return{};const c=atlasCopy[locale];
 return {title:{absolute:c.seoTitle},description:c.seoDescription,alternates:{canonical:localePath(locale,"/"),languages:alternateLanguages(locale,"/")},openGraph:{type:"website",siteName:"Atlas-SI",title:c.seoTitle,description:c.seoDescription,url:localePath(locale,"/"),images:[{url:"/og.png",width:1200,height:630,alt:"Atlas-SI — AtlasBot"}]}};
}
export default async function LandingRoute({ params }: { params: Promise<{ locale: string }> }) {
 const {locale}=await params;if(!isLocale(locale))notFound();
 return <><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({"@context":"https://schema.org","@type":"WebSite",name:"Atlas-SI",url:"https://www.atlas-si.com",inLanguage:["pt-PT","en","fr","es"]})}}/><LandingPage locale={locale} dict={getDictionary(locale)}/></>;
}
