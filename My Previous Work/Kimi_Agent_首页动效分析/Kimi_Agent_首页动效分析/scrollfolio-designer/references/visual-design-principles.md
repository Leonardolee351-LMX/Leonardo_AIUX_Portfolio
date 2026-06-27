# Visual Design Principles for Designer Portfolios

## Table of Contents
1. [Color Systems](#color-systems)
2. [Typography](#typography)
3. [Spacing & Composition](#spacing--composition)
4. [Texture & Depth](#texture--depth)
5. [Motion Language](#motion-language)
6. [Aesthetic References](#aesthetic-references)

---

## Color Systems

### Monochrome + Accent (Recommended for Designers)

A near-monochrome base with one vivid accent creates sophistication and focus.

```
Background:  #0A0A0A (near-black) or #F5F5F0 (warm white)
Surface:     #141414 or #FFFFFF
Text:        #FFFFFF or #0A0A0A
Muted text:  rgba(255,255,255,0.5) or rgba(0,0,0,0.4)
Accent:      #FF3B5C (coral) or #00D4AA (mint) or #FFB800 (amber)
```

Rules:
- Accent color covers < 10% of viewport at any time
- Never use accent for body text
- Accent indicates: CTAs, active states, key numbers, hover highlights

### Dark Mode Default

Designer portfolios overwhelmingly benefit from dark backgrounds:
- Images and work samples pop
- Screen-like feel (digital-native context)
- Cinematic quality for scroll animations
- Reduced eye strain for immersive browsing

Light sections as intentional contrast moments:
- About section (personal, approachable)
- Process section (clarity, methodology)

### Gradient Usage

Use gradients sparingly and purposefully:

```css
/* Subtle depth — used on backgrounds only */
background: linear-gradient(180deg, 
  rgba(10,10,10,0) 0%, 
  rgba(10,10,10,0.8) 100%
);

/* Accent glow — used for hover states only */
background: radial-gradient(circle at center, 
  rgba(255,59,92,0.15) 0%, 
  transparent 70%
);
```

Never: multi-color gradients, rainbow effects, gradient text (unless extremely subtle).

---

## Typography

### Font Pairing Strategy

Maximum two type families. Three creates fragmentation.

**Option A: Geometric + Grotesque (Modern, clean)**
- Display: Space Grotesk, Clash Display, or PP Neue Montreal
- Body: Inter, Suisse Intl, or Graphik

**Option B: Serif + Sans (Editorial, sophisticated)**
- Display: Instrument Serif, Playfair Display, or Cormorant
- Body: Inter, DM Sans, or Suisse Intl

**Option C: Monospace accent (Technical, precise)**
- Display: JetBrains Mono, IBM Plex Mono (uppercase, tracked)
- Body: Inter or DM Sans

### Type Scale

Use a modular scale (ratio: 1.25 for subtle, 1.5 for dramatic).

```
12px  — Captions, labels, metadata
14px  — Small body, secondary text
16px  — Body text (minimum for readability)
20px  — Lead paragraph, large body
24px  — Subsection headings
32px  — Section labels
48px  — Major headings
64px  — Display text (mobile hero)
96px  — Hero display (desktop)
128px+ — Monumental (impact moments)
```

### Typographic Treatments

**Kinetic headlines:**
- Tight tracking (-0.02em to -0.04em) on large text
- Uppercase for labels and navigation only
- Mixed weight within headlines for rhythm

```
Example: "Selected Work" 
→ "Selected" at 400 weight + "Work" at 700 weight
→ Creates visual rhythm without extra elements
```

**Pull quotes:**
```
Font: Serif if body is sans, or vice versa
Size: 24-32px
Style: Italic, generous line-height (1.6)
Decoration: Left border 2px accent color, or large opening quote mark
```

---

## Spacing & Composition

### The Grid

Use an asymmetric grid for editorial feel:

```
Desktop (12 columns):
  Margin:  5vw
  Gutter:  2vw
  Column:  flexible

Mobile (4 columns):
  Margin:  5vw
  Gutter:  4vw
```

### Vertical Rhythm

```
Section padding: 15vh - 25vh (never less than 100px)
Between elements: 24px, 48px, 96px (follow the scale)
Text block max-width: 65ch (optimal reading)
```

### Asymmetry Rules

Deliberate asymmetry creates visual interest:

```
Image left 60% / Text right 35% (with 5% gap)
Text left 40% / Image right 55%
Full-bleed image with floating text overlay (20% from edge)
```

Never center everything. Centered layouts feel like templates.

### Negative Space

Whitespace is not empty — it is breathing room that signals quality.

```
Hero section: 50% content, 50% negative space
Between projects: At least 20vh separation
Text blocks: 1.6 line-height minimum
```

---

## Texture & Depth

### Grain & Noise

Add film grain overlay for tactile quality:

```css
.grain-overlay {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 9999;
  opacity: 0.03;
  background-image: url("data:image/svg+xml,..."); /* noise SVG */
  background-repeat: repeat;
}
```

Alternative: CSS-generated noise
```css
.noise-bg::before {
  content: "";
  position: absolute;
  inset: 0;
  background: 
    repeating-radial-gradient(#000 0 0.0001%, #fff 0 0.0002%) 50% 0/2500px 2500px,
    repeating-conic-gradient(#000 0 0.0001%, #fff 0 0.0002%) 60% 60%/2500px 2500px;
  background-blend-mode: difference;
  opacity: 0.04;
  mix-blend-mode: overlay;
}
```

### Depth Techniques

| Technique | Usage | Intensity |
|-----------|-------|-----------|
| Box shadow | Cards on hover only | 0 20px 60px rgba(0,0,0,0.3) |
| Backdrop blur | Navigation overlay | blur(20px) + low opacity bg |
| Layered parallax | Section backgrounds | 2-3 layers max |
| Inner shadow | Inset buttons (rarely) | 0 2px 4px rgba(0,0,0,0.1) inset |

No drop shadows on text. No long shadows (outdated). No glow effects except subtle accent.

---

## Motion Language

### Easing Palette

```
Entrance:   power3.out      — Fast start, gentle settle
Exit:       power2.in       — Gentle start, fast finish
Hover:      power2.out      — Immediate response, soft landing
Elastic:    elastic.out(1, 0.5) — Playful elements only (buttons)
Snap:       expo.inOut      — Dramatic transitions
Linear:     "none"          — Scrubbed scroll-linked only
```

### Duration Scale

```
Micro (hover states):     0.2s - 0.3s
Small (element reveals):  0.4s - 0.6s
Medium (section entrances): 0.8s - 1.2s
Large (major transitions):  1.0s - 1.5s
Scrubbed (scroll-linked):   0 (controlled by scroll)
```

### Stagger Patterns

```
Tight (chars):   0.01s - 0.02s per item
Standard (words/items): 0.05s - 0.1s per item
Relaxed (sections): 0.15s - 0.2s per item
```

Stagger direction: top-to-bottom for lists, center-outward for radial elements, left-to-right for text.

### Motion Principles

1. **Anticipation** — Small reverse movement before main action (e.g., button compresses before expanding)
2. **Follow-through** — Elements settle with slight overshoot, not abrupt stop
3. **Secondary action** — Main element moves, subtle element reinforces (e.g., button scales, icon rotates)
4. **Staging** — Clear focal point; animation draws eye to important content
5. **Timing** — Fast = light/insignificant, Slow = heavy/important

---

## Aesthetic References

### Visual Direction Keywords

When deciding the aesthetic thesis, choose 2-3:

| Keyword | Characteristics |
|---------|----------------|
| Brutalist | Raw, exposed structure, bold typography, minimal color |
| Editorial | Magazine-like, generous whitespace, serif display type |
| Cinematic | Dark, dramatic reveals, parallax depth, film grain |
| Minimal | Stripped to essentials, monochrome, geometric |
| Organic | Flowing curves, natural textures, warm tones |
| Technical | Grid-driven, monospace accents, precise measurements |
| Retro-futuristic | Vintage palettes, modern execution, scanlines |

### Portfolio Archetypes

**The Minimalist (Dieter Rams ethos):**
- White space is 70% of layout
- Single typeface, two weights
- One color + black
- Animation: fade-up only, no parallax
- Projects speak for themselves

**The Cinematic (Awwwards style):**
- Dark background, immersive full-viewport sections
- Heavy scroll animation, pinned sections
- Large typography, bold imagery
- Grain texture, smooth easing
- Each project is an experience

**The Editorial (Magazine style):**
- Asymmetric layouts
- Serif headlines, sans body
- Mixed media: photography + illustration + type
- Horizontal scroll galleries
- Pull quotes, side notes, rich footnotes

**The Technologist (Developer-designer):**
- Code-visible aesthetics (syntax highlighting colors)
- Canvas/WebGL effects as differentiator
- Monospace for labels and data
- Interactive experiments embedded
- GitHub-style contribution graphs, stats

### Moodboard Priorities

Before designing, identify the top 3 mood signals:

1. **Temperature**: Warm (beige, cream, earth) vs Cool (black, slate, silver) vs Neutral (white, gray)
2. **Energy**: Calm (slow animations, generous space) vs Dynamic (fast cuts, dense content)
3. **Texture**: Smooth (minimal, flat) vs Rich (grain, layered, tactile)
4. **Voice**: Whisper (subtle, discovered) vs Statement (bold, immediate)

These three choices guide every design decision.
