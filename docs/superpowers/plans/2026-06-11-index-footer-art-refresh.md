# Index Footer Art Refresh Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refine the new default homepage and art landing page to simplify CTAs, remove redundant footer navigation, and upgrade the art page hero material/background.

**Architecture:** Keep the new homepage as the default app entry, make targeted section-level edits in the React homepage, and restyle the static `docs/art` page with a glass headline block plus black point-cloud background. Avoid changing information architecture beyond the approved CTA/footer simplifications.

**Tech Stack:** Vite, React, Tailwind utility classes, static HTML/CSS in `docs/art`

---

### Task 1: Simplify homepage hero and about actions

**Files:**
- Modify: `e:\Leonardo_AIUX_Portfolio\My Previous Work\Kimi_Agent_首页动效分析\Kimi_Agent_首页动效分析\app\src\sections\v3\HeroSection3.tsx`
- Modify: `e:\Leonardo_AIUX_Portfolio\My Previous Work\Kimi_Agent_首页动效分析\Kimi_Agent_首页动效分析\app\src\sections\v3\AboutSection3.tsx`

- [ ] Replace hero CTA row with three buttons: `查看项目`, `查阅简历`, `艺术创想`.
- [ ] Point `艺术创想` to `/docs/art/index.html`.
- [ ] Remove the duplicate `Say Hello` button from About while keeping `了解更多`.

### Task 2: Simplify homepage footer

**Files:**
- Modify: `e:\Leonardo_AIUX_Portfolio\My Previous Work\Kimi_Agent_首页动效分析\Kimi_Agent_首页动效分析\app\src\sections\v3\FooterSection3.tsx`

- [ ] Remove the footer page-link row (`Work / Art / Resume / About / Email`).
- [ ] Keep only one large `Say Hello` button, copyright text, logo, and social links.

### Task 3: Upgrade art landing hero visual

**Files:**
- Modify: `e:\Leonardo_AIUX_Portfolio\docs\art\art.css`

- [ ] Replace orb background treatment with a black point-cloud style background.
- [ ] Restyle `.art-hero` to a translucent liquid-glass material.
- [ ] Keep existing art grid/card structure intact.

### Task 4: Verify

**Files:**
- Modify: none

- [ ] Run `npm run build` in the app project and confirm success.
- [ ] Open the default homepage and `docs/art/index.html` in browser preview and visually verify the approved changes.
