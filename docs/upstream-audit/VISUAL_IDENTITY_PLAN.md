# PLANO DE IDENTIDADE VISUAL — ATLASHUB AI WORKFORCE

> Nota: o brief refere duas referências visuais (logótipo AtlasHub.SI e
> storyboard de 12s), mas **nenhuma imagem foi recebida nesta conversa**.
> Este plano parte das características descritas; os ficheiros originais podem
> mudar detalhes.

## 1. Direção

Identidade 3D premium: azul elétrico (#1E6BFF aprox.), azul profundo (#0A1F4D),
branco e ciano (#4FE3FF), materiais aveludados soft-touch, iluminação
cinematográfica, órbitas e partículas. Original — sem copiar Dots (OpenAI),
Bots (Grok) ou qualquer marca.

## 2. Entregáveis de marca

| Entregável | Formato | Uso |
|---|---|---|
| Logótipo 3D master | GLB/USDZ + renders 4K | site, apresentações |
| Animação de assinatura 12s | MP4 + WebM + sequência PNG | hero do site |
| Versões reduzidas | Lottie/SVG animado | loading, avatar, ícone, entrada, chat |
| Sistema de cor por departamento | tokens CSS | UI da app |
| Personagem Atlas + variantes | GLB + sprites de expressão | agentes na app |
| Guia de marca | PDF/MD | consistência |

## 3. Storyboard 12s (narrativa a preservar)

0–2s partículas na escuridão → 2–4s formam o "A" → 4–6s volume/material/luz →
6–8s órbitas energéticas → 8–10s estabilização com "respiração" luminosa →
10–12s assinatura "AtlasHub.SI AI Workforce".

## 4. Pipeline técnico recomendado

- **Blender** (modelação/animação, open source) → export GLB/USDZ.
- **Three.js / React Three Fiber** no site/app para versão interativa; MP4/WebM
  como fallback.
- **Lottie** para estados de UI (loading, avatar, estados de agente).
- Materiais: subsurface + sheen soft-touch; iluminação HDRI cinematográfica;
  pós: bloom subtil, grain leve; sem photorealism exagerado.

## 5. Universo de agentes

- Personagem principal **Atlas** (âncora da marca).
- Variantes por departamento: cor de acento + silhueta + acessório distinto.
- estados: idle, a pensar, a executar, a colaborar (2+ agentes), concluído.
- Microanimações: blink, tilt, pulse de comunicação entre agentes.

## 6. Próximo passo

Receber os dois ficheiros de referência e produzir: paleta final, 3 pranchas de
conceito (Atlas, variantes, órbitas), e um teste de animação de 12s em Blender.
