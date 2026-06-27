# Scroll Narrative UX Patterns

## Table of Contents
1. [Scroll Rhythm & Pacing](#scroll-rhythm--pacing)
2. [Section Architecture](#section-architecture)
3. [Navigation Patterns](#navigation-patterns)
4. [Interaction Models](#interaction-models)
5. [Mobile Adaptation](#mobile-adaptation)
6. [Accessibility](#accessibility)

---

## Scroll Rhythm & Pacing

### The Beat System

Think of scroll as music — alternating between tension and release:

```
[IMPACT] Hero — pinned, high drama, 100vh scroll
[RELEASE] About — flowing, readable, natural scroll
[TENSION] Work — pinned sections, reveals, 200vh+ each
[RELEASE] Process — flowing, educational
[CLIMAX] Contact — pinned, full-screen CTA
```

Rules:
- Never pin more than 60% of total page height
- After every pinned section, include a flowing "breath" section
- Minimum 150vh scroll distance for pinned sections (mobile: 100vh)
- Flowing sections should feel "fast" to create contrast

### Scroll Speed Zones

| Zone | Feel | Technique |
|------|------|-----------|
| Fast | Skimmable, light | No pins, simple fades |
| Medium | Engaging, paced | Subtle parallax, staggered reveals |
| Slow | Cinematic, immersive | Full pins, scrubbed timelines |

Map each section to a speed zone before building.

### Progress Indicators

**Minimal progress bar** (preferred):
```
Fixed top, 2px height, accent color, scaleX tied to scroll progress.
```

**Section dots** (alternative):
```
Right edge, 6px circles, active state = filled + larger.
Only for sections > 5.
```

**No visible indicator** (bold option):
```
Rely on content rhythm alone. Works with very strong visual sections.
```

Never use: page numbers, "Section 3 of 6" text, scroll percentage counters.

---

## Section Architecture

### The Pin-Flow Hybrid (Recommended)

Most effective pattern for portfolios. Each major section pins briefly to deliver its payload, then releases.

```
Section enters viewport → Pins at top → Content animates in (scrubbed) 
→ Content holds for viewing → Content animates out → Unpins → Next section enters
```

Timeline structure for a pinned case study:
```
0% - 20%: Section pins, content enters
20% - 70%: Content holds (readable, stable)
70% - 100%: Content exits, section unpins
```

### Entry/Exit Choreography

Every section needs both entrance and exit animation:

```typescript
const sectionTl = gsap.timeline({ scrollTrigger: { ... } });

// ENTRANCE (0% - 30%)
sectionTl.fromTo(".content", 
  { y: 80, opacity: 0 }, 
  { y: 0, opacity: 1 }, 
  0
);

// SETTLE (30% - 70%) — content is fully visible, stable

// EXIT (70% - 100%)
sectionTl.to(".content", 
  { y: -60, opacity: 0 }, 
  0.7
);
```

### Depth Layers Within Sections

Create depth within each pinned section using z-index stacking:

```
Layer 0 (z: -1): Background texture/color
Layer 1 (z: 0):  Primary content — text, images
Layer 2 (z: 1):  Accent elements — lines, shapes
Layer 3 (z: 2):  Foreground texture — grain overlay
```

Each layer moves at different parallax speeds.

---

## Navigation Patterns

### Hidden Anchor Menu

```
Trigger: Scroll up (velocity-based, not just position)
State: Fixed top bar slides down, minimal links
Links: Scroll to section anchors with GSAP scrollTo
Hide: On scroll down, or 3s after last scroll
Style: Blur backdrop, no background color (glassmorphism)
```

### Section-Aware Highlights

Menu items highlight based on which section is in viewport center:

```typescript
ScrollTrigger.create({
  trigger: sectionRef,
  start: "top center",
  end: "bottom center",
  onEnter: () => setActiveSection(id),
  onEnterBack: () => setActiveSection(id),
});
```

### Keyboard Navigation

```
ArrowDown / ArrowUp: Scroll to next/prev section
Home / End: First / last section
Space: Page down (native)
Tab: Focus visible interactive elements only
```

---

## Interaction Models

### Hover States (Desktop)

| Element | Hover Response | Duration | Easing |
|---------|---------------|----------|--------|
| Text links | Underline slides in from left | 0.3s | power2.out |
| Buttons | Scale 1.02, subtle shadow | 0.2s | power2.out |
| Cards | TranslateY -8px, shadow deepen | 0.3s | power2.out |
| Images | Scale 1.03 within overflow:hidden | 0.5s | power2.out |

Never: sudden color changes, border appears (layout shift), rotate transforms on cards.

### Touch Interactions (Mobile)

- **Tap**: All hover states become "visible" by default
- **Swipe**: Respect native scroll, do not intercept
- **Long press**: Show preview or context (optional)
- **Pinch**: Never block zoom on text content

### Cursor Effects

**Custom cursor** (optional, desktop only):
```
Small dot (8px) that follows with slight lag (lerp 0.15)
Expands to 48px on hover over interactive elements
Changes to "view" text over project thumbnails
Hidden on touch devices (check pointer: coarse)
```

Implementation: CSS `cursor: none` + absolute-positioned div + requestAnimationFrame lerp. Never use `mousemove` → `setState` in React (causes re-renders).

---

## Mobile Adaptation

### Scroll Behavior Differences

| Aspect | Desktop | Mobile |
|--------|---------|--------|
| Scroll source | Wheel/trackpad | Touch gesture |
| Velocity | Consistent, controllable | Variable, momentum-based |
| Pin duration | 200vh+ | 100-150vh |
| Parallax layers | 4-5 layers | 2-3 layers |
| Hover effects | Full | Converted to visible states |
| Custom cursor | Enabled | Disabled |
| Smooth scroll | Lenis | Native (or reduced Lenis lerp) |

### Mobile-First Section Checklist

- [ ] All text readable at 16px minimum
- [ ] Touch targets ≥ 44x44px
- [ ] No horizontal scroll (except intentional horizontal sections)
- [ ] Images optimized (WebP, responsive srcset)
- [ ] Videos: poster image, no autoplay with sound
- [ ] Reduce simultaneous animations (max 3 elements)

### Responsive Breakpoints

```typescript
const breakpoints = {
  sm: 640,   // Large phones
  md: 768,   // Tablets
  lg: 1024,  // Small laptops
  xl: 1280,  // Desktop
  "2xl": 1536, // Large screens
};
```

Critical: Test at 375px (iPhone SE) and 1440px+ (desktop). These extremes reveal most issues.

---

## Accessibility

### Reduced Motion

```typescript
const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (prefersReduced) {
  // Disable: parallax, scrubbed animations, smooth scroll
  // Enable: instant state changes, opacity-only transitions
  // Keep: content reveals, but instant (no motion)
}
```

### Screen Reader Considerations

- Use `aria-label` for decorative elements
- Ensure all interactive elements have accessible names
- Hide canvas/decorative elements: `aria-hidden="true"`
- Maintain logical heading hierarchy (h1 → h2 → h3)
- Skip-to-content link (visually hidden, focusable)

### Focus Management

```css
:focus-visible {
  outline: 2px solid currentColor;
  outline-offset: 4px;
}

/* Remove default focus for mouse users */
:focus:not(:focus-visible) {
  outline: none;
}
```

### Color Contrast

- Body text: minimum 4.5:1 against background
- Large text (18px+): minimum 3:1
- Interactive elements: minimum 3:1 against adjacent colors
- Never rely on color alone to convey information
