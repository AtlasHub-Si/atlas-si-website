const fs=require("node:fs"),path=require("node:path"),assert=require("node:assert/strict");
const {chromium}=require("playwright-core");
const privateInput=fs.readFileSync(0,"utf8"),auth=privateInput?JSON.parse(privateInput):{};
const base=process.argv[2]??"http://127.0.0.1:3100",out=path.resolve(".qa",process.argv[3]??"local");
fs.mkdirSync(out,{recursive:true});
const report={base,started:new Date().toISOString(),viewports:[],routes:[],interactions:[],accessibility:[],consoleErrors:[],networkFailures:[]};
let browser;
async function main(){
 const executablePath=auth.browserPath??(fs.existsSync("C:/Program Files/Google/Chrome/Application/chrome.exe")?"C:/Program Files/Google/Chrome/Application/chrome.exe":"C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe");
 browser=await chromium.launch({executablePath,headless:true,args:["--disable-gpu"]});
 const context=await browser.newContext({viewport:{width:1440,height:1000},reducedMotion:"reduce",locale:"pt-PT"});
 const page=await context.newPage();page.setDefaultTimeout(12000);if(auth.accessUrl){if(new URL(auth.accessUrl).origin!==new URL(base).origin)throw Error("Preview origin mismatch");await page.goto(auth.accessUrl,{waitUntil:"networkidle",timeout:45000});}
 page.on("pageerror",e=>report.consoleErrors.push(e.message));
 page.on("requestfailed",r=>{if(!r.failure()?.errorText.includes("ERR_ABORTED"))report.networkFailures.push({path:new URL(r.url()).pathname,error:r.failure()?.errorText})});
 await page.addInitScript(()=>{window.__atlasMetrics={cls:0,lcp:0};try{new PerformanceObserver(list=>{for(const e of list.getEntries())if(!e.hadRecentInput)window.__atlasMetrics.cls+=e.value}).observe({type:"layout-shift",buffered:true});new PerformanceObserver(list=>{window.__atlasMetrics.lcp=list.getEntries().at(-1)?.startTime??0}).observe({type:"largest-contentful-paint",buffered:true})}catch{}});
 async function ready(url){
  const response=await page.goto(url,{waitUntil:"networkidle",timeout:45000});assert.equal(response.status(),200,url);
  await page.locator('[data-visual-version="2.0.0"]').waitFor();await page.evaluate(()=>Promise.race([document.fonts.ready,new Promise(r=>setTimeout(r,3000))]));
  return response;
 }
 async function capturePage(file){ const sharp=require("sharp"),size=await page.evaluate(()=>({height:document.documentElement.scrollHeight,width:innerWidth,viewport:innerHeight})),tiles=[];let previous=-1;for(let y=0;y<size.height;y+=size.viewport){await page.evaluate(y=>window.scrollTo(0,y),y);await page.waitForTimeout(160);const top=await page.evaluate(()=>scrollY);if(top===previous)break;previous=top;tiles.push({input:await page.screenshot({fullPage:false}),left:0,top});}await sharp({create:{width:size.width,height:size.height,channels:3,background:"#020c1c"}}).composite(tiles).png().toFile(file);await page.evaluate(()=>scrollTo(0,0));}
 async function loadLazy(){await page.evaluate(async()=>{for(let y=0;y<document.documentElement.scrollHeight;y+=650){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,65))}window.scrollTo(0,0);await Promise.race([Promise.all([...document.images].map(i=>i.decode().catch(()=>{}))),new Promise(r=>setTimeout(r,2000))]);await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));await new Promise(r=>setTimeout(r,150))});}
 for(const width of [1440,1086,1024,768,390]){
  console.log("Viewport",width);
  await page.setViewportSize({width,height:1000});await ready(base+"/pt");await loadLazy();
  const metrics=await page.evaluate(()=>({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,height:document.documentElement.scrollHeight,h1:document.querySelectorAll("h1").length,broken:[...document.images].filter(i=>!i.naturalWidth).map(i=>new URL(i.src).pathname),cls:window.__atlasMetrics.cls,lcp:window.__atlasMetrics.lcp,transferBytes:performance.getEntriesByType("resource").reduce((n,r)=>n+r.transferSize,0),fonts:document.fonts.status}));
  report.viewports.push(metrics);assert(metrics.scrollWidth<=width,"Horizontal overflow "+width);assert.equal(metrics.h1,1);assert.deepEqual(metrics.broken,[]);assert.equal(await page.locator(".a-mascot-card").count(),6);
  assert.equal(await page.locator('[data-motion-enabled="true"]').count(),0);
  const anchors=await page.locator('a[href^="#"]').evaluateAll(els=>els.map(a=>a.getAttribute("href")).filter(h=>h!=="#"));
  for(const anchor of anchors)assert(await page.locator(anchor).count(),"Missing anchor "+anchor);
  assert.equal(await page.locator('a[href*="nightly-labs"],a[href*="/actions/artifacts"],a[href*="OpenBot_"]').count(),0);
  assert.equal(await page.locator('#download button[data-download-state="coming-soon"]').count(),1);
  await capturePage(path.join(out,"desktop-"+width+".png"));
  if(width===1086)await page.locator(".a-hero").screenshot({path:path.join(out,"hero-1086.png")});
  if(width===390||width===1440){
   await page.addScriptTag({path:require.resolve("axe-core/axe.min.js")});
   const results=await page.evaluate(async()=>axe.run(document,{runOnly:{type:"tag",values:["wcag2a","wcag2aa","wcag21aa"]}}));
   report.accessibility.push({width,violations:results.violations.map(v=>({id:v.id,impact:v.impact,description:v.description,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))}))});
  }
 }
 for(const locale of ["pt","en","fr","es"]){
  console.log("Locale",locale);
  for(const width of [390,1440]){
   await page.setViewportSize({width,height:900});await ready(base+"/"+locale);await loadLazy();
   const info=await page.evaluate(()=>({scrollWidth:document.documentElement.scrollWidth,width:innerWidth,title:document.title,lang:document.documentElement.lang,canonical:document.querySelector('link[rel="canonical"]')?.href,hreflang:document.querySelectorAll('link[rel="alternate"][hreflang]').length}));
   assert(info.scrollWidth<=width,locale+" overflow");assert(info.title.includes("Atlas"));assert.equal(info.canonical,"https://www.atlas-si.com/"+locale);assert.equal(info.hreflang,5);
   report.interactions.push({check:"i18n",locale,width,...info});
  }
 }
 console.log("Interactions");await page.setViewportSize({width:390,height:844});await ready(base+"/pt");
 await page.getByRole("button",{name:"Abrir navegação",exact:true}).click();assert(await page.locator("#atlas-navigation").isVisible());await page.keyboard.press("Escape");assert(!(await page.locator("#atlas-navigation").isVisible()));report.interactions.push({check:"mobile menu and Escape focus",pass:true});
 await page.getByRole("button",{name:"Avançar",exact:true}).click();await page.getByRole("button",{name:"Avançar",exact:true}).click();await page.getByRole("button",{name:"Avançar",exact:true}).click();
 assert(await page.getByRole("button",{name:"Avançar",exact:true}).isDisabled());await page.getByRole("button",{name:"Aprovar simulação",exact:true}).click();assert(await page.locator(".a-message-agent").innerText().then(t=>t.includes("Flow")));await page.getByRole("button",{name:"Reiniciar",exact:true}).click();assert(await page.locator(".a-message-agent").innerText().then(t=>t.includes("Guide")));report.interactions.push({check:"workflow step / human gate / approve / reset",pass:true});
 await page.getByRole("button",{name:"Iniciar",exact:true}).click();await page.getByRole("button",{name:"Pausar",exact:true}).click();await page.waitForTimeout(2200);assert(await page.locator(".a-message-agent").innerText().then(t=>t.includes("Guide")));report.interactions.push({check:"play/pause",pass:true});
 await page.getByLabel("O seu nome",{exact:true}).fill("Teste QA");await page.getByLabel("O seu e-mail",{exact:true}).fill("qa@example.com");await page.getByLabel("Como podemos ajudar?",{exact:true}).fill("Validar a experiência Atlas-SI.");await page.getByRole("button",{name:"Preparar e-mail",exact:true}).click();
 const mail=await page.locator(".a-email-ready a").getAttribute("href");assert(mail.startsWith("mailto:sergiomonteiro@atlashub.si?"));assert(mail.includes("qa%40example.com"));assert(mail.includes("Teste%20QA"));report.interactions.push({check:"validated contact form / mail draft / no send",pass:true});
 const routes=["","/guides","/guides/atlasbot-101","/plugins","/news","/news/introducing-atlasbot","/app-preview","/join","/credits","/privacy","/v2-preview"];
 console.log("Route smoke");for(const locale of ["pt","en","fr","es"])for(const route of routes){const r=await context.request.get(base+"/"+locale+route);report.routes.push({path:"/"+locale+route,status:r.status()});assert.equal(r.status(),200,"Route "+locale+route);if(route==="/v2-preview")assert((await r.text()).includes('noindex'));}
 for(const platform of ["windows","macos","linux","plan9"]){const r=await context.request.get(base+"/download/"+platform,{maxRedirects:0});assert.equal(r.status(),platform==="plan9"?404:503);assert(!r.headers().location);assert(!(await r.text()).includes("nightly-labs"));report.routes.push({path:"/download/"+platform,status:r.status(),redirect:null});}
 const statuses=await context.request.get(base+"/api/downloads");const data=await statuses.json();assert(Object.values(data.platforms).every(p=>!p.available&&p.href===null));report.interactions.push({check:"production release unavailable safe state",pass:true});
 assert.equal((await context.request.get(base+"/pt/not-a-real-page")).status(),404);
 for(const route of ["/robots.txt","/sitemap.xml","/icon.png","/og.png"]){const r=await context.request.get(base+route);assert.equal(r.status(),200);report.routes.push({path:route,status:r.status()});}
 // A future approved API response changes the UI without a new landing implementation.
 await page.route("**/api/downloads",route=>route.fulfill({json:{platforms:{windows:{available:true,href:"/download/windows",version:"v1.2.3"},macos:{available:false,href:null},linux:{available:false,href:null}}}}));
 await ready(base+"/pt");await page.locator("#atlas-platform").selectOption("windows");assert.equal(await page.locator('#download a[href="/download/windows"]').count(),1);report.interactions.push({check:"future approved release activates local download link",pass:true});
 assert.deepEqual(report.consoleErrors,[]);assert.deepEqual(report.networkFailures,[]);
 const violations=report.accessibility.flatMap(x=>x.violations);report.result=violations.length?"ACCESSIBILITY_CHANGES_REQUIRED":"PASS";
 report.finished=new Date().toISOString();fs.writeFileSync(path.join(out,"report.json"),JSON.stringify(report,null,2));
 await browser.close();assert.equal(violations.length,0,"Accessibility violations: "+violations.map(v=>v.id).join(","));
 console.log(JSON.stringify({result:report.result,viewports:report.viewports,routes:report.routes.length,interactions:report.interactions.length,axeViolations:violations.length}));
}
main().catch(async error=>{report.result="FAIL";report.error=String(error.message).replace(/([?&])_vercel_share=[^\s]+/g,"$1[redacted]");fs.writeFileSync(path.join(out,"report.json"),JSON.stringify(report,null,2));console.error(report.error);if(browser)await browser.close();process.exitCode=1;});
