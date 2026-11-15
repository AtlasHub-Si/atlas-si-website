import type { MetadataRoute } from "next";
export default function robots():MetadataRoute.Robots{return{rules:{userAgent:"*",allow:"/",disallow:["/api/","/download/","/*/v2-preview"]},sitemap:"https://www.atlas-si.com/sitemap.xml",host:"https://www.atlas-si.com"}}
