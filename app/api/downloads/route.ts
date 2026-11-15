import { NextResponse } from "next/server";
import { resolveAtlasDownloads } from "@/lib/atlasbot-releases";
export const dynamic = "force-dynamic";
export async function GET() {
  const result = await resolveAtlasDownloads();
  return NextResponse.json({ platforms: result.status }, { headers: { "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" } });
}
