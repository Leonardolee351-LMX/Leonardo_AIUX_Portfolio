---
name: scrollfolio-designer
description: Create premium scroll-based narrative portfolio websites for designers using GSAP, React, and creative programming. Trigger when the user requests a designer portfolio, creative portfolio, scroll-driven storytelling website, GSAP animation showcase, or any visually-driven personal branding site with scroll narratives. Covers full workflow from concept to deployment including visual design, UX patterns, animation choreography, and performance optimization.
---

# Scrollfolio Designer

Build cinematic, scroll-driven portfolio experiences that merge editorial storytelling with creative coding. Every project should feel like a curated exhibition — not a template.

## Core Principles

1. **Scroll as narrative device** — The scroll is the story's timeline, not just navigation.
2. **Restraint creates impact** — One bold gesture per section beats ten subtle ones.
3. **Motion serves meaning** — Every animation must communicate, never decorate.
4. **Performance is aesthetic** — 60fps is a design requirement, not an engineering one.
5. **Mobile is primary** — Design for touch-scroll first, enhance for desktop.

## Tech Stack

- React 18+ with TypeScript
- GSAP 3.x + ScrollTrigger (primary animation engine)
- Lenis (smooth scroll — mandatory)
- Vite (build tool)
- Tailwind CSS (utility styling)
- shadcn/ui (components when needed, heavily customized)

## Workflow

### Phase 1: Discovery & Concept

1. Read user's portfolio content (projects, bio, style preferences)
2. Define the narrative arc: **Hook → Credibility → Work → Personality → Contact**
3. Choose a visual thesis — one governing aesthetic concept (e.g., "spatial depth", "typographic deconstruction", "organic flow")
4. Select 2-3 signature animation techniques from `references/gsap-patterns.md`
5. Define the scroll rhythm: pacing map of section transitions

### Phase 2: Structure & UX

Read `references/scroll-narrative-ux.md` for detailed patterns.

Key decisions:
- **Scroll mode**: Pin-and-reveal vs. Flowing vs. Hybrid
- **Navigation pattern**: Hidden progress indicator vs. Minimal anchor menu vs. Gesture-only
- **Section count**: 4-6 sections optimal; each section is a "chapter"
- **Breakpoints**: Mobile (touch), Tablet, Desktop (mouse + smooth scroll)

Create the section architecture:
```
Hero (pin: 100vh) → About (flow) → Selected Work (pin-hybrid) → Process (flow) → Contact (pin: 100vh)
```

### Phase 3: Visual Design System

Read `references/visual-design-principles.md` for detailed guidance.

Establish:
1. **Color system**: 1 dominant + 1 accent + neutrals; often monochrome with a single vivid accent for designers
2. **Typography**: Display font (impact) + Body font (legibility); max 2 families
3. **Spacing rhythm**: Generous whitespace; sections breathe
4. **Texture**: Grain, noise, or subtle pattern for depth
5. **Motion language**: Easing curves, duration scale, stagger patterns

### Phase 4: Component Architecture

Read `references/react-creative-patterns.md` for implementation patterns.

Structure:
```
src/
  sections/           — One component per major section
  components/
    ui/              — shadcn/ui base (minimal)
    canvas/          — Canvas/WebGL effects
    text/            — Animated text components
    layout/          — Navigation, transitions
  hooks/
    useScrollProgress.ts
    useGsapContext.ts
    useReducedMotion.ts
  lib/
    gsap.ts          — GSAP plugin registration
    utils.ts
```

### Phase 5: Animation Implementation

1. Register GSAP plugins: `gsap.registerPlugin(ScrollTrigger, SplitText)`
2. Build section animations in isolation with `ScrollTrigger.create()`
3. Connect global timeline last
4. Test with `scrub: true` for bidirectional playback
5. Add `onLeave` / `onEnterBack` callbacks for section state changes

Critical patterns:
- Use `fromTo()` always — explicit states prevent reverse-play glitches
- Pin sections with `pin: true` and calculated `end` values
- Batch DOM reads; never read `offsetHeight` in scroll callbacks
- Use `will-change: transform` on animated elements

### Phase 6: Polish & Performance

1. Audit with Lighthouse — target 90+ performance
2. Test on actual mobile devices (not just DevTools)
3. Verify `prefers-reduced-motion` handling
4. Lazy-load below-fold sections with dynamic imports
5. Preload critical assets; use `loading="lazy"` for images

## Section Recipes

### Hero — The Hook

**Goal**: Arrest attention in 2 seconds.

**Patterns**:
- Kinetic typography — words assemble from chaos or deconstruct
- Full-viewport canvas effect — particles, fluid simulation, or shader
- Layered depth — foreground text over parallax imagery
- Signature moment — one impossible-seeming animation

**Must have**: The user's name or brand mark, clear role statement, scroll cue.

### About — Credibility

**Goal**: Establish trust and expertise without a resume dump.

**Patterns**:
- Split-screen: portrait + manifesto text with scroll-driven reveal
- Number counters: years, projects, clients with scrubbed counting
- Horizontal scroll gallery: press mentions or testimonials

**Must have**: Photo or avatar, concise bio (3-4 sentences max), key stats.

### Selected Work — The Proof

**Goal**: Show process and outcome, not just screenshots.

**Patterns**:
- Case study cards: image + context + role, expanding on hover/scroll
- Horizontal scroll: projects scroll sideways as user scrolls down
- Parallax layers: device mockups floating over background textures
- Transition previews: video clips playing on scroll

**Must have**: Project title, category, thumbnail, link to detail or external.

### Process — The Personality

**Goal**: Reveal how they think, not just what they make.

**Patterns**:
- Step-by-step scroll reveal: methodology phases
- Interactive diagram: connected nodes or flow
- Quote highlights: large pull-quotes with typographic treatment

**Must have**: 3-4 process steps, personal philosophy, tools/tech stack.

### Contact — The Close

**Goal**: Make reaching out feel inevitable.

**Patterns**:
- Full-screen CTA: massive "Let's work together" text
- Magnetic button: CTA follows cursor with elastic physics
- Minimal form: name, email, message — nothing else

**Must have**: Email, social links, one clear CTA.

## Critical Anti-Patterns

- **No scroll hijacking** — Lenis smooth scroll only, never disable native scroll
- **No loading screens > 3s** — Stream assets progressively
- **No auto-playing audio** — Sound only on explicit interaction
- **No animation without purpose** — Every motion communicates hierarchy or state
- **No desktop-only effects** — Mobile gets full experience, adapted

## Asset Generation

When generating images for the portfolio:
- Use 16:9 or 4:3 for project thumbnails
- Use 1:1 for profile/avatar images
- Use 21:9 for hero backgrounds (crop-safe)
- Prefer high-contrast, editorial photography style
- Generate mockup frames separately from content images

## Deployment

1. Build with `vite build`
2. Verify all ScrollTrigger calculations work at all viewport sizes
3. Deploy as static site (Vercel/Netlify preferred)
4. Set proper Open Graph meta tags for social sharing
5. Ensure contact form has endpoint (Formspree, Getform, or backend)
