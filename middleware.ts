import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, locales } from "@/lib/i18n/config";
const COOKIE_NAME="ATLASBOT_LOCALE";
const secondary=new Set(["news","guides","plugins","join","app-preview"]);
function detectLocale(req:NextRequest):string{
 const cookie=req.cookies.get(COOKIE_NAME)?.value;
 if(cookie&&locales.includes(cookie as (typeof locales)[number]))return cookie;
 const header=req.headers.get("accept-language")??"";
 for(const part of header.split(",")){const lang=part.split(";")[0]?.trim().toLowerCase().split("-")[0];if(lang&&locales.includes(lang as (typeof locales)[number]))return lang}
 return defaultLocale;
}
export function middleware(req:NextRequest){
 const url=req.nextUrl.clone();
 const parts=url.pathname.split("/").filter(Boolean);
 const locale=locales.includes(parts[0] as (typeof locales)[number])?parts[0]:detectLocale(req);
 const rest=parts[0]===locale?parts.slice(1):parts;
 if(rest[0]&&secondary.has(rest[0])){url.pathname=`/${locale}`;url.search="";return NextResponse.redirect(url,307)}
 if(parts[0]===locale){const res=NextResponse.next();res.cookies.set(COOKIE_NAME,locale,{maxAge:31536000,sameSite:"lax"});return res}
 url.pathname=`/${locale}${url.pathname==="/"? "":url.pathname}`;
 return NextResponse.redirect(url);
}
export const config={matcher:["/((?!_next|download|api|.*\\..*).*)"]};
