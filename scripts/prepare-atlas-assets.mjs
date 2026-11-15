import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";
import sharp from "sharp";
const root = process.cwd(), kit=path.join(root,"_reference"), pack=path.join(root,"_assets/atlas-si-v2");
const sha = b => crypto.createHash("sha256").update(b).digest("hex");
const manifest=JSON.parse(await fs.readFile(path.join(kit,"manifest.json"),"utf8"));
for(const entry of manifest.files){
 const bytes=await fs.readFile(path.join(kit,entry.bundle_path));
 if(sha(bytes)!==entry.sha256)throw Error("Kit mismatch "+entry.id);
}
const logo=await fs.readFile(path.join(pack,"reference/atlas-A-approved.png"));
if(sha(logo)!=="fcfaa46d38ba22999ab352c86ac2609225cd9fceaba9fb303c91929c315100b5")throw Error("Logo mismatch");
const dir=path.join(root,"public/media/atlas-si/v2");await fs.mkdir(path.join(dir,"mascots"),{recursive:true});
const records=[];
for(const name of ["guide","creator","builder","analyst","flow","shield"]){
 const source=path.join(kit,"02_MASCOTS_MASTERS",name+".png");
 const sourceHash=sha(await fs.readFile(source));
 for(const width of [320,640,960]){
  const dest=path.join(dir,"mascots",name+"-"+width+".webp");
  if(width===320)await sharp(source).resize({width}).webp({quality:85,effort:5}).toFile(dest);
  else await fs.copyFile(path.join(kit,"03_WEB_OPTIMIZED",name+"-"+width+".webp"),dest);
  const data=await fs.readFile(dest),meta=await sharp(data).metadata();
  records.push({id:name+"-"+width,source_sha256:sourceHash,path:"/media/atlas-si/v2/mascots/"+path.basename(dest),sha256:sha(data),width:meta.width,height:meta.height,bytes:data.length,approval:"STATIC_IDENTITY_APPROVED_DERIVATIVE",motion:false});
 }
}
await sharp(logo).resize({width:320}).webp({quality:90}).toFile(path.join(dir,"mark.webp"));
await sharp(logo).resize({width:128,height:128,fit:"contain"}).png().toFile(path.join(root,"app/icon.png"));
await fs.unlink(path.join(root,"app/icon.svg")).catch(e=>{if(e.code!=="ENOENT")throw e});
for(const name of ["cosmos","earth"]){
 const src=path.join(pack,"web",name+"-1672.webp"),dst=path.join(dir,name+".webp");
 await fs.copyFile(src,dst);records.push({id:name,path:"/media/atlas-si/v2/"+name+".webp",sha256:sha(await fs.readFile(dst)),approval:name==="cosmos"?"CANDIDATE_IMPLEMENTATION_REVIEW":"CANDIDATE_MASKED_STATIC_FALLBACK",notes:name==="earth"?"Static horizon; CSS elliptical mask excludes loose pixels. No claim of physical rotation.":"Controlled opacity; no atmospheric/energy candidate PNG used."});
}
const reference=path.join(kit,"00_MAQUETE/atlas-si-website-reference.png");
await sharp(reference).extract({left:400,top:1010,width:345,height:165}).webp({quality:92}).toFile(path.join(dir,"harness-scene.webp"));
records.push({id:"harness-scene",path:"/media/atlas-si/v2/harness-scene.webp",source_sha256:manifest.files.find(x=>x.id==="landing").sha256,source_crop:{left:400,top:1010,width:345,height:165},sha256:sha(await fs.readFile(path.join(dir,"harness-scene.webp"))),approval:"DERIVED_APPROVED_MAQUETTE_ART_ONLY_NO_UI_TEXT"});
const a=await sharp(reference).removeAlpha().raw().toBuffer(),b=await sharp(path.join(pack,"reference/landing-attached-match.png")).removeAlpha().raw().toBuffer();
let sum=0,changed=0;for(let i=0;i<a.length;i++){sum+=Math.abs(a[i]-b[i]);if(a[i]!==b[i])changed++;}
const comparison={sameDimensions:a.length===b.length,meanChannelDifference:sum/a.length,changedChannelFraction:changed/a.length,source:"Visual Reference Kit is authoritative; older PR5 image retained for comparison only."};
await fs.mkdir(path.join(root,"docs/atlas-v2"),{recursive:true});
await fs.writeFile(path.join(root,"docs/atlas-v2/assets-manifest.json"),JSON.stringify({version:"2.0.0",reference_sha256:manifest.files[0].sha256,referenceComparison:comparison,logo_source_sha256:sha(logo),assets:records},null,2));
const bg=await sharp(path.join(dir,"cosmos.webp")).resize(1200,630,{fit:"cover"}).png().toBuffer();
const hero=await sharp(path.join(dir,"mascots/guide-640.webp")).resize({width:460}).png().toBuffer();
const mark=await sharp(logo).resize({width:74}).png().toBuffer();
const text=Buffer.from('<svg width="1200" height="630"><style>text{font-family:Arial,sans-serif}</style><text x="160" y="100" fill="#ffffff" font-size="36" font-weight="bold">Atlas-SI</text><text x="540" y="285" fill="#ffffff" font-size="78" font-weight="bold">Atlas<tspan fill="#00e7f5">Bot</tspan></text><text x="543" y="345" fill="#ffffff" font-size="30">O seu companheiro de IA</text><text x="543" y="404" fill="#b8d7ef" font-size="24">Agentes · Workflows · Pessoas</text><text x="543" y="510" fill="#00e7f5" font-size="22">ATLAS-SI.COM</text></svg>');
await sharp(bg).composite([{input:hero,left:40,top:150},{input:mark,left:60,top:45},{input:text}]).png().toFile(path.join(root,"public/og.png"));
console.log(JSON.stringify({assetChecks:"PASS",masterChecks:6,logoHash:sha(logo),referenceComparison:comparison,assets:records.length}));
