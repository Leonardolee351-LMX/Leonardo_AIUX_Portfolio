# Docs Home Nav Unification Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the new homepage the only GitHub Pages entry by publishing it into `docs`, while unifying all `docs` navigation and Home links to that entry.

**Architecture:** Keep the React homepage in `app` as the source of truth, publish its build output directly into `docs`, and use `docs/site.css` plus `docs/site.js` as the shared navigation layer for all static pages. Avoid rewriting every individual `docs` page unless shared overrides cannot cover it.

**Tech Stack:** Vite, React build output, static HTML/CSS/JS in `docs`

---

### Task 1: Publish new homepage into docs

**Files:**
- Modify: `e:\Leonardo_AIUX_Portfolio\My Previous Work\Kimi_Agent_首页动效分析\Kimi_Agent_首页动效分析\app\vite.config.ts`
- Modify by command: `e:\Leonardo_AIUX_Portfolio\docs\index.html`

- [ ] Reconfigure Vite build output to target `docs` without clearing the whole folder.
- [ ] Keep `index` as the only published homepage output in `docs`.
- [ ] Backup the current static `docs/index.html` before publishing the new homepage over it.

### Task 2: Unify docs navigation style

**Files:**
- Modify: `e:\Leonardo_AIUX_Portfolio\docs\site.css`

- [ ] Restyle shared `.unified-topbar` to match the new homepage fixed-top look.
- [ ] Align logo, nav link spacing, hover states, and mobile controls with the new homepage.
- [ ] Keep the shared CSS strong enough to override page-local nav variations.

### Task 3: Unify docs navigation links

**Files:**
- Modify: `e:\Leonardo_AIUX_Portfolio\docs\site.js`

- [ ] Normalize Home/Work/Art/Resume/About hrefs for root pages and subdirectory pages.
- [ ] Update brand-logo links and mobile-menu links using one shared mapping rule.

### Task 4: Verify published docs entry and shared nav

**Files:**
- Modify: none

- [ ] Run the app build and confirm output lands in `docs`.
- [ ] Open `docs/index.html` and at least one `docs/cases/*` page to verify Home points to the new homepage and nav styles are unified.
