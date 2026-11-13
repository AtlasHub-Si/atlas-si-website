/*
 * Localized titles and descriptions for the news and guides collections.
 * Article and guide BODIES stay in English for now — non-English locales
 * render a small notice above the prose (collections.article.notice).
 */

import type { Locale } from "./config";

interface LocalizedEntry {
  title: string;
  description: string;
}

type TitleMap = Record<string, Partial<Record<Locale, LocalizedEntry>>>;

export const NEWS_TITLES: TitleMap = {
  "introducing-atlasbot": {
    pt: {
      title: "Apresentamos o AtlasBot: um espaço de trabalho partilhado para agentes de IA",
      description:
        "Conheça o AtlasBot, um espaço de trabalho local-first onde os modelos de IA que já utiliza podem trabalhar como uma equipa de agentes, ao lado de si e dos seus colegas.",
    },
    fr: {
      title: "Voici AtlasBot : un espace de travail partagé pour les agents d'IA",
      description:
        "Découvrez AtlasBot, un espace de travail local d'abord où les modèles d'IA que vous utilisez déjà peuvent travailler comme une équipe d'agents, à vos côtés et à ceux de vos collègues.",
    },
    es: {
      title: "Te presentamos AtlasBot: un espacio de trabajo compartido para agentes de IA",
      description:
        "Conoce AtlasBot, un espacio de trabajo local primero donde los modelos de IA que ya usas pueden trabajar como un equipo de agentes, junto a ti y tus compañeros.",
    },
  },
  "your-work-stays-on-your-computer": {
    pt: {
      title: "O seu trabalho fica no seu computador",
      description:
        "Os espaços de trabalho, conversas e anexos vivem numa base de dados SQLite que é sua. Eis o que isso exclui — e a única coisa que não exclui.",
    },
    fr: {
      title: "Votre travail reste sur votre ordinateur",
      description:
        "Espaces de travail, conversations et pièces jointes vivent dans une base de données SQLite qui vous appartient. Voici ce que cela exclut — et la seule chose que cela n'exclut pas.",
    },
    es: {
      title: "Tu trabajo se queda en tu ordenador",
      description:
        "Los espacios de trabajo, conversaciones y adjuntos viven en una base de datos SQLite que es tuya. Esto es lo que descarta — y lo único que no.",
    },
  },
  "one-agent-many-providers": {
    pt: {
      title: "Um agente, muitos fornecedores",
      description:
        "Um agente mantém o seu espaço de trabalho, a sua thread e a sua identidade quando o move entre Codex, Claude e Grok. Mudar de modelo não deve custar-lhe o contexto.",
    },
    fr: {
      title: "Un agent, plusieurs fournisseurs",
      description:
        "Un agent garde son espace de travail, son fil et son identité quand vous le déplacez entre Codex, Claude et Grok. Changer de modèle ne devrait pas lui coûter son contexte.",
    },
    es: {
      title: "Un agente, muchos proveedores",
      description:
        "Un agente conserva su espacio de trabajo, su hilo y su identidad cuando lo mueves entre Codex, Claude y Grok. Cambiar de modelo no debería costarle el contexto.",
    },
  },
  "channels-put-agents-in-one-room": {
    pt: {
      title: "Os canais põem os agentes no mesmo espaço",
      description:
        "Um canal é uma thread partilhada que vários agentes leem e escrevem. Transforma uma pilha de chats paralelos em algo mais próximo de uma conversa de equipa.",
    },
    fr: {
      title: "Les canaux réunissent les agents dans une même pièce",
      description:
        "Un canal est un fil partagé que plusieurs agents lisent et écrivent. Il transforme une pile de discussions parallèles en quelque chose de plus proche d'une conversation d'équipe.",
    },
    es: {
      title: "Los canales ponen a los agentes en una misma sala",
      description:
        "Un canal es un hilo compartido que varios agentes leen y escriben. Convierte una pila de chats paralelos en algo más parecido a una conversación de equipo.",
    },
  },
  "routines-give-an-agent-a-schedule": {
    pt: {
      title: "As rotinas dão um horário ao agente",
      description:
        "Uma rotina é uma instrução e os momentos para a executar. O agente faz o trabalho na sua própria thread, para o resultado chegar onde o contexto já está.",
    },
    fr: {
      title: "Les routines donnent un horaire à l'agent",
      description:
        "Une routine, c'est une instruction et les moments où l'exécuter. L'agent fait le travail dans son propre fil, pour que le résultat arrive là où le contexte se trouve déjà.",
    },
    es: {
      title: "Las rutinas le dan un horario al agente",
      description:
        "Una rutina es una instrucción y los momentos para ejecutarla. El agente hace el trabajo en su propio hilo, para que el resultado llegue donde ya está el contexto.",
    },
  },
  "every-agent-gets-a-workspace": {
    pt: {
      title: "Cada agente recebe um espaço de trabalho",
      description:
        "Um diretório por agente, mantido entre execuções, e um diretório partilhado para entregas. Um espaço de trabalho organiza o trabalho do agente; não limita o que ele pode tocar.",
    },
    fr: {
      title: "Chaque agent reçoit un espace de travail",
      description:
        "Un répertoire par agent, conservé entre les exécutions, et un répertoire partagé pour les passations. Un espace de travail organise le travail de l'agent ; il ne limite pas ce qu'il peut toucher.",
    },
    es: {
      title: "Cada agente recibe un espacio de trabajo",
      description:
        "Un directorio por agente, mantenido entre ejecuciones, y un directorio compartido para entregas. Un espacio de trabajo organiza el trabajo del agente; no limita lo que puede tocar.",
    },
  },
  "run-the-team-server-yourself": {
    pt: {
      title: "Monte o servidor de equipa você mesmo",
      description:
        "As equipas funcionam num computador que é seu. A parte alojada guarda contas e membros; nunca guarda as suas conversas, os seus ficheiros ou os seus comandos.",
    },
    fr: {
      title: "Hébergez vous-même le serveur d'équipe",
      description:
        "Les équipes fonctionnent sur un ordinateur qui vous appartient. La partie hébergée conserve les comptes et les adhésions ; elle ne conserve jamais vos conversations, vos fichiers ni vos commandes.",
    },
    es: {
      title: "Monta tú mismo el servidor de equipo",
      description:
        "Los equipos funcionan en un ordenador tuyo. La parte alojada guarda cuentas y membresías; nunca guarda tus conversaciones, tus archivos ni tus comandos.",
    },
  },
  "what-gets-redacted-before-it-leaves": {
    pt: {
      title: "O que é removido antes de sair",
      description:
        "Registos, diagnósticos e análise passam todos por uma camada de remoção de dados sensíveis à saída. Eis o que ela remove, e porque é que a regra vive na saída.",
    },
    fr: {
      title: "Ce qui est masqué avant de partir",
      description:
        "Journaux, diagnostics et analytique passent tous par une couche de masquage en sortie. Voici ce qu'elle retire, et pourquoi la règle vit à la sortie.",
    },
    es: {
      title: "Lo que se censura antes de salir",
      description:
        "Los registros, diagnósticos y analítica pasan todos por una capa de censura al salir. Esto es lo que elimina, y por qué la regla vive en la salida.",
    },
  },
};

export const GUIDES_TITLES: TitleMap = {
  "atlasbot-101": {
    pt: {
      title: "AtlasBot 101",
      description:
        "O que é o AtlasBot, o que um agente mantém entre execuções e como pôr um a fazer trabalho real no seu computador. Comece aqui se ainda não abriu a aplicação.",
    },
    fr: {
      title: "AtlasBot 101",
      description:
        "Ce qu'est AtlasBot, ce qu'un agent conserve entre les exécutions, et comment en mettre un au travail sur votre ordinateur. Commencez ici si vous n'avez pas encore ouvert l'application.",
    },
    es: {
      title: "AtlasBot 101",
      description:
        "Qué es AtlasBot, qué conserva un agente entre ejecuciones y cómo poner uno a hacer trabajo real en tu ordenador. Empieza aquí si aún no has abierto la aplicación.",
    },
  },
  "write-a-guide-for-atlasbot": {
    pt: {
      title: "Escreva um guia para o AtlasBot",
      description:
        "Como escrever um guia para o AtlasBot, com um exemplo prático de todos os elementos disponíveis: prosa, links, tabelas, imagens, animações, clips e vídeo com legendas.",
    },
    fr: {
      title: "Écrivez un guide pour AtlasBot",
      description:
        "Comment écrire un guide pour AtlasBot, avec un exemple pratique de chaque élément utilisable : prose, liens, tableaux, images, animations, clips et vidéo sous-titrée.",
    },
    es: {
      title: "Escribe una guía para AtlasBot",
      description:
        "Cómo escribir una guía para AtlasBot, con un ejemplo práctico de todos los elementos disponibles: prosa, enlaces, tablas, imágenes, animaciones, clips y vídeo con subtítulos.",
    },
  },
  "wtf-is-atlasbot": {
    pt: {
      title: "WTF é o AtlasBot?",
      description: "Uma explicação prática de modelos, fornecedores, agentes e do espaço de trabalho local-first que os junta.",
    },
    fr: {
      title: "WTF, c'est quoi AtlasBot ?",
      description:
        "Une explication pratique des modèles, des fournisseurs, des agents et de l'espace de travail local d'abord qui les réunit.",
    },
    es: {
      title: "¿WTF es AtlasBot?",
      description:
        "Una explicación práctica de modelos, proveedores, agentes y del espacio de trabajo local primero que los une.",
    },
  },
};

/* Resolve the localized title/description, falling back to the English entry. */
export function localizeEntry(
  entry: { slug: string; title: string; description: string },
  map: TitleMap,
  locale: Locale,
): { title: string; description: string } {
  const localized = map[entry.slug]?.[locale];
  return localized ?? { title: entry.title, description: entry.description };
}
