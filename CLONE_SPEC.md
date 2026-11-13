# CLONE_SPEC.md — Esqueleto observado do openbot.run (para readaptação Atlas-SI)

> Metodologia clean-room: este documento descreve **comportamento e estrutura observados**,
> não código. Nada do código, assets ou textos do openbot.run deve ser copiado.
> Fonte: navegação pública de openbot.run (13 nov 2026).

## 1. Arquitetura geral observada

- Site de marketing em várias páginas (MPA com navegação fluida), leve e rápido.
- Multi-idioma: prefixo de rota (`/pt`, `/pl`); inglês é a raiz (`/`).
- Rodapé global em 4 colunas (Product, Resources, Providers, Compare) + redes sociais + link de código-fonte.
- Página `/brand`: kit de marca com SVG/PNG e botão "Copy SVG" — padrão útil para a Atlas.
- Página `/contact`: formulário (nome, email opcional, empresa opcional, topic-select, mensagem 0/2000) com nota de privacidade.
- Header global: logo · links de produto · botão Download/CTA principal · seletor de idioma.

## 2. Mapa de rotas observadas

| Rota | Tipo | Conteúdo |
|---|---|---|
| `/` | Home | Hero com CTA de download, preview interativo do app, prova social, secção "For Teams", compare |
| `/teams` | B2B | Hero B2B, 3 setups (local, servidor gerido, custom), funcionalidades, CTA "Contact us" |
| `/pricing` | Pricing | Tabela mensal/anual com switch (€, USD, PLN, BRL), 3 planos hosted (€20/50/100) + licenças (free até data X) |
| `/download` | Download | Cards por plataforma (macOS, Windows, Linux, iOS, Android) com requisitos e passos |
| `/providers` + `/providers/<slug>` | Índice + detalhe | Catálogo de agentes integrados com cards "Set it up" |
| `/news` + `/news/<slug>` | Blog | Posts datados com autor |
| `/guides` + `/guides/<slug>` | Tutoriais | Como instalar, migrar, usar |
| `/compare` + `/compare/<slug>` | SEO | Comparações "X vs Y" com conclusão prática |
| `/marketplace` (+ `/agents`, `/skills`, `/apps`) | Diretório | Filtro por tags, busca, ~249 apps, cards com versão |
| `/plugins/<slug>` | Detalhe | Página por plugin |
| `/brand` | Marca | Kit de logos |
| `/contact` | Contacto | Formulário + canais (Discord, GitHub, X, email) |
| `/privacy-policy`, `/terms`, `/commercial-license`, `/dpa`, `/cla` | Legal | Páginas de compliance |
| `/changelog` | Changelog | Histórico de versões |

## 3. Padrões de conteúdo e comportamento

- **Home**: 1 mensagem clara + CTA único ("Download for <platform>"); preview do produto embutido; secção Teams com 4 cards de valor.
- **Pricing**: toggle mensal/anual com desconto −20%, moedas dinâmicas, badge "BEST VALUE" e "SOLD OUT" (escassez).
- **SEO**: páginas `/compare/<slug>` em volume (12+), títulos com benefício ("A Private, Local Alternative").
- **Blog/Guides**: cadência semanal, autor nomeado, CTA "Read More".
- **Marketplace**: filtro client-side por tags + busca; cards com nome, versão (v1.0.0), descrição de 5–8 palavras.
- **Download**: detecta plataforma do utilizador no CTA do header ("Download for Linux").

## 4. Readaptação proposta para atlas-si.com

| openbot.run | atlas-si.com (proposta) |
|---|---|
| Produto: app local de agentes | Produto: workforce de agentes Atlas (equipas organizadas por divisões) |
| `/providers` (agentes integrados) | `/equipas` ou `/divisões` — catálogo de divisões/agentes do Atlas-Workforce |
| `/marketplace` (plugins) | Diretório de skills/serviços da Atlas |
| `/pricing` (hosted + licenças) | Planos de serviço da Atlas (setup, gestão, consultoria) |
| `/teams` (B2B) | Página B2B da Atlas: servidor gerido, custom, implementação |
| `/news` + `/guides` | Blog + guias em PT (e EN para alcance) |
| `/compare/<slug>` | Comparações de mercado da Atlas (mesma mecânica SEO) |
| `/brand` | Kit de marca Atlas (logo, cores próprias — nunca as do OpenBot) |
| `/contact` | Formulário de contacto com canais da Atlas |

## 5. Estrutura técnica proposta

- Astro (já no scaffold) + Tailwind, conteúdo em MDX para blog/guias/compare.
- i18n com prefixo de rota: `/` (PT ou EN, a decidir), `/pt`, `/en`.
- Componentes: Header, Footer, PlatformCTA, PricingTable, CardGrid, TagFilter, ContactForm.
- Previews "interativos" → na Atlas, mockup estático/animado do workspace de agentes (não copiar o do OpenBot).

## 6. Não observado / limitações

- Página `/pricing` renderiza o corpo por cima do conteúdo base (H1 após hydration); valores capturados, layout exato não fotografado.
- Comportamento de download real (instaladores) fora do âmbito.
- Código-fonte não inspecionado (por decisão clean-room).
