"use client";
import Link from "next/link";
import { LocaleSwitcher } from "@/components/locale-switcher";
import { localePath, type Locale } from "@/lib/i18n/config";
import { atlasCopy } from "@/lib/i18n/atlas-v2";
import type { Dictionary } from "@/lib/i18n/dictionaries";
export function LandingHeader({locale,dict}:{locale:Locale;dict:Dictionary}){
 const c=atlasCopy[locale];
 return <div className="atlas-v2"><header className="a-header"><Link className="a-brand" href={localePath(locale,"/")} aria-label="Atlas-SI"><img className="a-mark" src="/media/atlas-si/v2/mark.webp" width="320" height="320" alt=""/><span>Atlas-<em>SI</em></span></Link><nav className="a-legacy-nav" aria-label={dict.nav.aria}><Link href={localePath(locale,"/news")}>{c.resources[2]}</Link><Link href={localePath(locale,"/guides")}>{c.resources[0]}</Link><Link href={localePath(locale,"/plugins")}>{c.resources[1]}</Link><Link href={localePath(locale,"/app-preview")}>{c.demo}</Link><LocaleSwitcher aria={dict.lang.aria}/></nav><Link className="a-button a-outline a-header-try" href={localePath(locale,"/#download")}>{c.soon}</Link></header></div>;
}
export function LandingFooter({locale}:{locale:Locale;dict:Dictionary}){
 const c=atlasCopy[locale];
 return <div className="atlas-v2"><footer className="a-footer"><Link className="a-brand" href={localePath(locale,"/")}><img className="a-mark" src="/media/atlas-si/v2/mark.webp" width="320" height="320" alt=""/>Atlas-<em>SI</em></Link><p>{c.footer}<small>© {new Date().getFullYear()} Atlas-SI</small></p><nav aria-label={c.nav[2]}><Link href={localePath(locale,"/guides")}>{c.resources[0]}</Link><Link href={localePath(locale,"/plugins")}>{c.resources[1]}</Link><Link href={localePath(locale,"/credits")}>{c.credits}</Link><Link href={localePath(locale,"/privacy")}>{c.privacy}</Link><a href="mailto:sergiomonteiro@atlashub.si">{c.nav[4]}</a></nav></footer></div>;
}
