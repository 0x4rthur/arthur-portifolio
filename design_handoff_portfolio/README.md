# Handoff: Personal Portfolio — Arthur Chequer (AI Engineer)

## Overview
A single-page personal portfolio for **Arthur Chequer**, an AI Engineer specialized in **LangChain / LangGraph / RAG**, with a background in Cybersecurity & GRC. The site introduces him, lists his skills, walks through his work history, showcases selected AI projects, and provides a contact form. Visual style is inspired by the "csh" portfolio reference: soft pastel gradient bloom (peach / lavender / light blue), monospaced wordmark, glassmorphism cards, and a macOS-style mail window for contact.

## About the Design Files
The files in this bundle are **design references created in HTML** — a prototype showing the intended look, layout, and interactions. They are **not production code to copy directly**.

The task is to **recreate this design in the target codebase's existing environment** (React + Tailwind, Next.js, Astro, SvelteKit, plain Vite, etc.), reusing its established patterns, design tokens, and component libraries. If no codebase exists yet, **Next.js (App Router) + Tailwind CSS + Framer Motion** is a strong default for this kind of site.

## Fidelity
**High-fidelity (hifi).** All colors, typography, spacing, shadows, radii, and interactions in the prototype are intentional and should be recreated pixel-perfect. The animated bars, timeline pulse, hover lifts, and gradient bloom are all part of the spec.

## Screens / Views

The portfolio is **a single scrolling page** with seven anchored sections, plus a sticky pill nav and a footer. All sections share `max-width: 1200px` and `padding: 100px 24px` (except the hero).

### 1. Sticky Nav (`<nav class="top">`)
- **Position**: `sticky; top: 16px`, centered, max-width 1200px.
- **Container**: pill-shaped, `border-radius: 999px`, glass background `rgba(255,255,255,.55)` + `backdrop-filter: blur(18px) saturate(140%)`, 1px white inner border, soft shadow.
- **Left**: monospaced wordmark `[acq]` (a/q lighter, c bold).
- **Center-left**: 5 nav links — *About · Skills · Experience · Projects · Contact*, 14.5px Inter 500. Animated underline on hover (scale-x 0→1, 250ms ease).
- **Right**: LinkedIn / X / GitHub icons (16px), 1px vertical divider, then a decorative light/dark toggle pill (cosmetic only — light mode only).

### 2. Hero (`#hero`)
- **Layout**: 2-column grid `1.3fr / 0.9fr`, gap 48px, vertically centered, min-height 80vh, padding-top 120px.
- **Left**:
  - H1: `"I am" / Arthur Chequer` — clamp(44px, 6.2vw, 78px), Inter 800, letter-spacing −0.04em, line-height 1. "I am" in `--ink-mute` (#8b9098), 600 weight; name in `--ink` (#111213).
  - Lead `<p>`: 15.5px / 1.65, color `--ink-soft` (#4b4f55), max-width 540px. Bolds on **AI Engineer** and **LangChain**.
  - Two CTAs in a row, gap 14px:
    - Primary: "Download Resume" + download icon — bg `#131416`, white text, 14px 22px padding, radius 14px, shadow `0 8px 22px rgba(17,18,19,.18)`. On hover: `translateY(-1px)` + deeper shadow.
    - Ghost: "Contact me" + paper-plane icon — `rgba(255,255,255,.55)` + blur, 1px white border.
- **Right (`.ai-orb`)**: 1:1 aspect, max-width 360px, right-aligned. Two concentric rotating rings (40s + 28s reverse) around an SVG "neural orb" — radial peach/lavender/blue glow, dark central node, 6 dark hex nodes connected by thin lines, 6 outer dotted satellite nodes. **Replaces the memoji from the original reference.**

### 3. About (`#about`)
- Section heading pattern (used for all subsequent sections):
  - H2: `"About"` in muted (600) + ` me` in ink (800), clamp(40px, 5vw, 64px), letter-spacing −0.035em.
  - Eyebrow below: JetBrains Mono 11.5px, uppercase, tracking 0.14em, ink-mute. Text: `WHO, WHAT, WHY.`
- Body: 2-column grid `1fr / 1fr`, gap 56px.
  - **Left card (`.about-card`)**: glass, padding 36px, radius 28px. 3 paragraphs (15.5px / 1.7), then a row of 6 monospaced pills.
  - **Right (`.stat-grid`)**: 2×2 grid of stat cards, each glass, radius 18px, padding 22px. Number 36px Inter 800 (-0.03em), label 12.5px ink-soft.
    - 2.9y · in security & risk engineering
    - 15+ · LangChain / LangGraph experiments shipped
    - ∞ · cups of coffee debugging chains
    - 4 · core stacks: LangChain · LangGraph · RAG · Python

### 4. Skills (`#skills`)
- Heading: `"My"` muted + ` skills` ink. Eyebrow: `FRAMEWORKS, LANGUAGES, TOOLING.`
- **Tabs**: 3 segmented buttons — *AI / LLM* (active) · *Languages* · *Security & Ops*. Active = `#131416` bg + white. Inactive = white-glass + ink-soft. Border-radius 999px.
- **Card (`.skills-card`)**: glass, radius 28px, padding 56px.
  - Inside: 2-col grid `1.3fr / 0.8fr`.
  - **Left**: animated bars. Each row is `1fr auto`. Track 14px tall, `rgba(17,18,19,.04)`, radius 999px. Fill is a horizontal gradient `#c4d0ff → #d4c4ff → #ffd0c0 → #ffe7a8`, transitions width `1.2s cubic-bezier(.2,.7,.2,1)`. Label is JetBrains Mono 11px / .1em, min-width 90px, right-aligned.
  - **Right**: 36px right-aligned heading e.g. `Mastered / frameworks` + small mono caption beneath.
- **Animation**: bars start at width 0 and fill to their target % when the section enters the viewport (IntersectionObserver, threshold 0.2). Re-renders on tab change.
- **Skill data** (in `SKILLS` const at bottom of file):
  - **AI / LLM**: LangChain 95, LangGraph 88, RAG 92, Prompt Eng. 85, OpenAI/LLM API 82, Vector DBs 78, Agents 80
  - **Languages**: Python 92, SQL 75, Bash 70, YAML 80, JavaScript 60, Markdown 90
  - **Security & Ops**: NIST CSF v2.0 90, NIST 800-53 80, CrowdStrike 78, Eramba 82, SOPHOS 70, Phishing/SOC 75

### 5. Experience (`#experience`)
- Heading: `"Where"` muted + ` I worked`. Eyebrow: `2.9 YEARS · BLUE TEAM, GRC, AI ENGINEERING.`
- **Timeline**: vertical 2px gradient line (`#ffd6b3 → #c8b8ff → #b6d6ff` at 60% opacity), padding-left 32px on the container. Each item has a 16px circular node (`-33px` left), 3px ink border on white, with a 4px white halo via outer box-shadow. The current job adds `.current` → solid ink fill + pulsing ring (2s loop).
- **Each `.exp` card**: glass, radius 18px, padding 24px 28px. Hover: `translateX(4px)` + deeper shadow.
  - Header row: role (18px / 700) on left, JetBrains Mono uppercase date on right.
  - Sub: company · type · location, 14px ink-soft.
  - Bullets: custom dot marker (6px gradient circle, peach→lavender). 14px / 1.55 ink-soft, gap 6px.
  - Tags row: small mono pills (10.5px, 4px 10px).
- **Three entries** (in this order, top→bottom):
  1. **Cybersecurity Analyst Junior** — RHI Magnesita · Full-time · Remote — Feb 2025 → Present *(`.current`)*
  2. **Information Security Intern** — RHI Magnesita · Internship · Hybrid — Aug 2023 → Feb 2025
  3. **Firewall Engineering Intern** — LogicNet Tecnologia · Internship · Belo Horizonte — Apr 2023 → Jul 2023

### 6. Projects (`#projects`)
- Heading: `"Selected"` muted + ` projects`. Eyebrow: `AGENTS, RAG, AND APPLIED LLM SYSTEMS.`
- 2×2 grid, gap 24px.
- **Each `.proj` card**: glass, radius 28px, padding 32px, min-height 320px, flex column. Each card has its own gradient via inline `--proj-grad` CSS var.
  - `.proj-num` in top-right (e.g. `/ 01`) — JetBrains Mono 11px, ink-mute.
  - `.proj-visual`: 140px tall block at top, radius 18px, fills with the card's gradient, contains a small abstract SVG icon (60% size) drawn in `rgba(17,18,19,.85)`.
  - Title (22px / 700), description (14px / 1.6 ink-soft), tag row.
  - Hover: `translateY(-4px)` + larger shadow.
- **Projects** (current placeholders — Arthur should swap for real ones):
  1. **GRC Copilot** — peach→lavender — *LangGraph multi-agent mapping policies to NIST CSF v2.0, drafting evidence requests, exporting to Eramba.* Tags: LangGraph · RAG · NIST CSF.
  2. **HybridRAG Lab** — blue→purple — *Reproducible playground combining BM25 + dense + cross-encoder reranker with eval harnesses.* Tags: LangChain · FAISS · Reranking.
  3. **Phish-Eval Agent** — yellow→pink — *LLM-driven analyzer scoring phishing simulation outcomes, clustering failure patterns.* Tags: Python · LangChain · Clustering.
  4. **DocuChain** — purple→blue — *LangChain pipeline ingesting SOC 2 / ISO 27001 docs, extracting controls, citation-backed Q&A.* Tags: LangChain · Pydantic · PostgreSQL.

### 7. Contact (`#contact`)
- Heading: `"Get"` muted + ` in touch`. Eyebrow: `VIA EMAIL OR ON MY SOCIAL CHANNELS.`
- **`.mail-window`**: max-width 760px, centered, glass, radius 18px, big shadow. Mimics a macOS mail compose window.
  - **Title bar**: 14px 18px padding, bottom border. Left: 3 traffic-light dots (red `#ff5f57`, yellow `#febc2e`, green `#28c840`, 12px each). Center: "New message" (13px ink-soft).
  - **Field rows** (`80px / 1fr` grid): Email, Name, Subject — each with a label and a borderless input. Light bottom borders between rows.
  - **Body**: 26px padding, 180px min-height, borderless `<textarea>` 14px placeholder.
  - **Footer**: right-aligned dark "Send" button (12px 28px, radius 12px).
  - On submit: `event.preventDefault()` + alert (placeholder; wire to backend or Formspree).
- **Social row below**: centered, gap 22px — LinkedIn, GitHub, X, Mail icons (~22px) plus a dark pill displaying `arthur.chequer@gmail.com` in JetBrains Mono.

### 8. Footer
- 60px 24px / 80px padding, top border, soft gradient bloom in bottom-right.
- 3-column grid `1fr / auto / auto`, gap 80px.
  - **Col 1**: huge `[acq]` wordmark, JetBrains Mono 700, 84px.
  - **Col 2** (`links`): About, Skills, Experience, Projects, Contact.
  - **Col 3** (`networks`): LinkedIn, GitHub, X, Threads, Mail.
- **Bottom strip**: top border, JetBrains Mono 12.5px ink-mute. Left: `© 2026 ARTHUR CHEQUER · MADE WITH LANGCHAIN & CAFFEINE`. Right: `v1.0 · BUILT IN HTML`.

## Interactions & Behavior

- **Smooth scroll** on all anchor links: 30px offset above target, native `window.scrollTo({behavior:'smooth'})`.
- **Skill bars**: width 0 → target % on first viewport intersection (threshold 0.2). On tab switch: re-render markup, then animate via `requestAnimationFrame`.
- **Tab switching**: clicking a tab updates `.active`, swaps title/subtitle, re-renders bars.
- **Hover micro-interactions**:
  - Nav links: animated underline (scaleX 0→1, 250ms).
  - Buttons: `translateY(-1px)` + deeper shadow.
  - Experience cards: `translateX(4px)`.
  - Project cards: `translateY(-4px)` + bigger shadow.
  - Social icons: `translateY(-2px)` + color → ink.
- **Current-job pulse**: 2s ease-in-out infinite, halo box-shadow pulses 0 → 8px transparent.
- **Background bloom rings**: rotating animation `40s linear infinite` on the AI orb (and reversed `28s` on the inner ring).
- **Form submit**: `preventDefault()` + alert. Hook this to your backend (Formspree, Resend, custom API).

## State Management
For a React/Next port, minimum needed:

- `activeSkillTab: 'ai' | 'lang' | 'sec'` — drives bar set + heading + active tab styling.
- `barsAnimated: boolean` — flips `true` once the skills section enters the viewport (use `useInView` from Framer Motion or IntersectionObserver). Triggers width animation.
- `contactForm: { email, name, subject, body }` — controlled inputs.
- `submitting / submitted: boolean` — UX states for the send button.

No data fetching is needed for v1. Skill levels and project data are static — keep them in a `data.ts` module for easy edits.

## Design Tokens

### Colors
| Token | Value | Use |
|---|---|---|
| `--bg` | `#f3f3f4` | Page background |
| `--ink` | `#111213` | Headings, primary text, primary button bg |
| `--ink-soft` | `#4b4f55` | Body copy |
| `--ink-mute` | `#8b9098` | Muted captions, eyebrows, "soft" heading half |
| `--line` | `rgba(17,18,19,.08)` | All hairline dividers |
| `--card` | `rgba(255,255,255,.55)` | Default glass card bg |
| `--card-strong` | `rgba(255,255,255,.75)` | Skills card / mail window bg |

**Gradient palette** (used in bloom, project cards, skill bar fill):
- Peach `#ffd6b3`, `#ffd0c0`, `#ffe7a8`
- Lavender `#c8b8ff`, `#d4c4ff`, `#c4b8ff`, `#c4d0ff`
- Light blue `#b6d6ff`
- Pink `#ffd6e0`

**Traffic-light dots**: red `#ff5f57`, yellow `#febc2e`, green `#28c840`.

### Typography
- **Body / UI**: Inter (300, 400, 500, 600, 700, 800).
- **Mono**: JetBrains Mono (400, 600, 700) — wordmark, eyebrows, dates, pills, footer copyright, labels on skill bars.
- **Letter-spacing**: −0.04em on hero H1, −0.035em on section H2, −0.03em on stat numbers, −0.02em on project titles. JetBrains Mono uppercase eyebrows use +0.14em.
- **Sizes**: see per-section detail above.
- **`text-rendering: optimizeLegibility`** + `-webkit-font-smoothing: antialiased`.

### Spacing & Radius
- Section vertical padding: `100px` (mobile `70px`).
- Section side padding: `24px` (mobile `20px`).
- Max content width: `1200px`.
- Radius scale: `--radius-sm: 10px`, `--radius-md: 18px`, `--radius-lg: 28px`. Pills use `999px`.

### Shadows
- `--shadow-sm`: `0 1px 2px rgba(17,18,19,.04), 0 4px 12px rgba(17,18,19,.04)`
- `--shadow-md`: `0 8px 24px rgba(17,18,19,.06), 0 2px 6px rgba(17,18,19,.04)`
- `--shadow-lg`: `0 24px 60px rgba(17,18,19,.10), 0 4px 12px rgba(17,18,19,.05)`
- Primary button shadow: `0 8px 22px rgba(17,18,19,.18)` → hover `0 12px 28px rgba(17,18,19,.24)`.

### Glassmorphism formula
```
background: rgba(255,255,255,.55);              /* or .75 for stronger */
backdrop-filter: blur(18px) saturate(140%);
-webkit-backdrop-filter: blur(18px) saturate(140%);
border: 1px solid rgba(255,255,255,.6);
border-radius: 18px;                            /* or 28px */
box-shadow: var(--shadow-md);
```

### Background bloom
Two fixed full-viewport pseudo-elements with `filter: blur(80–90px)` and `opacity: .35–.65`, layered radial gradients in peach + lavender + light-blue. Plus per-section `.bloom-2` accent blobs (about + projects). Sits behind `main` (`z-index: 0`), main has `z-index: 1`.

## Assets

- **No external images.** All imagery is **inline SVG** (the AI orb, the four project icons, social icons, action icons).
- **Fonts**: Google Fonts (`Inter`, `JetBrains Mono`).
- The reference's memoji has been intentionally replaced with an abstract neural-network SVG orb. If Arthur prefers a real photo or memoji, swap the `.ai-orb` SVG for an `<img>` of equal max size.

## Responsive
At max-width 880px the layout collapses:
- Hero, About, Skills, Projects all become single-column.
- Nav links hide (mobile menu not yet built — add a hamburger).
- Skills card padding shrinks to 32px 24px; right-aligned heading flips left.
- Footer becomes a 2-column grid; the big `[acq]` wordmark spans both columns at 64px.
- Section padding shrinks to 70px 20px.

A real implementation should also add proper mobile nav and tighten the hero's right column (orb shrinks/centers).

## Recommended Tech Stack (if greenfield)
- **Next.js 14** (App Router) — server components for the static parts, a single client component for the skills tabs + bar animation.
- **Tailwind CSS** — port tokens above to `tailwind.config.ts` (`colors.ink`, `colors.ink-soft`, etc.). Use `backdrop-blur-xl` + `bg-white/55` for glass.
- **Framer Motion** — replace the IntersectionObserver/raf logic with `useInView` + `motion.div` `whileInView` for the bars, and `whileHover` for cards.
- **Resend or Formspree** — wire the contact form.
- **Vercel** — deploy.

## Files

- `portfolio_design.html` — the full prototype (the source-of-truth design). All CSS is inline in `<style>`; all behavior is inline in `<script>` at the bottom (skills data, tab handler, IntersectionObserver, smooth scroll, form handler).

The HTML has clear section comments (`<!-- ===== HERO ===== -->`, etc.) — search for these to map prototype regions to your codebase components.
