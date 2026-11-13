import { NextResponse } from "next/server";
/* Public Atlas installers are not released. Never redirect an Atlas-branded URL
   to upstream OpenBot binaries. Publish only verified, licensed and checksummed
   Atlas releases after review. */
export async function GET(_request: Request,context:{params:Promise<{platform:string}>}) {
 const {platform}=await context.params;
 if(!["windows","macos","linux"].includes(platform)) return NextResponse.json({error:"unknown_platform"},{status:404});
 return NextResponse.json({status:"not_released",message:"Atlas installer is not yet available. Visit https://www.atlas-si.com/pt for early access."},{status:503,headers:{"Cache-Control":"no-store"}});
}
