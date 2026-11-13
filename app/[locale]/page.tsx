import { isLocale } from "@/lib/i18n/config";
import { notFound } from "next/navigation";
import "../../styles/atlas-launch.css";

const content = {
  pt: {
    eyebrow: "ATLAS SI  /  ACESSO ANTECIPADO  /  2026",
    headline1: "A sua empresa não precisa de mais ferramentas de IA.",
    headline2: "Precisa de uma arquitetura para o futuro.",
    intro: "Atlas Harness é a arquitetura que liga agentes autónomos, equipas digitais, memória governada e conhecimento operacional numa empresa AI-Native.",
    cta: "Pedir acesso antecipado",
    cta2: "Explorar a arquitetura",
    nav1: "A arquitetura",
    nav2: "Componentes",
    status: "V0.1 · Pré-lançamento",
    stackTitle: "Uma infraestrutura. Vários agentes. Uma organização.",
    stackCopy: "Componentes independentes, governados por contratos e políticas. Integração progressiva — não uma promessa de produto já concluído.",
    cards: [
      ["ATLAS HARNESS", "Governação, autorização e coordenação de tarefas na empresa aumentada."],
      ["ATLASBOT", "Interface Desktop e execução remota multiagente em avaliação técnica."],
      ["ATLAS-AGENT", "Runtime Hermes e integração de agentes por Agent Client Protocol (ACP)."],
      ["MEMORY FABRIC", "Memória partilhada e recuperação contextual, com integração GBrain."],
      ["OPERATIONAL KNOWLEDGE", "Playbooks versionados em Markdown, compatíveis com Obsidian."],
      ["ATLAS WORKFORCE", "Papéis, identidades, skills e equipas digitais organizadas por função."]
    ],
    roadmapTitle: "O que já estamos a preparar",
    roadmap: ["Laboratório privado Windows + VPS", "Integração Hermes ACP e memória", "Instaladores Atlas sujeitos a validação", "Edições open source e empresariais em planeamento"],
    downloadTitle: "Instalador AtlasBot",
    downloadText: "Ainda não disponibilizamos um instalador Atlas validado para distribuição pública. Deixa-nos o teu contacto e acompanha a primeira versão.",
    downloadStatus: "Distribuição em preparação",
    transparency: "Protótipo e arquitetura em evolução. Componentes derivados de projetos de terceiros mantêm as respetivas licenças e atribuições; a distribuição comercial requer validação específica.",
    footer: "Intelligence for the Augmented Enterprise",
    contact: "Contactar",
  },
  en: {
    eyebrow: "ATLAS SI  /  EARLY ACCESS  /  2026",
    headline1: "Your business doesn't need another AI tool.",
    headline2: "It needs an architecture for the future.",
    intro: "Atlas Harness connects autonomous agents, digital teams, governed memory and operational knowledge into an AI-native enterprise.",
    cta: "Request early access",
    cta2: "Explore the architecture",
    nav1: "Architecture",
    nav2: "Components",
    status: "V0.1 · Preview",
    stackTitle: "One infrastructure. Many agents. One organization.",
    stackCopy: "Independent components governed by contracts and policies. Progressive integration—not a claim of a finished product.",
    cards: [
      ["ATLAS HARNESS", "Enterprise task governance, authorization and coordination."],
      ["ATLASBOT", "Desktop interface and remote multiagent execution under technical evaluation."],
      ["ATLAS-AGENT", "Hermes runtime and agents through the Agent Client Protocol (ACP)."],
      ["MEMORY FABRIC", "Shared memory and contextual retrieval with GBrain integration."],
      ["OPERATIONAL KNOWLEDGE", "Versioned Markdown playbooks compatible with Obsidian."],
      ["ATLAS WORKFORCE", "Roles, identities, skills and digital teams organized by function."]
    ],
    roadmapTitle: "What we're building",
    roadmap: ["Private Windows + VPS lab", "Hermes ACP and memory integration", "Atlas installers pending validation", "Open-source and enterprise editions planned"],
    downloadTitle: "AtlasBot installer",
    downloadText: "A validated Atlas installer is not yet available for public distribution. Get in touch to follow the first release.",
    downloadStatus: "Distribution in preparation",
    transparency: "Architecture and prototype in development. Third-party components retain their original licenses and attributions; commercial distribution requires a separate review.",
    footer: "Intelligence for the Augmented Enterprise",
    contact: "Contact us",
  },
  fr: {
    eyebrow: "ATLAS SI  /  ACCÈS ANTICIPÉ  /  2026",
    headline1: "Votre entreprise n'a pas besoin d'un outil d'IA de plus.",
    headline2: "Elle a besoin d'une architecture pour l'avenir.",
    intro: "Atlas Harness relie agents autonomes, équipes numériques, mémoire gouvernée et connaissances opérationnelles au sein d'une entreprise AI-Native.",
    cta: "Demander un accès anticipé",
    cta2: "Explorer l'architecture",
    nav1: "Architecture",
    nav2: "Composants",
    status: "V0.1 · Pré-lancement",
    stackTitle: "Une infrastructure. Plusieurs agents. Une organisation.",
    stackCopy: "Des composants indépendants, encadrés par des contrats et politiques. Intégration progressive, pas un produit déjà achevé.",
    cards: [
      ["ATLAS HARNESS", "Gouvernance, autorisations et coordination des tâches."],
      ["ATLASBOT", "Interface Desktop et exécution multiagents à distance en évaluation."],
      ["ATLAS-AGENT", "Runtime Hermes et agents via Agent Client Protocol (ACP)."],
      ["MEMORY FABRIC", "Mémoire partagée et recherche contextuelle avec GBrain."],
      ["OPERATIONAL KNOWLEDGE", "Playbooks Markdown versionnés compatibles avec Obsidian."],
      ["ATLAS WORKFORCE", "Rôles, identités, compétences et équipes numériques."]
    ],
    roadmapTitle: "En préparation",
    roadmap: ["Laboratoire privé Windows + VPS", "Intégration Hermes ACP et mémoire", "Installateurs Atlas en cours de validation", "Éditions open source et entreprise envisagées"],
    downloadTitle: "Installateur AtlasBot",
    downloadText: "Aucun installateur Atlas validé n'est encore proposé au public. Contactez-nous pour suivre la première version.",
    downloadStatus: "Distribution en préparation",
    transparency: "Prototype en cours de développement. Les composants tiers conservent leurs licences et attributions ; la diffusion commerciale fait l'objet d'une analyse distincte.",
    footer: "Intelligence for the Augmented Enterprise",
    contact: "Contact",
  },
  es: {
    eyebrow: "ATLAS SI  /  ACCESO ANTICIPADO  /  2026",
    headline1: "Tu empresa no necesita otra herramienta de IA.",
    headline2: "Necesita una arquitectura para el futuro.",
    intro: "Atlas Harness conecta agentes autónomos, equipos digitales, memoria gobernada y conocimiento operativo en una empresa AI-Native.",
    cta: "Solicitar acceso anticipado",
    cta2: "Explorar la arquitectura",
    nav1: "Arquitectura",
    nav2: "Componentes",
    status: "V0.1 · Prelanzamiento",
    stackTitle: "Una infraestructura. Muchos agentes. Una organización.",
    stackCopy: "Componentes independientes gobernados por contratos y políticas. Integración progresiva; no es un producto terminado.",
    cards: [
      ["ATLAS HARNESS", "Gobernanza, autorización y coordinación de tareas empresariales."],
      ["ATLASBOT", "Interfaz Desktop y ejecución multiagente remota en evaluación."],
      ["ATLAS-AGENT", "Runtime Hermes y agentes mediante Agent Client Protocol (ACP)."],
      ["MEMORY FABRIC", "Memoria compartida y recuperación contextual con GBrain."],
      ["OPERATIONAL KNOWLEDGE", "Playbooks Markdown versionados compatibles con Obsidian."],
      ["ATLAS WORKFORCE", "Roles, identidades, habilidades y equipos digitales."]
    ],
    roadmapTitle: "En preparación",
    roadmap: ["Laboratorio privado Windows + VPS", "Integración Hermes ACP y memoria", "Instaladores Atlas pendientes de validación", "Ediciones open source y empresariales previstas"],
    downloadTitle: "Instalador AtlasBot",
    downloadText: "Todavía no ofrecemos un instalador Atlas validado para distribución pública. Contáctanos para conocer la primera versión.",
    downloadStatus: "Distribución en preparación",
    transparency: "Prototipo y arquitectura en desarrollo. Los componentes de terceros conservan sus licencias y atribuciones; la distribución comercial requiere validación específica.",
    footer: "Intelligence for the Augmented Enterprise",
    contact: "Contacto",
  },
} as const;

const languages = ["pt", "en", "fr", "es"] as const;
const contactUrl = "https://wa.me/5562991903462?text=Quero%20acompanhar%20o%20Atlas%20Harness%20e%20solicitar%20acesso%20antecipado.";
const harnessUrl = "https://github.com/AtlasHub-Si/Atlas-Harness";

function AtlasMark({ className = "" }: { className?: string }) {
  return <svg className={className} viewBox="0 0 96 96" role="img" aria-label="Atlas SI">
    <defs><linearGradient id="atl-g" x1="0" x2="1" y1="1" y2="0"><stop stopColor="#49a1ff"/><stop offset="1" stopColor="#88f1ff"/></linearGradient></defs>
    <path d="M48 7 91 83H5L48 7Z" stroke="url(#atl-g)" strokeWidth="5" fill="none" strokeLinejoin="round"/>
    <path d="M48 30 73 74H23L48 30Z" stroke="#48a1fa" strokeOpacity=".7" strokeWidth="2.3" fill="none"/>
    <path d="M48 50 59 70H37L48 50Z" fill="#69bfff" />
  </svg>;
}

export default async function LandingRoute({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = content[locale];
  return <div className="atl-launch">
    <div className="atl-ambient" aria-hidden="true" />
    <header className="atl-nav">
      <a className="atl-brand" href={`/${locale}`} aria-label="Atlas SI"><AtlasMark/><span>ATLAS<span className="atl-brand-dot">.SI</span><small>INTELLIGENCE FOR THE AUGMENTED ENTERPRISE</small></span></a>
      <nav className="atl-nav-links" aria-label="Main navigation">
        <a href="#architecture">{t.nav1}</a><a href="#systems">{t.nav2}</a>
        <div className="atl-languages" aria-label="Language">{languages.map(lang=><a key={lang} className={lang===locale?"active":""} href={`/${lang}`} hrefLang={lang}>{lang.toUpperCase()}</a>)}</div>
      </nav>
    </header>
    <main>
      <section className="atl-hero">
        <div className="atl-hero-copy">
          <p className="atl-eyebrow"><span className="atl-live-dot"/>{t.eyebrow}</p>
          <h1>{t.headline1}<br/><strong>{t.headline2}</strong></h1>
          <p className="atl-intro">{t.intro}</p>
          <div className="atl-buttons">
            <a className="atl-btn atl-btn-primary" href={contactUrl} target="_blank" rel="noopener noreferrer">{t.cta}<span aria-hidden="true">↗</span></a>
            <a className="atl-btn atl-btn-secondary" href={harnessUrl} target="_blank" rel="noopener noreferrer">{t.cta2}<span aria-hidden="true">↗</span></a>
          </div>
          <div className="atl-hero-state"><span className="atl-line"/> {t.status}</div>
        </div>
        <div className="atl-hero-scene" aria-hidden="true">
          <div className="atl-orbit atl-orbit-a"/><div className="atl-orbit atl-orbit-b"/><div className="atl-orbit atl-orbit-c"/>
          <div className="atl-core"><AtlasMark/><span>ATLAS<br/>HARNESS</span></div>
          <span className="atl-orbit-label atl-orbit-label-a">MEMORY</span><span className="atl-orbit-label atl-orbit-label-b">AGENTS</span><span className="atl-orbit-label atl-orbit-label-c">WORKFORCE</span>
        </div>
      </section>
      <section className="atl-section" id="architecture">
        <div className="atl-section-head"><p className="atl-kicker">01 / SYSTEM ARCHITECTURE</p><h2>{t.stackTitle}</h2><p>{t.stackCopy}</p></div>
        <div className="atl-systems" id="systems">{t.cards.map(([name,description],i)=><article className="atl-system" key={name}><span className="atl-index">{String(i+1).padStart(2,"0")}</span><h3>{name}</h3><p>{description}</p><div className="atl-system-line"/></article>)}</div>
      </section>
      <section className="atl-progress">
        <div><p className="atl-kicker">02 / ROADMAP</p><h2>{t.roadmapTitle}</h2><div className="atl-steps">{t.roadmap.map((v,i)=><div key={v}><span>{String(i+1).padStart(2,"0")}</span><p>{v}</p></div>)}</div></div>
        <aside className="atl-release" id="download"><span className="atl-release-tag">{t.downloadStatus}</span><h2>{t.downloadTitle}</h2><p>{t.downloadText}</p><a href={contactUrl} target="_blank" rel="noopener noreferrer">{t.cta} ↗</a></aside>
      </section>
    </main>
    <footer className="atl-footer"><div className="atl-footer-top"><AtlasMark/><span>ATLAS.SI<small>{t.footer}</small></span></div><p className="atl-disclaimer">{t.transparency}</p><div className="atl-footer-bottom"><span>© 2026 AtlasHub.SI · Atlas Harness V0.1</span><div><a href={harnessUrl} target="_blank" rel="noopener noreferrer">GitHub ↗</a><a href="https://atlashub.si" target="_blank" rel="noopener noreferrer">AtlasHub ↗</a><a href={contactUrl} target="_blank" rel="noopener noreferrer">{t.contact} ↗</a></div></div></footer>
  </div>;
}
