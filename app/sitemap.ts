import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n/config";
export default function sitemap():MetadataRoute.Sitemap{return locales.flatMap(locale=>["","/guides","/plugins","/news","/credits","/privacy"].map(path=>({url:"https://www.atlas-si.com/"+locale+path,changeFrequency:"weekly" as const,priority:path?0.6:1})));}
