"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { LocaleSwitcher } from "@/components/locale-switcher";
import { AtlasMascot, characters, type Character } from "./mascot";
import { AtlasDownload } from "./downloads";
import { atlasCopy, type AtlasCopy } from "@/lib/i18n/atlas-v2";
import { localePath, type Locale } from "@/lib/i18n/config";

const names = { guide: "Guide", creator: "Creator", builder: "Builder", analyst: "Analyst", flow: "Flow", shield: "Shield" };
const roleIcons = ["headset", "code", "tool", "chart", "flow", "shield"];
const agents: Character[] = ["guide", "analyst", "creator", "builder", "flow"];
const M = "/media/atlas-si/v2/";

export function AtlasIcon({ name, className = "" }: { name: string; className?: string }) {
  const paths: Record<string, React.ReactNode> = {
    bot: <><rect x="4" y="7" width="16" height="13" rx="5"/><path d="M12 3v4M2 12v4m20-4v4M8 13h.1M16 13h.1M9 17h6"/></>,
    layers: <><path d="m12 2 10 6-10 6L2 8 12 2Zm-10 11 10 6 10-6M2 18l10 6 10-6"/></>,
    code: <path d="m7 7-5 5 5 5m10-10 5 5-5 5m-4-13-2 20"/>,
    chart: <><path d="M3 20V10h4v10m3 0V6h4v14m3 0V2h4v18"/></>,
    shield: <><path d="m12 2 9 4v6c0 5-9 10-9 10S3 17 3 12V6l9-4Z"/><path d="m8 12 3 3 5-6"/></>,
    flow: <><path d="M12 12c-6-9-12-5-10 0s8 5 10 0 8-5 10 0-6 9-10 0Z"/></>,
    headset: <><path d="M3 13v-1a9 9 0 0 1 18 0v1M5 12H2v7h4v-7Zm14 0h3v7h-4v-7Zm0 7c0 3-4 3-7 3"/></>,
    tool: <><path d="m14 5 4 4 4-4a7 7 0 0 1-9 9L5 22l-3-3 8-8a7 7 0 0 1 4-9v3Z"/></>,
    users: <><circle cx="9" cy="7" r="4"/><path d="M2 21v-4a7 7 0 0 1 14 0v4M17 4a4 4 0 0 1 0 8m2 3c2 1 3 3 3 6"/></>,
    play: <path d="m6 3 15 9-15 9V3Z"/>,
    check: <path d="m4 12 5 5L21 5"/>,
    arrow: <path d="M3 12h18m-6-6 6 6-6 6"/>,
    mail: <><rect x="2" y="5" width="20" height="14" rx="3"/><path d="m3 6 9 7 9-7"/></>,
    link: <><path d="m10 13 4-4M8 16l-2 2a4 4 0 0 1-6-6l5-5a4 4 0 0 1 6 0m2 1 3-3a4 4 0 0 1 6 6l-5 5a4 4 0 0 1-6 0"/></>,
  };
  return <svg className={"a-icon " + className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name] ?? paths.bot}</svg>;
}

function AtlasMark({ large = false }: { large?: boolean }) {
  return <img src={M + "mark.webp"} width="320" height="320" className={large ? "a-mark a-mark-large" : "a-mark"} alt="" aria-hidden="true"/>;
}
export function AtlasCosmos({ className = "" }: { className?: string }) {
  return <div className={"a-environment " + className} aria-hidden="true">
    <img className="a-cosmos" src={M + "cosmos.webp"} width="1672" height="941" alt="" decoding="async"/>
    <img className="a-earth" src={M + "earth.webp"} width="1672" height="941" alt="" decoding="async"/>
    <div className="a-atmosphere"/><div className="a-horizon-line"/>
  </div>;
}
function HeroCharacters() {
  return <div className="a-hero-characters">
    <AtlasMascot character="guide" className="a-lead-guide" decorative priority/>
    {(["builder","creator","analyst","flow","shield"] as Character[]).map((character,i)=><AtlasMascot key={character} character={character} decorative className={"a-satellite a-satellite-"+i}/>)}
    <span className="a-orbit-icon a-orbit-code"><AtlasIcon name="code"/></span>
    <span className="a-orbit-icon a-orbit-chart"><AtlasIcon name="chart"/></span>
    <span className="a-orbit-icon a-orbit-network"><AtlasIcon name="users"/></span>
  </div>;
}
export function WorkspaceDashboardDemo({ c, step }: { c: AtlasCopy; step: number }) {
  return <div className="a-workspace">
    <div className="a-workspace-title"><span><AtlasMark/> Atlas Workspace</span><small className="a-demo-badge">{c.demoLabel}</small></div>
    <div className="a-workspace-hello"><AtlasIcon name="bot"/><div><strong>{c.workspaceTitle}</strong><small>AtlasBot · Guide + Analyst + Creator</small></div></div>
    <div className="a-workspace-grid">
      <div className="a-workspace-progress"><h3>{c.workflowTitle}</h3>{c.workflowNames.map((label,i)=><div key={label}><span>{label}</span><div className="a-progress-track"><i style={{width:((step+1)*15+i*8)+"%"}}/></div></div>)}</div>
      <div className="a-chart"><h3>{c.progress}</h3><svg viewBox="0 0 200 120" role="img" aria-label={c.progress}><defs><linearGradient id="atlas-chart" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#00e2f1" stopOpacity=".45"/><stop offset="1" stopColor="#00e2f1" stopOpacity="0"/></linearGradient></defs><path d="M0 108Q20 58 40 76T80 58T120 43T160 27T200 5V120H0Z" fill="url(#atlas-chart)" stroke="none"/><path d="M0 108Q20 58 40 76T80 58T120 43T160 27T200 5" stroke="#39f4e7" strokeWidth="3" fill="none"/><path d="M0 30H200M0 60H200M0 90H200" stroke="#33566c" strokeWidth=".5"/></svg></div>
    </div>
    <div className="a-workspace-stats">{[String(step+1)+"/5","6",c.human,c.ready].map((value,i)=><div key={i}><AtlasIcon name={["layers","users","shield","check"][i]}/><strong>{value}</strong><small>{c.dashboardLabels[i]}</small></div>)}</div>
  </div>;
}
export function MascotFamily({ c }: { c: AtlasCopy }) {
  return <section id="familia" className="a-panel a-family" aria-labelledby="family-title">
    <div className="a-family-intro"><span className="a-eyebrow"><AtlasIcon name="bot"/>{c.family}</span><h2 id="family-title">Atlas<em>Bot</em></h2><p>{c.familyIntro}</p></div>
    {characters.map((character,i)=><article className={"a-mascot-card a-role-"+character} key={character}><AtlasMascot character={character}/><h3><AtlasIcon name={roleIcons[i]}/>{names[character]}</h3><p>{c.roles[i]}</p></article>)}
  </section>;
}
export function AgentConversation({ c, step }: { c: AtlasCopy; step: number }) {
  return <div className="a-conversation-grid">
    <div className="a-conversations"><h3>{c.conversations}</h3>{agents.slice(0,4).map((character,i)=><div key={character} className={step===i?"is-current":""}><AtlasMascot character={character} decorative/><span><strong>{names[character]}</strong><small>{c.roles[characters.indexOf(character)]}</small></span><i aria-hidden="true"/></div>)}</div>
    <div className="a-thread"><h3>{c.thread}</h3><p className="a-message a-message-user">{c.request}</p><div className="a-message a-message-agent" aria-live="polite" aria-atomic="true"><strong>{names[agents[step]]}</strong><p>{c.messages[step]}</p></div></div>
    <div className="a-activity"><h3>{c.activity}</h3><div className="a-activity-agents">{agents.slice(1,4).map(character=><AtlasMascot key={character} character={character} decorative/>)}</div><div className="a-activity-progress"><span>{c.progress}</span><strong>{step+1}<small>/5</small></strong><div className="a-progress-track"><i style={{width:((step+1)*20)+"%"}}/></div></div><p>{c.demoLabel}</p></div>
  </div>;
}
export function WorkflowDemo({ c, step, running, approved, onPlay, onNext, onReset, onApprove }: { c: AtlasCopy; step:number;running:boolean;approved:boolean;onPlay:()=>void;onNext:()=>void;onReset:()=>void;onApprove:()=>void }) {
  return <section className="a-workflows" id="workflows" aria-labelledby="workflows-title">
    <div className="a-panel a-workflow-controls"><h2 id="workflows-title"><AtlasIcon name="play"/>{c.workflowTitle}</h2><p>{c.workflowIntro}</p>
      <ol className="a-steps">{c.steps.map((label,i)=><li key={label} className={step>i?"is-complete":step===i?"is-current":""}><AtlasIcon name={step>i?"check":["layers","chart","code","shield","play"][i]}/><span>{label}</span></li>)}</ol>
      <div className="a-control-buttons"><button type="button" onClick={onPlay} disabled={step===4 || (step===3&&!approved)} aria-pressed={running}>{running?c.pause:c.play}</button><button type="button" onClick={onNext} disabled={step===4 || (step===3&&!approved)}>{c.next}</button><button type="button" onClick={onReset}>{c.restart}</button></div>
      {step===3&&!approved&&<div className="a-approval" role="status"><p>{c.approvalNote}</p><button type="button" className="a-button a-primary" onClick={onApprove}>{c.approve}</button></div>}
    </div>
    <div className="a-panel a-collaboration"><div className="a-section-heading"><h2><AtlasIcon name="users"/>{c.collabTitle}</h2><small className="a-demo-badge">{c.demoLabel}</small></div><AgentConversation c={c} step={step}/><p className="a-demo-note">{c.simulationNote}</p></div>
  </section>;
}
export function SolutionsGrid({ c, locale }: { c: AtlasCopy; locale: Locale }) {
  const destinations=["#familia","#workflows",localePath(locale,"/guides"),localePath(locale,"/plugins")];
  return <section id="solucoes" className="a-solutions" aria-labelledby="solutions-title"><div className="a-solutions-title"><AtlasIcon name="layers"/><h2 id="solutions-title">{c.solutionsTitle}</h2><p>{c.solutionsIntro}</p></div>
    {c.solutionNames.map((label,i)=><Link href={destinations[i]} key={label} className="a-panel a-solution"><h3><AtlasIcon name={["bot","layers","play","chart"][i]}/>{label}</h3><p>{c.solutionDescriptions[i]}</p><span className="a-round-arrow"><AtlasIcon name="arrow"/></span>{i!==1&&<AtlasMascot character={["guide","guide","creator","analyst"][i] as Character} decorative/>}{i===1&&<div className="a-node-diagram" aria-hidden="true"><i/><i/><i/></div>}</Link>)}
  </section>;
}
export function Integrations({ c }: { c: AtlasCopy }) {
  return <section className="a-panel a-integrations" aria-labelledby="integrations-title"><div><h2 id="integrations-title"><AtlasIcon name="link"/>{c.integrationTitle}</h2><p>{c.integrationIntro}</p></div><ul aria-label={c.integrationTitle}>{["Slack","Teams","Drive","Notion","GitHub","API"].map((name,i)=><li key={name} className={"a-integration-"+i}>{name}</li>)}</ul><p className="a-integration-note">{c.integrationNote}</p></section>;
}
export function AtlasHarnessSection({ c }: { c: AtlasCopy }) {
  return <section id="harness" className="a-panel a-harness" aria-labelledby="harness-title"><div className="a-harness-copy"><h2 id="harness-title"><AtlasMark/>Atlas <em>Harness</em></h2><h3>{c.harnessTagline}</h3><p>{c.harnessIntro}</p><a className="a-button a-outline" href="#contact">{c.harnessCTA}<AtlasIcon name="arrow"/></a></div><img className="a-harness-art" src={M+"harness-scene.webp"} width="345" height="165" loading="lazy" alt="" aria-hidden="true"/><ul>{c.harnessFeatures.map(feature=><li key={feature}><AtlasIcon name="check"/>{feature}</li>)}</ul></section>;
}
export function ProofSection({ c }: { c: AtlasCopy }) {
  return <section className="a-proof" aria-labelledby="proof-title"><h2 id="proof-title">{c.proofTitle}</h2><div>{c.proofItems.map((text,i)=><p className="a-panel" key={text}><AtlasIcon name={["users","shield","layers"][i]}/>{text}</p>)}</div></section>;
}
export function FinalCTA({ c }: { c: AtlasCopy }) {
  return <section className="a-final-cta" aria-labelledby="final-title"><AtlasCosmos/><AtlasMascot character="guide" decorative sizes="(max-width: 700px) 75vw, 32vw" className="a-final-guide"/><div><h2 id="final-title">{c.ctaTitle}</h2><p>{c.ctaIntro}</p><div className="a-actions"><a className="a-button a-primary" href="#workflows"><AtlasIcon name="bot"/>{c.explore}<AtlasIcon name="arrow"/></a><a className="a-button a-outline" href="#contact"><AtlasIcon name="mail"/>{c.contactCTA}</a></div></div></section>;
}
function ContactForm({ c }: { c: AtlasCopy }) {
  const [draft,setDraft]=useState("");
  return <section id="contact" className="a-panel a-contact" aria-labelledby="contact-title"><div><span className="a-eyebrow">ATLAS HARNESS</span><h2 id="contact-title">{c.contactTitle}</h2><p>{c.contactIntro}</p><a href="mailto:sergiomonteiro@atlashub.si">sergiomonteiro@atlashub.si</a></div><form onSubmit={e=>{e.preventDefault();const data=new FormData(e.currentTarget);const body=String(data.get("name"))+" <"+String(data.get("email"))+">\n\n"+String(data.get("message"));setDraft("mailto:sergiomonteiro@atlashub.si?"+new URLSearchParams({subject:"Atlas-SI · Atlas Harness",body}).toString().replaceAll("+","%20"));}}>
    <div className="a-form-row"><label>{c.name}<input name="name" required maxLength={120} autoComplete="name"/></label><label>{c.email}<input name="email" type="email" required maxLength={200} autoComplete="email"/></label></div><label>{c.message}<textarea name="message" required maxLength={3000} rows={3}/></label><div className="a-form-submit"><button type="submit" className="a-button a-primary">{c.send}<AtlasIcon name="arrow"/></button><p>{c.emailNote}</p></div>
    {draft&&<div className="a-email-ready" role="status"><p>{c.emailReady}</p><a className="a-button a-outline" href={draft}><AtlasIcon name="mail"/>{c.contactCTA}</a></div>}
  </form></section>;
}
export function AtlasLanding({ locale }: { locale: Locale }) {
  const c=atlasCopy[locale], [step,setStep]=useState(0), [running,setRunning]=useState(false),[approved,setApproved]=useState(false),[menu,setMenu]=useState(false);
  const menuButton=useRef<HTMLButtonElement>(null);
  useEffect(()=>{if(!running||step>=4||(step===3&&!approved)){setRunning(false);return;}const timer=window.setTimeout(()=>setStep(s=>Math.min(4,s+1)),2000);return()=>window.clearTimeout(timer);},[running,step,approved]);
  useEffect(()=>{const pause=()=>{if(document.hidden)setRunning(false);};document.addEventListener("visibilitychange",pause);return()=>document.removeEventListener("visibilitychange",pause);},[]);
  useEffect(()=>{const close=(e:KeyboardEvent)=>{if(e.key==="Escape"&&menu){setMenu(false);menuButton.current?.focus();}};document.addEventListener("keydown",close);return()=>document.removeEventListener("keydown",close);},[menu]);
  const reset=()=>{setRunning(false);setStep(0);setApproved(false);};
  return <div className="atlas-v2" data-visual-version="2.0.0">
    <a className="a-skip" href="#main">{c.skip}</a>
    <header className="a-header"><Link href={localePath(locale,"/")} className="a-brand" aria-label="Atlas-SI"><AtlasMark/><span>Atlas-<em>SI</em></span></Link>
      <button ref={menuButton} className="a-menu-toggle" type="button" aria-expanded={menu} aria-controls="atlas-navigation" aria-label={menu?c.close:c.menu} onClick={()=>setMenu(v=>!v)}><span/><span/><span/></button>
      <nav id="atlas-navigation" className={menu?"is-open":""} aria-label={c.menu} onClick={e=>{if((e.target as HTMLElement).closest("a"))setMenu(false);}}>
        <a href="#familia">{c.nav[0]}</a><a href="#solucoes">{c.nav[1]}</a><details><summary>{c.nav[2]}</summary><div>{["guides","plugins","news"].map((p,i)=><Link key={p} href={localePath(locale,"/"+p)}>{c.resources[i]}</Link>)}</div></details><a href="#harness">{c.nav[3]}</a><a href="#contact">{c.nav[4]}</a><LocaleSwitcher aria={locale==="pt"?"Idioma":locale==="fr"?"Langue":locale==="es"?"Idioma":"Language"}/>
      </nav><a className="a-button a-primary a-header-try" href="#workflows">{c.try}<AtlasIcon name="arrow"/></a>
    </header>
    <main id="main">
      <section className="a-hero" aria-labelledby="atlas-title"><AtlasCosmos/><div className="a-hero-grid"><HeroCharacters/><div className="a-hero-copy"><p className="a-eyebrow">{c.eyebrow}</p><h1 id="atlas-title">ATLAS<em>BOT</em></h1><h2>{c.tagline}</h2><p>{c.intro}</p><div className="a-actions"><a className="a-button a-primary" href="#workflows"><AtlasIcon name="bot"/>{c.explore}<AtlasIcon name="arrow"/></a><a className="a-button a-outline" href="#familia"><AtlasIcon name="layers"/>{c.platform}</a></div></div><WorkspaceDashboardDemo c={c} step={step}/></div></section>
      <div className="a-bridge"><a href="#familia"><AtlasIcon name="bot"/><span>AtlasBot<small>{c.personal}</small></span></a><AtlasMark large/><a href="#harness"><AtlasIcon name="layers"/><span>Atlas <em>Harness</em><small>{c.architecture}</small></span></a></div>
      <div className="a-content"><MascotFamily c={c}/><WorkflowDemo c={c} step={step} running={running} approved={approved} onPlay={()=>setRunning(v=>!v)} onNext={()=>{setRunning(false);if(step!==3||approved)setStep(s=>Math.min(4,s+1));}} onReset={reset} onApprove={()=>{setApproved(true);setStep(4);setRunning(false);}}/>
        <SolutionsGrid c={c} locale={locale}/><Integrations c={c}/><AtlasHarnessSection c={c}/><ProofSection c={c}/>
      </div>
      <FinalCTA c={c}/>
      <div className="a-content a-bottom"><section id="download" className="a-panel a-download" aria-labelledby="download-title"><div><h2 id="download-title">{c.downloadTitle}</h2><p>{c.downloadIntro}</p></div><AtlasDownload soon={c.soon} download={c.download} choose={c.choose}/></section><ContactForm c={c}/></div>
    </main>
    <footer className="a-footer"><Link href={localePath(locale,"/")} className="a-brand"><AtlasMark/><span>Atlas-<em>SI</em></span></Link><p>{c.footer}<small>© {new Date().getFullYear()} Atlas-SI. {c.rights}</small></p><nav aria-label={c.nav[2]}><Link href={localePath(locale,"/guides")}>{c.resources[0]}</Link><Link href={localePath(locale,"/news")}>{c.resources[2]}</Link><Link href={localePath(locale,"/credits")}>{c.credits}</Link><Link href={localePath(locale,"/terms")}>{locale==="pt"?"Termos":locale==="fr"?"Conditions":locale==="es"?"Términos":"Terms"}</Link><Link href={localePath(locale,"/privacy")}>{c.privacy}</Link></nav></footer>
  </div>;
}
