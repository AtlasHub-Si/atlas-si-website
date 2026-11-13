/*
 * UI dictionaries for the four launch locales. Everything the visitor reads
 * outside article/plugin bodies lives here; the bodies themselves stay in
 * English for now (non-English locales show a small notice instead — see
 * collections.article.notice).
 */

import type { Locale } from "./config";

export interface Dictionary {
  site: { title: string; description: string };
  nav: {
    home: string;
    aria: string;
    news: string;
    guides: string;
    plugins: string;
    contact: string;
    app: string;
    download: string;
  };
  lang: { aria: string };
  brand: { animate: string };
  hero: {
    availabilityNew: string;
    availableOn: string;
    titleLine1: string;
    descriptionBefore: string;
    descriptionAnd: string;
    descriptionAfter: string;
  };
  preview: { title: string; loading: string };
  pricing: { eyebrow: string; note: string };
  family: {
    eyebrow: string;
    title: string;
    note: string;
    roles: { guide: string; creator: string; builder: string; analyst: string; flow: string; shield: string };
  };
  download: {
    title: string;
    subtitle: string;
    statusAvailable: string;
    statusComingSoon: string;
    actions: { macos: string; windows: string; linux: string };
    choosePlatform: string;
    menuAria: string;
  };
  collections: {
    news: CollectionDict;
    guides: CollectionDict;
    readArticle: string;
    cta: { title: string; description: string; read101: string };
    article: { moreFrom: string; notice: string };
  };
  plugins: {
    title: string;
    description: string;
    filtersAria: string;
    empty: string;
    featured: string;
    catalogUpdated: string;
    categories: Record<CategoryKey, string>;
  };
  join: {
    brandHome: string;
    eyebrow: string;
    title: string;
    copy: string;
    error: string;
    open: string;
    download: string;
    noteMobile: string;
    noteShare: string;
  };
  footer: {
    description: string;
    cta: string;
  columns: FooterColumn[];
  links: FooterLinks;
  navAria: string;
  rights: string;
    availability: string;
    madeBefore: string;
    madeAfter: string;
  };
  notFound: { title: string; message: string; back: string };
}

export type CategoryKey =
  | "coding"
  | "design"
  | "data-analytics"
  | "documents"
  | "productivity"
  | "research"
  | "automation"
  | "other";

export type FooterLinkKey =
  | "download"
  | "news"
  | "guides"
  | "plugins"
  | "releases"
  | "source"
  | "license"
  | "privacy"
  | "documentation"
  | "troubleshooting"
  | "architecture"
  | "contributing"
  | "codex"
  | "claude";

export interface FooterColumn {
  title: string;
  links: FooterLinkKey[];
}

export interface FooterLinks extends Record<FooterLinkKey, string> {}

interface CollectionDict {
  name: string;
  indexTitle: string;
  indexDescription: string;
  eyebrow: string;
  backLabel: string;
  moreTitle: string;
}

const en: Dictionary = {
  site: {
    title: "AtlasBot: AI teammates for real work",
    description:
      "Run Codex and Claude side by side as persistent AI teammates, each with its own workspace, queue, and context.",
  },
  nav: {
    home: "AtlasBot home",
    aria: "Primary navigation",
    news: "News",
    guides: "Guides",
    plugins: "Plugins",
    contact: "Contact",
    app: "App",
    download: "Download",
  },
  lang: { aria: "Language" },
  brand: { animate: "Animate the AtlasBot logo" },
  hero: {
    availabilityNew: "NEW",
    availableOn: "Available on",
    titleLine1: "Meet",
    descriptionBefore: "Persistent AI teammates for real work. Run ",
    descriptionAnd: "and",
    descriptionAfter: " side by side, each with its own workspace, queue, and context.",
  },
  preview: {
    title: "Interactive AtlasBot application preview",
    loading: "Loading AtlasBot preview",
  },
  pricing: {
    eyebrow: "What it costs",
    note: "AtlasBot is free. No hidden fees. No locked features.",
  },
  family: {
    eyebrow: "The family",
    title: "Meet the AtlasBot family",
    note: "Six everyday agents, one for each part of your day.",
    roles: {
      guide: "Help & Onboarding",
      creator: "Content & Ideas",
      builder: "Automation & Agents",
      analyst: "Data & Insights",
      flow: "Processes & Productivity",
      shield: "Security & Privacy",
    },
  },
  download: {
    title: "Download AtlasBot",
    subtitle: "Choose your platform. Run Codex, Claude, and Grok side by side from one desktop app.",
    statusAvailable: "Available",
    statusComingSoon: "Coming soon",
    actions: {
      macos: "Download for macOS",
      windows: "Download for Windows",
      linux: "Download for Linux",
    },
    choosePlatform: "Choose download platform",
    menuAria: "Download platforms",
  },
  collections: {
    news: {
      name: "News",
      indexTitle: "News — AtlasBot",
      indexDescription:
        "Notes on building AtlasBot: local-first storage, agents that outlive their provider, and how the pieces fit together.",
      eyebrow: "ATLASBOT · NEWS",
      backLabel: "All news",
      moreTitle: "More from AtlasBot",
    },
    guides: {
      name: "Guides",
      indexTitle: "Guides — AtlasBot",
      indexDescription:
        "How AtlasBot works and how to write about it. Start with AtlasBot 101, then use the template guide as the worked example for the next one.",
      eyebrow: "ATLASBOT · GUIDES",
      backLabel: "All guides",
      moreTitle: "More guides",
    },
    readArticle: "Read the article",
    cta: {
      title: "Put your agents to work",
      description:
        "AtlasBot is free and local-first. Download the app, create your first agent, and give it a job that outlives the chat.",
      read101: "Read AtlasBot 101",
    },
    article: {
      moreFrom: "More from AtlasBot",
      notice: "",
    },
  },
  plugins: {
    title: "Plugins — AtlasBot",
    description:
      "Plugins connect AtlasBot agents to the services you already use. Browse the catalog, see what each plugin can do, and try one of its starter prompts.",
    filtersAria: "Filter plugins by category",
    empty: "No plugins in this category yet.",
    featured: "Featured",
    catalogUpdated: "Catalog updated",
    categories: {
      coding: "Coding",
      design: "Design",
      "data-analytics": "Data & Analytics",
      documents: "Documents",
      productivity: "Productivity",
      research: "Research",
      automation: "Automation",
      other: "Other",
    },
  },
  join: {
    brandHome: "AtlasBot home",
    eyebrow: "Private invitation",
    title: "Connect to an AtlasBot host",
    copy: "Open this invitation in AtlasBot. The app will verify the host and ask for confirmation before it connects.",
    error: "This invitation link is invalid or incomplete. Ask the host for a new invitation.",
    open: "Open AtlasBot",
    download: "Download AtlasBot",
    noteMobile:
      "If AtlasBot is installed, tap Open AtlasBot. You can also paste this link into Add server in the app.",
    noteShare:
      "This link grants access to a host. Share it only with people you want to invite. AtlasBot shows its expiry before you join.",
  },
  footer: {
    description:
      "Persistent AI teammates for real work. Run Codex, Claude, and Grok side by side, each with its own workspace, queue, and context.",
    cta: "Download AtlasBot",
    columns: [
      {
        title: "Product",
        links: ["download", "news", "guides", "plugins", "releases", "source", "license", "privacy"],
      },
      {
        title: "Resources",
        links: ["documentation", "troubleshooting", "architecture", "contributing", "codex", "claude"],
      },
    ],
    links: {
      download: "Download",
      news: "News",
      guides: "Guides",
      plugins: "Plugins",
      releases: "Releases",
      source: "Source code",
      license: "License",
      privacy: "Privacy",
      documentation: "Documentation",
      troubleshooting: "Troubleshooting",
      architecture: "Architecture",
      contributing: "Contributing",
      codex: "Codex",
      claude: "Claude Code",
    },
    navAria: "Footer navigation",
    rights: "All rights reserved.",
    availability: "Available for macOS and Windows",
    madeBefore: "Made with",
    madeAfter: "in Brazil",
  },
  notFound: {
    title: "Page not found",
    message: "The page you are looking for does not exist or has moved.",
    back: "Back to home",
  },
};

const pt: Dictionary = {
  site: {
    title: "AtlasBot: companheiros de IA para trabalho a sério",
    description:
      "Execute o Codex e o Claude lado a lado como companheiros de IA persistentes, cada um com o seu próprio espaço de trabalho, fila e contexto.",
  },
  nav: {
    home: "Início do AtlasBot",
    aria: "Navegação principal",
    news: "Notícias",
    guides: "Guias",
    plugins: "Plugins",
    contact: "Contacto",
    app: "App",
    download: "Descarregar",
  },
  lang: { aria: "Idioma" },
  brand: { animate: "Animar o logótipo do AtlasBot" },
  hero: {
    availabilityNew: "NOVO",
    availableOn: "Disponível em",
    titleLine1: "Apresentamos",
    descriptionBefore: "Companheiros de IA persistentes para trabalho a sério. Execute ",
    descriptionAnd: "e",
    descriptionAfter: " lado a lado, cada um com o seu próprio espaço de trabalho, fila e contexto.",
  },
  preview: {
    title: "Pré-visualização interativa da aplicação AtlasBot",
    loading: "A carregar a pré-visualização do AtlasBot",
  },
  pricing: {
    eyebrow: "O que custa",
    note: "O AtlasBot é gratuito. Sem custos escondidos. Sem funcionalidades bloqueadas.",
  },
  family: {
    eyebrow: "A família",
    title: "Conhece a família AtlasBot",
    note: "Seis agentes de uso diário, um para cada parte do teu dia.",
    roles: {
      guide: "Ajuda & Onboarding",
      creator: "Conteúdo & Ideias",
      builder: "Automação & Agentes",
      analyst: "Dados & Insights",
      flow: "Processos & Produtividade",
      shield: "Segurança & Privacidade",
    },
  },
  download: {
    title: "Descarregar o AtlasBot",
    subtitle:
      "Escolha a sua plataforma. Execute o Codex, o Claude e o Grok lado a lado a partir de uma única aplicação de ambiente de trabalho.",
    statusAvailable: "Disponível",
    statusComingSoon: "Em breve",
    actions: {
      macos: "Descarregar para macOS",
      windows: "Descarregar para Windows",
      linux: "Descarregar para Linux",
    },
    choosePlatform: "Escolher plataforma de descarga",
    menuAria: "Plataformas de descarga",
  },
  collections: {
    news: {
      name: "Notícias",
      indexTitle: "Notícias — AtlasBot",
      indexDescription:
        "Notas sobre a construção do AtlasBot: armazenamento local-first, agentes que sobrevivem ao fornecedor e como as peças se encaixam.",
      eyebrow: "ATLASBOT · NOTÍCIAS",
      backLabel: "Todas as notícias",
      moreTitle: "Mais do AtlasBot",
    },
    guides: {
      name: "Guias",
      indexTitle: "Guias — AtlasBot",
      indexDescription:
        "Como o AtlasBot funciona e como escrever sobre ele. Comece pelo AtlasBot 101 e use o guia-modelo como exemplo prático para o próximo.",
      eyebrow: "ATLASBOT · GUIAS",
      backLabel: "Todos os guias",
      moreTitle: "Mais guias",
    },
    readArticle: "Ler o artigo",
    cta: {
      title: "Ponha os seus agentes a trabalhar",
      description:
        "O AtlasBot é gratuito e local-first. Descarregue a aplicação, crie o seu primeiro agente e dê-lhe um trabalho que sobreviva ao chat.",
      read101: "Ler AtlasBot 101",
    },
    article: {
      moreFrom: "Mais do AtlasBot",
      notice: "Este artigo está, por agora, disponível apenas em inglês.",
    },
  },
  plugins: {
    title: "Plugins — AtlasBot",
    description:
      "Os plugins ligam os agentes do AtlasBot aos serviços que já utiliza. Explore o catálogo, veja o que cada plugin sabe fazer e experimente um dos seus prompts iniciais.",
    filtersAria: "Filtrar plugins por categoria",
    empty: "Ainda não há plugins nesta categoria.",
    featured: "Destaque",
    catalogUpdated: "Catálogo atualizado a",
    categories: {
      coding: "Programação",
      design: "Design",
      "data-analytics": "Dados e Análise",
      documents: "Documentos",
      productivity: "Produtividade",
      research: "Investigação",
      automation: "Automação",
      other: "Outro",
    },
  },
  join: {
    brandHome: "Início do AtlasBot",
    eyebrow: "Convite privado",
    title: "Ligar a um anfitrião AtlasBot",
    copy: "Abra este convite no AtlasBot. A aplicação verifica o anfitrião e pede confirmação antes de ligar.",
    error: "Este link de convite é inválido ou está incompleto. Peça um novo convite ao anfitrião.",
    open: "Abrir o AtlasBot",
    download: "Descarregar o AtlasBot",
    noteMobile:
      "Se o AtlasBot estiver instalado, toque em Abrir o AtlasBot. Também pode colar este link em Adicionar servidor na aplicação.",
    noteShare:
      "Este link dá acesso a um anfitrião. Partilhe-o apenas com quem quiser convidar. O AtlasBot mostra a validade antes de entrar.",
  },
  footer: {
    description:
      "Companheiros de IA persistentes para trabalho a sério. Execute o Codex, o Claude e o Grok lado a lado, cada um com o seu próprio espaço de trabalho, fila e contexto.",
    cta: "Descarregar o AtlasBot",
    columns: [
      {
        title: "Produto",
        links: ["download", "news", "guides", "plugins", "releases", "source", "license", "privacy"],
      },
      {
        title: "Recursos",
        links: ["documentation", "troubleshooting", "architecture", "contributing", "codex", "claude"],
      },
    ],
    links: {
      download: "Descarregar",
      news: "Notícias",
      guides: "Guias",
      plugins: "Plugins",
      releases: "Lançamentos",
      source: "Código-fonte",
      license: "Licença",
      privacy: "Privacidade",
      documentation: "Documentação",
      troubleshooting: "Solução de problemas",
      architecture: "Arquitetura",
      contributing: "Contribuir",
      codex: "Codex",
      claude: "Claude Code",
    },
    navAria: "Navegação do rodapé",
    rights: "Todos os direitos reservados.",
    availability: "Disponível para macOS e Windows",
    madeBefore: "Feito com",
    madeAfter: "no Brasil",
  },
  notFound: {
    title: "Página não encontrada",
    message: "A página que procura não existe ou foi movida.",
    back: "Voltar ao início",
  },
};

const fr: Dictionary = {
  site: {
    title: "AtlasBot : des coéquipiers d'IA pour le vrai travail",
    description:
      "Exécutez Codex et Claude côte à côte comme coéquipiers d'IA persistants, chacun avec son espace de travail, sa file d'attente et son contexte.",
  },
  nav: {
    home: "Accueil AtlasBot",
    aria: "Navigation principale",
    news: "Actualités",
    guides: "Guides",
    plugins: "Plugins",
    contact: "Contact",
    app: "App",
    download: "Télécharger",
  },
  lang: { aria: "Langue" },
  brand: { animate: "Animer le logo AtlasBot" },
  hero: {
    availabilityNew: "NOUVEAU",
    availableOn: "Disponible sur",
    titleLine1: "Voici",
    descriptionBefore: "Des coéquipiers d'IA persistants pour le vrai travail. Exécutez ",
    descriptionAnd: "et",
    descriptionAfter: " côte à côte, chacun avec son espace de travail, sa file d'attente et son contexte.",
  },
  preview: {
    title: "Aperçu interactif de l'application AtlasBot",
    loading: "Chargement de l'aperçu d'AtlasBot",
  },
  pricing: {
    eyebrow: "Ce que ça coûte",
    note: "AtlasBot est gratuit. Aucun frais caché. Aucune fonctionnalité verrouillée.",
  },
  family: {
    eyebrow: "La famille",
    title: "Découvrez la famille AtlasBot",
    note: "Six agents du quotidien, un pour chaque moment de votre journée.",
    roles: {
      guide: "Aide & Intégration",
      creator: "Contenu & Idées",
      builder: "Automatisation & Agents",
      analyst: "Données & Analyses",
      flow: "Processus & Productivité",
      shield: "Sécurité & Confidentialité",
    },
  },
  download: {
    title: "Télécharger AtlasBot",
    subtitle:
      "Choisissez votre plate-forme. Exécutez Codex, Claude et Grok côte à côte depuis une seule application de bureau.",
    statusAvailable: "Disponible",
    statusComingSoon: "Bientôt disponible",
    actions: {
      macos: "Télécharger pour macOS",
      windows: "Télécharger pour Windows",
      linux: "Télécharger pour Linux",
    },
    choosePlatform: "Choisir la plate-forme de téléchargement",
    menuAria: "Plates-formes de téléchargement",
  },
  collections: {
    news: {
      name: "Actualités",
      indexTitle: "Actualités — AtlasBot",
      indexDescription:
        "Notes sur la construction d'AtlasBot : stockage local d'abord, des agents qui survivent à leur fournisseur, et comment les pièces s'assemblent.",
      eyebrow: "ATLASBOT · ACTUALITÉS",
      backLabel: "Toutes les actualités",
      moreTitle: "Plus d'AtlasBot",
    },
    guides: {
      name: "Guides",
      indexTitle: "Guides — AtlasBot",
      indexDescription:
        "Comment fonctionne AtlasBot et comment l'écrire. Commencez par AtlasBot 101, puis utilisez le guide modèle comme exemple pratique pour le suivant.",
      eyebrow: "ATLASBOT · GUIDES",
      backLabel: "Tous les guides",
      moreTitle: "Plus de guides",
    },
    readArticle: "Lire l'article",
    cta: {
      title: "Mettez vos agents au travail",
      description:
        "AtlasBot est gratuit et local d'abord. Téléchargez l'application, créez votre premier agent et donnez-lui un travail qui survive au tchat.",
      read101: "Lire AtlasBot 101",
    },
    article: {
      moreFrom: "Plus d'AtlasBot",
      notice: "Cet article est disponible en anglais uniquement pour le moment.",
    },
  },
  plugins: {
    title: "Plugins — AtlasBot",
    description:
      "Les plugins connectent les agents AtlasBot aux services que vous utilisez déjà. Parcourez le catalogue, découvrez ce que chaque plugin sait faire et essayez l'un de ses prompts de démarrage.",
    filtersAria: "Filtrer les plugins par catégorie",
    empty: "Aucun plugin dans cette catégorie pour le moment.",
    featured: "En vedette",
    catalogUpdated: "Catalogue mis à jour le",
    categories: {
      coding: "Code",
      design: "Design",
      "data-analytics": "Données et analyse",
      documents: "Documents",
      productivity: "Productivité",
      research: "Recherche",
      automation: "Automatisation",
      other: "Autre",
    },
  },
  join: {
    brandHome: "Accueil AtlasBot",
    eyebrow: "Invitation privée",
    title: "Se connecter à un hôte AtlasBot",
    copy: "Ouvrez cette invitation dans AtlasBot. L'application vérifiera l'hôte et demandera une confirmation avant de se connecter.",
    error: "Ce lien d'invitation est invalide ou incomplet. Demandez une nouvelle invitation à l'hôte.",
    open: "Ouvrir AtlasBot",
    download: "Télécharger AtlasBot",
    noteMobile:
      "Si AtlasBot est installé, touchez Ouvrir AtlasBot. Vous pouvez aussi coller ce lien dans Ajouter un serveur dans l'application.",
    noteShare:
      "Ce lien donne accès à un hôte. Partagez-le uniquement avec les personnes que vous souhaitez inviter. AtlasBot affiche son expiration avant que vous ne rejoigniez.",
  },
  footer: {
    description:
      "Des coéquipiers d'IA persistants pour le vrai travail. Exécutez Codex, Claude et Grok côte à côte, chacun avec son espace de travail, sa file d'attente et son contexte.",
    cta: "Télécharger AtlasBot",
    columns: [
      {
        title: "Produit",
        links: ["download", "news", "guides", "plugins", "releases", "source", "license", "privacy"],
      },
      {
        title: "Ressources",
        links: ["documentation", "troubleshooting", "architecture", "contributing", "codex", "claude"],
      },
    ],
    links: {
      download: "Télécharger",
      news: "Actualités",
      guides: "Guides",
      plugins: "Plugins",
      releases: "Versions",
      source: "Code source",
      license: "Licence",
      privacy: "Confidentialité",
      documentation: "Documentation",
      troubleshooting: "Dépannage",
      architecture: "Architecture",
      contributing: "Contribuer",
      codex: "Codex",
      claude: "Claude Code",
    },
    navAria: "Navigation de pied de page",
    rights: "Tous droits réservés.",
    availability: "Disponible pour macOS et Windows",
    madeBefore: "Fait avec",
    madeAfter: "au Brésil",
  },
  notFound: {
    title: "Page introuvable",
    message: "La page que vous cherchez n'existe pas ou a été déplacée.",
    back: "Retour à l'accueil",
  },
};

const es: Dictionary = {
  site: {
    title: "AtlasBot: compañeros de IA para el trabajo real",
    description:
      "Ejecuta Codex y Claude lado a lado como compañeros de IA persistentes, cada uno con su propio espacio de trabajo, cola y contexto.",
  },
  nav: {
    home: "Inicio de AtlasBot",
    aria: "Navegación principal",
    news: "Noticias",
    guides: "Guías",
    plugins: "Plugins",
    contact: "Contacto",
    app: "App",
    download: "Descargar",
  },
  lang: { aria: "Idioma" },
  brand: { animate: "Animar el logo de AtlasBot" },
  hero: {
    availabilityNew: "NUEVO",
    availableOn: "Disponible en",
    titleLine1: "Conoce",
    descriptionBefore: "Compañeros de IA persistentes para el trabajo real. Ejecuta ",
    descriptionAnd: "y",
    descriptionAfter: " lado a lado, cada uno con su propio espacio de trabajo, cola y contexto.",
  },
  preview: {
    title: "Vista previa interactiva de la aplicación AtlasBot",
    loading: "Cargando la vista previa de AtlasBot",
  },
  pricing: {
    eyebrow: "Lo que cuesta",
    note: "AtlasBot es gratis. Sin costes ocultos. Sin funciones bloqueadas.",
  },
  family: {
    eyebrow: "La familia",
    title: "Conoce la familia AtlasBot",
    note: "Seis agentes de uso diario, uno para cada parte de tu día.",
    roles: {
      guide: "Ayuda & Incorporación",
      creator: "Contenido e Ideas",
      builder: "Automatización y Agentes",
      analyst: "Datos e Insights",
      flow: "Procesos y Productividad",
      shield: "Seguridad y Privacidad",
    },
  },
  download: {
    title: "Descargar AtlasBot",
    subtitle:
      "Elige tu plataforma. Ejecuta Codex, Claude y Grok lado a lado desde una única aplicación de escritorio.",
    statusAvailable: "Disponible",
    statusComingSoon: "Próximamente",
    actions: {
      macos: "Descargar para macOS",
      windows: "Descargar para Windows",
      linux: "Descargar para Linux",
    },
    choosePlatform: "Elegir plataforma de descarga",
    menuAria: "Plataformas de descarga",
  },
  collections: {
    news: {
      name: "Noticias",
      indexTitle: "Noticias — AtlasBot",
      indexDescription:
        "Notas sobre la construcción de AtlasBot: almacenamiento local primero, agentes que sobreviven a su proveedor y cómo encajan las piezas.",
      eyebrow: "ATLASBOT · NOTICIAS",
      backLabel: "Todas las noticias",
      moreTitle: "Más de AtlasBot",
    },
    guides: {
      name: "Guías",
      indexTitle: "Guías — AtlasBot",
      indexDescription:
        "Cómo funciona AtlasBot y cómo escribir sobre ello. Empieza con AtlasBot 101 y usa la guía plantilla como ejemplo práctico para la siguiente.",
      eyebrow: "ATLASBOT · GUÍAS",
      backLabel: "Todas las guías",
      moreTitle: "Más guías",
    },
    readArticle: "Leer el artículo",
    cta: {
      title: "Pon a tus agentes a trabajar",
      description:
        "AtlasBot es gratis y local primero. Descarga la aplicación, crea tu primer agente y dale un trabajo que sobreviva al chat.",
      read101: "Leer AtlasBot 101",
    },
    article: {
      moreFrom: "Más de AtlasBot",
      notice: "Este artículo está disponible solo en inglés por ahora.",
    },
  },
  plugins: {
    title: "Plugins — AtlasBot",
    description:
      "Los plugins conectan los agentes de AtlasBot con los servicios que ya utilizas. Explora el catálogo, mira qué puede hacer cada plugin y prueba uno de sus prompts iniciales.",
    filtersAria: "Filtrar plugins por categoría",
    empty: "Aún no hay plugins en esta categoría.",
    featured: "Destacado",
    catalogUpdated: "Catálogo actualizado el",
    categories: {
      coding: "Programación",
      design: "Design",
      "data-analytics": "Datos y análisis",
      documents: "Documentos",
      productivity: "Productividad",
      research: "Investigación",
      automation: "Automatización",
      other: "Otro",
    },
  },
  join: {
    brandHome: "Inicio de AtlasBot",
    eyebrow: "Invitación privada",
    title: "Conectar con un anfitrión AtlasBot",
    copy: "Abre esta invitación en AtlasBot. La aplicación verificará el anfitrión y pedirá confirmación antes de conectarse.",
    error: "Este enlace de invitación no es válido o está incompleto. Pide una nueva invitación al anfitrión.",
    open: "Abrir AtlasBot",
    download: "Descargar AtlasBot",
    noteMobile:
      "Si AtlasBot está instalado, toca Abrir AtlasBot. También puedes pegar este enlace en Añadir servidor dentro de la aplicación.",
    noteShare:
      "Este enlace da acceso a un anfitrión. Compártelo solo con las personas que quieras invitar. AtlasBot muestra su caducidad antes de unirte.",
  },
  footer: {
    description:
      "Compañeros de IA persistentes para el trabajo real. Ejecuta Codex, Claude y Grok lado a lado, cada uno con su propio espacio de trabajo, cola y contexto.",
    cta: "Descargar AtlasBot",
    columns: [
      {
        title: "Producto",
        links: ["download", "news", "guides", "plugins", "releases", "source", "license", "privacy"],
      },
      {
        title: "Recursos",
        links: ["documentation", "troubleshooting", "architecture", "contributing", "codex", "claude"],
      },
    ],
    links: {
      download: "Descargar",
      news: "Noticias",
      guides: "Guías",
      plugins: "Plugins",
      releases: "Lanzamientos",
      source: "Código fuente",
      license: "Licencia",
      privacy: "Privacidad",
      documentation: "Documentación",
      troubleshooting: "Solución de problemas",
      architecture: "Arquitectura",
      contributing: "Contribuir",
      codex: "Codex",
      claude: "Claude Code",
    },
    navAria: "Navegación del pie de página",
    rights: "Todos los derechos reservados.",
    availability: "Disponible para macOS y Windows",
    madeBefore: "Hecho con",
    madeAfter: "en Brasil",
  },
  notFound: {
    title: "Página no encontrada",
    message: "La página que buscas no existe o se ha movido.",
    back: "Volver al inicio",
  },
};

export const dictionaries: Record<Locale, Dictionary> = { pt, en, fr, es };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export type { Dictionary as Dict };
