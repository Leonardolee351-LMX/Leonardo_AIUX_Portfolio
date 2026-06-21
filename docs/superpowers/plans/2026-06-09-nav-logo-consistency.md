# Navigation & Logo Consistency Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Unify all site navbars to match the homepage, use one shared SVG logo with dark/light fills, add the same logo to the homepage Hero, and ensure desktop/mobile readability stays smooth.

**Architecture:** Keep the existing static HTML structure, but align all pages to one shared navigation contract: same DOM shape, same links, same brand markup, same mobile behavior, and shared logo rules in common CSS. Patch page-specific CSS only where needed so the homepage remains the visual source of truth.

**Tech Stack:** Static HTML, CSS, existing `site.css`, existing `site.js`

---

### Task 1: Normalize shared logo styles

**Files:**
- Modify: `e:/Leonardo_AIUX_Portfolio/docs/site.css`
- Modify: `e:/Leonardo_AIUX_Portfolio/docs/index.css`

- [ ] Define one shared `.brand-mark` size, mask source, dark/light fill colors, and subtle hover scale.
- [ ] Make `.unified-brand` use the same click target sizing everywhere.
- [ ] Ensure homepage brand rules match the same dimensions rather than its previous custom image mask.

### Task 2: Align all navbars to homepage contract

**Files:**
- Modify: `e:/Leonardo_AIUX_Portfolio/docs/index.html`
- Modify: `e:/Leonardo_AIUX_Portfolio/docs/works.html`
- Modify: `e:/Leonardo_AIUX_Portfolio/docs/resume.html`
- Modify: `e:/Leonardo_AIUX_Portfolio/docs/about.html`
- Modify: `e:/Leonardo_AIUX_Portfolio/docs/art/index.html`
- Modify: `e:/Leonardo_AIUX_Portfolio/docs/art/looming-dreamer.html`
- Modify: `e:/Leonardo_AIUX_Portfolio/docs/art/luminous-and-silhouette.html`
- Modify: `e:/Leonardo_AIUX_Portfolio/docs/art/fingertip-praying.html`
- Modify: `e:/Leonardo_AIUX_Portfolio/docs/art/surreal-wanderer.html`
- Modify: `e:/Leonardo_AIUX_Portfolio/docs/cases/Anxious-Kit.html`
- Modify: `e:/Leonardo_AIUX_Portfolio/docs/cases/CO-EVO.html`
- Modify: `e:/Leonardo_AIUX_Portfolio/docs/cases/Jiancareer.html`
- Modify: `e:/Leonardo_AIUX_Portfolio/docs/cases/Leke.html`
- Modify: `e:/Leonardo_AIUX_Portfolio/docs/cases/MemoryLens.html`
- Modify: `e:/Leonardo_AIUX_Portfolio/docs/cases/Stariver.html`
- Modify: `e:/Leonardo_AIUX_Portfolio/docs/cases/StoryVibe.html`
- Modify: `e:/Leonardo_AIUX_Portfolio/docs/cases/Toys.html`
- Modify: `e:/Leonardo_AIUX_Portfolio/docs/cases/Twin-City-Tale.html`

- [ ] Make the left brand markup identical everywhere: brand link + `brand-mark` span + `aria-label`.
- [ ] Ensure nav links appear in the same order everywhere: `Home / Work / Art / Resume / About`.
- [ ] Keep background transparent across all pages, matching homepage intent.

### Task 3: Add homepage Hero logo

**Files:**
- Modify: `e:/Leonardo_AIUX_Portfolio/docs/index.html`
- Modify: `e:/Leonardo_AIUX_Portfolio/docs/index.css`

- [ ] Add a Hero logo block above the homepage title using the same SVG source.
- [ ] Make the Hero logo larger than the navbar logo, but still visually light.
- [ ] Ensure it scales cleanly on mobile.

### Task 4: Improve mobile readability

**Files:**
- Modify: `e:/Leonardo_AIUX_Portfolio/docs/site.css`
- Modify: `e:/Leonardo_AIUX_Portfolio/docs/art/art.css`
- Modify: page-specific CSS only if a page still breaks under small widths

- [ ] Keep navbar controls touch-friendly on small screens.
- [ ] Ensure transparent nav does not visually collide with top content.
- [ ] Verify art galleries and case pages do not overflow horizontally.

### Task 5: Verify locally

**Files:**
- Test: local browser preview only

- [ ] Run a local static server from `e:/Leonardo_AIUX_Portfolio`.
- [ ] Check `docs/index.html`, `docs/works.html`, `docs/about.html`, one `docs/cases/*.html`, and one `docs/art/*.html`.
- [ ] Confirm same navbar height, same brand size, same links, Hero logo exists on homepage, and mobile menu remains usable.

