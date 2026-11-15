import { NextResponse } from "next/server";
import { PLATFORMS, resolveAtlasDownloads, type Platform } from "@/lib/atlasbot-releases";
export const dynamic = "force-dynamic";
export async function GET(request: Request, context: { params: Promise<{ platform: string }> }) {
  const { platform } = await context.params;
  const supported = PLATFORMS.includes(platform as Platform);
  if (supported) {
    const result = await resolveAtlasDownloads();
    const target = result.targets[platform as Platform];
    if (target) return NextResponse.redirect(target, { status: 302, headers: { "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" } });
  }
  const en = (request.headers.get("accept-language") ?? "").startsWith("en");
  return new NextResponse('<!doctype html><html lang="' + (en ? 'en' : 'pt') + '"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>AtlasBot — ' + (en ? 'Coming soon' : 'Em breve') + '</title><style>body{background:#031024;color:#eefaff;font:18px system-ui;max-width:620px;margin:15vh auto;padding:24px}a{color:#36e5f5}h1{font-size:42px}</style><h1>AtlasBot</h1><p>' + (en ? 'The official installer will be available soon.' : 'O instalador oficial estará disponível brevemente.') + '</p><a href="/">' + (en ? 'Return to Atlas-SI' : 'Voltar ao Atlas-SI') + '</a></html>', {
    status: supported ? 503 : 404, headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store", "X-Robots-Tag": "noindex", "X-Content-Type-Options": "nosniff", "Content-Security-Policy": "default-src 'none'; style-src 'unsafe-inline'; base-uri 'none'; frame-ancestors 'none'" },
  });
}
