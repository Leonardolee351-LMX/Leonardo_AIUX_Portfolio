# Art Portfolio Gallery Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a standalone “Art / 艺术作品” section with an index page and 4 project gallery pages, sourced from `docs/files/数媒方向作品集.pdf`, and accessible from the global top navigation.

**Architecture:** Static HTML pages under `docs/art/` + copied PNG page renders under `docs/img/art/portfolio/*`. Reuse existing `docs/site.css` and `docs/site.js` for theme toggle, mobile menu, and image click-to-preview overlay (extended to work on `/art/` routes).

**Tech Stack:** Plain HTML/CSS/JS (existing `docs/site.css`, `docs/site.js`)

---

## File Structure (locked)

**Create**
- `e:/Leonardo_AIUX_Portfolio/docs/art/index.html`
- `e:/Leonardo_AIUX_Portfolio/docs/art/looming-dreamer.html`
- `e:/Leonardo_AIUX_Portfolio/docs/art/luminous-and-silhouette.html`
- `e:/Leonardo_AIUX_Portfolio/docs/art/fingertip-praying.html`
- `e:/Leonardo_AIUX_Portfolio/docs/art/surreal-wanderer.html`
- `e:/Leonardo_AIUX_Portfolio/docs/art/art.css`

**Create (assets)**
- `e:/Leonardo_AIUX_Portfolio/docs/img/art/portfolio/looming-dreamer/` (page_03.png–page_08.png)
- `e:/Leonardo_AIUX_Portfolio/docs/img/art/portfolio/luminous-and-silhouette/` (page_09.png–page_14.png)
- `e:/Leonardo_AIUX_Portfolio/docs/img/art/portfolio/fingertip-praying/` (page_15.png–page_20.png)
- `e:/Leonardo_AIUX_Portfolio/docs/img/art/portfolio/surreal-wanderer/` (page_21.png–page_26.png)

**Modify**
- `e:/Leonardo_AIUX_Portfolio/docs/site.js` (enable image preview on `/art/`)
- `e:/Leonardo_AIUX_Portfolio/docs/index.html` (add Art link in top nav)
- `e:/Leonardo_AIUX_Portfolio/docs/works.html` (add Art link in desktop + mobile nav)
- `e:/Leonardo_AIUX_Portfolio/docs/resume.html` (add Art link in desktop + mobile nav)
- `e:/Leonardo_AIUX_Portfolio/docs/about.html` (add Art link in desktop + mobile nav)
- `e:/Leonardo_AIUX_Portfolio/docs/cases/*.html` (add Art link in topbar + mobile nav, keep cases pages consistent)

---

### Task 1: Create `docs/art/` pages (HTML + CSS)

**Files:**
- Create: `e:/Leonardo_AIUX_Portfolio/docs/art/art.css`
- Create: `e:/Leonardo_AIUX_Portfolio/docs/art/index.html`
- Create: `e:/Leonardo_AIUX_Portfolio/docs/art/looming-dreamer.html`
- Create: `e:/Leonardo_AIUX_Portfolio/docs/art/luminous-and-silhouette.html`
- Create: `e:/Leonardo_AIUX_Portfolio/docs/art/fingertip-praying.html`
- Create: `e:/Leonardo_AIUX_Portfolio/docs/art/surreal-wanderer.html`

- [ ] **Step 1: Implement `art.css`**

```css
:root {
  --art-max: 1120px;
  --art-hero: linear-gradient(135deg, #141e30, #243b55);
}

.art-shell {
  max-width: var(--art-max);
  margin: 0 auto;
  padding: 96px 24px 96px;
}

.art-hero {
  border: 1px solid var(--border);
  background: var(--art-hero);
  border-radius: 18px;
  padding: 28px 26px;
  overflow: hidden;
}

.art-hero h1 {
  font-size: clamp(34px, 4.6vw, 54px);
  letter-spacing: -0.02em;
  margin: 0;
  color: #fff;
}

.art-hero p {
  margin: 10px 0 0;
  max-width: 72ch;
  color: rgba(255, 255, 255, 0.74);
}

.art-grid {
  margin-top: 18px;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.art-card {
  display: block;
  text-decoration: none;
  color: inherit;
  border: 1px solid var(--border);
  border-radius: 16px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.02);
  transition: transform 0.25s ease, border-color 0.25s ease, background 0.25s ease;
}

.art-card:hover {
  transform: translateY(-2px);
  border-color: rgba(255, 255, 255, 0.16);
  background: rgba(255, 255, 255, 0.03);
}

.art-card__thumb {
  aspect-ratio: 16 / 9;
  width: 100%;
  display: block;
  object-fit: cover;
}

.art-card__body {
  padding: 14px 14px 16px;
}

.art-kicker {
  font-size: 12px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--text-muted);
}

.art-title {
  margin: 6px 0 0;
  font-size: 18px;
  letter-spacing: -0.01em;
}

.art-sub {
  margin: 8px 0 0;
  color: var(--text-dim);
  font-size: 13px;
  line-height: 1.6;
}

.art-page-hero {
  border: 1px solid var(--border);
  border-radius: 18px;
  padding: 22px 20px;
  background: rgba(255, 255, 255, 0.02);
}

.art-page-hero .art-kicker {
  margin-bottom: 10px;
}

.art-page-hero h1 {
  margin: 0;
  font-size: clamp(30px, 4.2vw, 46px);
  letter-spacing: -0.02em;
}

.art-page-hero .art-sub {
  margin-top: 10px;
  font-size: 14px;
}

.art-gallery {
  margin-top: 18px;
  display: grid;
  grid-template-columns: 1fr;
  gap: 14px;
}

.art-gallery img {
  width: 100%;
  height: auto;
  display: block;
  border-radius: 14px;
  border: 1px solid var(--border);
  background: rgba(255, 255, 255, 0.02);
}

.art-foot {
  margin-top: 22px;
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  align-items: center;
}

.art-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  border-radius: 12px;
  border: 1px solid var(--border);
  background: rgba(255, 255, 255, 0.02);
  color: var(--text);
  text-decoration: none;
  font-size: 13px;
}

.art-btn:hover {
  border-color: rgba(255, 255, 255, 0.16);
  background: rgba(255, 255, 255, 0.03);
}

@media (max-width: 860px) {
  .art-grid {
    grid-template-columns: 1fr;
  }
}
```

- [ ] **Step 2: Implement Art index page with 4 cards**

Content requirements:
- Use `../site.css` + `../site.js`
- Add topbar with `Home / Work / Art / Resume / About` and mark `Art` as active
- Link each card to its project page
- Use page renders as thumbnails:
  - Looming Dreamer: `../img/art/portfolio/looming-dreamer/page_03.png`
  - Luminous & Silhouette: `../img/art/portfolio/luminous-and-silhouette/page_09.png`
  - FingerTip praying: `../img/art/portfolio/fingertip-praying/page_15.png`
  - Surreal Wanderer: `../img/art/portfolio/surreal-wanderer/page_21.png`

- [ ] **Step 3: Implement each project page as a vertical image gallery**

Content requirements:
- Use `../site.css` + `../site.js` + `./art.css`
- Topbar with `Art` active
- A short statement block
- A gallery list with `<img loading="lazy" decoding="async">` in order
- Bottom buttons:
  - Back to Art index
  - Open original PDF (`../files/数媒方向作品集.pdf`)

---

### Task 2: Copy PDF-rendered PNGs into `docs/img/art/portfolio/`

**Files:**
- Create: `e:/Leonardo_AIUX_Portfolio/docs/img/art/portfolio/**` (directories + png files)

- [ ] **Step 1: Create destination directories**

Run (PowerShell):

```powershell
New-Item -ItemType Directory -Force e:\Leonardo_AIUX_Portfolio\docs\img\art\portfolio\looming-dreamer | Out-Null
New-Item -ItemType Directory -Force e:\Leonardo_AIUX_Portfolio\docs\img\art\portfolio\luminous-and-silhouette | Out-Null
New-Item -ItemType Directory -Force e:\Leonardo_AIUX_Portfolio\docs\img\art\portfolio\fingertip-praying | Out-Null
New-Item -ItemType Directory -Force e:\Leonardo_AIUX_Portfolio\docs\img\art\portfolio\surreal-wanderer | Out-Null
```

- [ ] **Step 2: Copy the required page PNGs**

Source directory:
- `e:/Leonardo_AIUX_Portfolio/temp_portfolio_renders/`

Copy ranges:
- Looming Dreamer: `page_03.png`–`page_08.png`
- Luminous & Silhouette: `page_09.png`–`page_14.png`
- FingerTip praying: `page_15.png`–`page_20.png`
- Surreal Wanderer: `page_21.png`–`page_26.png`

Run (Python one-off to avoid manual copy mistakes):

```python
from pathlib import Path
import shutil

root = Path(r"e:\Leonardo_AIUX_Portfolio")
src = root / "temp_portfolio_renders"
dst_root = root / r"docs\img\art\portfolio"

def cp_range(start, end, dst_dir):
    dst_dir.mkdir(parents=True, exist_ok=True)
    for i in range(start, end + 1):
        name = f"page_{i:02d}.png"
        shutil.copy2(src / name, dst_dir / name)

cp_range(3, 8, dst_root / "looming-dreamer")
cp_range(9, 14, dst_root / "luminous-and-silhouette")
cp_range(15, 20, dst_root / "fingertip-praying")
cp_range(21, 26, dst_root / "surreal-wanderer")
```

---

### Task 3: Enable click-to-preview overlay on `/art/` routes

**Files:**
- Modify: `e:/Leonardo_AIUX_Portfolio/docs/site.js`

- [ ] **Step 1: Update route guard**

Change:
- from: only `pathname.includes('/cases/')`
- to: allow `pathname.includes('/cases/') || pathname.includes('/art/')`

- [ ] **Step 2: Ensure the selector works on Art pages**

Requirement:
- Art pages should include a container with class `.main` (or adjust selector to also accept `.art-shell`).

---

### Task 4: Add “Art” entry into global navigation

**Files:**
- Modify: `e:/Leonardo_AIUX_Portfolio/docs/index.html`
- Modify: `e:/Leonardo_AIUX_Portfolio/docs/works.html`
- Modify: `e:/Leonardo_AIUX_Portfolio/docs/resume.html`
- Modify: `e:/Leonardo_AIUX_Portfolio/docs/about.html`
- Modify: `e:/Leonardo_AIUX_Portfolio/docs/cases/*.html`

- [ ] **Step 1: Add `Art` link (desktop)**

Rules:
- Link target:
  - from root pages: `./art/index.html`
  - from cases pages: `../art/index.html`
- Active state:
  - On art pages: mark Art as `.active`

- [ ] **Step 2: Add `Art` link to mobile menu**

Ensure the mobile menu list mirrors the desktop links.

---

### Task 5: Manual verification

- [ ] **Step 1: Start a local static server**

Run:

```powershell
cd e:\Leonardo_AIUX_Portfolio
python -m http.server 8000
```

- [ ] **Step 2: Verify routes**

Open:
- `http://localhost:8000/docs/art/index.html`
- Each project page and confirm images load
- Click any image and confirm overlay preview works
- Confirm top nav shows `Art` on: Home, Works, Resume, About, any Case page

---

## Plan Self-Review

- Coverage: Includes standalone art pages, asset placement, image preview interaction, and global navigation entry.
- No placeholders: All file paths, copy ranges, and exact route changes specified.
- Consistency: Slugs used consistently across pages, directories, and links.

