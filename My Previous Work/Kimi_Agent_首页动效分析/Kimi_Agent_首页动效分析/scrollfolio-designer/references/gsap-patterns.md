# GSAP Animation Patterns & ScrollTrigger Recipes

## Table of Contents
1. [Core Setup](#core-setup)
2. [ScrollTrigger Fundamentals](#scrolltrigger-fundamentals)
3. [Signature Techniques](#signature-techniques)
4. [Text Animation Patterns](#text-animation-patterns)
5. [Section Transition Recipes](#section-transition-recipes)
6. [Performance Patterns](#performance-patterns)

---

## Core Setup

### Plugin Registration (do once)

```typescript
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);
```

### GSAP Context Pattern (React-safe cleanup)

```typescript
import { useGSAP } from "@gsap/react";

useGSAP(() => {
  // All GSAP animations here
  // Auto-cleanup on unmount via gsap.context()
}, { scope: containerRef });
```

### Global Defaults

```typescript
gsap.defaults({
  ease: "power3.out",
  duration: 0.8,
});

// Custom easing for portfolio feel
gsap.registerEase("portfolio", "M0,0 C0.16,1 0.3,1 1,1");
gsap.registerEase("snap", "M0,0 C0.2,0 0.2,1 0.5,1 0.8,1 0.8,0 1,1");
```

---

## ScrollTrigger Fundamentals

### Pinned Section (scrubbed timeline)

```typescript
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: sectionRef.current,
    start: "top top",
    end: "+=200%",     // 2x viewport height of scroll distance
    pin: true,
    scrub: 0.5,        // 0.5s smoothing — responsive but fluid
    snap: {
      snapTo: (progress) => {
        if (progress < 0.2) return 0.2;
        if (progress > 0.8) return 1;
        return 0.5;
      },
      duration: { min: 0.15, max: 0.35 },
      ease: "power2.inOut",
    },
  },
});

tl.fromTo(".title", 
  { y: 100, opacity: 0 }, 
  { y: 0, opacity: 1, ease: "none" }, 
  0
);
tl.fromTo(".image", 
  { scale: 1.2, y: 50 }, 
  { scale: 1, y: 0, ease: "none" }, 
  0
);
```

### Flowing Section (triggered, not pinned)

```typescript
gsap.fromTo(".reveal-item",
  { y: 60, opacity: 0 },
  {
    y: 0,
    opacity: 1,
    stagger: 0.12,
    scrollTrigger: {
      trigger: ".reveal-item",
      start: "top 85%",
      toggleActions: "play none none reverse",
    },
  }
);
```

### Horizontal Scroll Section

```typescript
const container = containerRef.current;
const scrollWidth = container.scrollWidth - window.innerWidth;

gsap.to(container, {
  x: -scrollWidth,
  ease: "none",
  scrollTrigger: {
    trigger: wrapperRef.current,
    start: "top top",
    end: () => `+=${scrollWidth}`,
    pin: true,
    scrub: 0.8,
    invalidateOnRefresh: true,  // Recalculate on resize
  },
});
```

---

## Signature Techniques

### 1. Parallax Depth Stack

Multiple layers moving at different scroll speeds for dimensional depth.

```typescript
const layers = gsap.utils.toArray<HTMLElement>(".parallax-layer");
layers.forEach((layer, i) => {
  const speed = (i + 1) * 0.15;
  gsap.to(layer, {
    y: () => -150 * speed,
    ease: "none",
    scrollTrigger: {
      trigger: sectionRef.current,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    },
  });
});
```

### 2. Image Reveal Mask

Clip-path or scale reveal synced to scroll progress.

```typescript
gsap.fromTo(".image-reveal",
  { clipPath: "inset(100% 0 0 0)" },
  {
    clipPath: "inset(0% 0 0 0)",
    ease: "none",
    scrollTrigger: {
      trigger: ".image-reveal",
      start: "top 80%",
      end: "top 20%",
      scrub: true,
    },
  }
);
```

### 3. Text Character Scramble

Characters cycle through random symbols before resolving.

```typescript
// With SplitText
const split = new SplitText(".scramble-text", { type: "chars" });
const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*";

split.chars.forEach((char, i) => {
  const original = char.innerText;
  gsap.fromTo(char,
    { opacity: 0 },
    {
      opacity: 1,
      duration: 0.05,
      repeat: 5,
      repeatRefresh: true,
      onRepeat: () => {
        char.innerText = chars[Math.floor(Math.random() * chars.length)];
      },
      onComplete: () => { char.innerText = original; },
      delay: i * 0.03,
      scrollTrigger: {
        trigger: ".scramble-text",
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    }
  );
});
```

### 4. Cursor-Follow Magnetic Element

Button or element that elastically follows cursor within radius.

```typescript
const handleMouseMove = (e: MouseEvent) => {
  const rect = buttonRef.current.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;
  const distX = e.clientX - centerX;
  const distY = e.clientY - centerY;
  const distance = Math.sqrt(distX * distX + distY * distY);
  const maxDist = 100;

  if (distance < maxDist) {
    const strength = 1 - distance / maxDist;
    gsap.to(buttonRef.current, {
      x: distX * strength * 0.4,
      y: distY * strength * 0.4,
      duration: 0.4,
      ease: "power2.out",
    });
  }
};

const handleMouseLeave = () => {
  gsap.to(buttonRef.current, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.3)" });
};
```

### 5. Scroll-Velocity Skew

Elements skew based on scroll speed for dynamic feel.

```typescript
let currentSkew = 0;
const targetSkew = { value: 0 };

ScrollTrigger.create({
  onUpdate: (self) => {
    targetSkew.value = self.getVelocity() / -300;
    targetSkew.value = gsap.utils.clamp(-10, 10, targetSkew.value);
  },
});

gsap.ticker.add(() => {
  currentSkew += (targetSkew.value - currentSkew) * 0.1;
  gsap.set(".skew-on-scroll", { skewY: currentSkew });
  targetSkew.value *= 0.9; // Decay
});
```

### 6. SVG Path Draw

Stroke animation along SVG paths for illustrative reveals.

```typescript
gsap.fromTo(".draw-path",
  { strokeDasharray: "2000", strokeDashoffset: "2000" },
  {
    strokeDashoffset: "0",
    duration: 2,
    ease: "power2.inOut",
    scrollTrigger: {
      trigger: ".draw-path",
      start: "top 75%",
      toggleActions: "play none none reverse",
    },
  }
);
```

---

## Text Animation Patterns

### SplitText Scroll Reveal

```typescript
const split = new SplitText(".headline", { type: "words,chars" });

gsap.from(split.chars, {
  y: 100,
  opacity: 0,
  stagger: 0.02,
  duration: 0.8,
  ease: "back.out(1.7)",
  scrollTrigger: {
    trigger: ".headline",
    start: "top 80%",
    toggleActions: "play none none reverse",
  },
});
```

### Line-by-Line Reveal

```typescript
const split = new SplitText(".body-text", { type: "lines" });

gsap.from(split.lines, {
  y: 30,
  opacity: 0,
  stagger: 0.1,
  duration: 0.6,
  scrollTrigger: {
    trigger: ".body-text",
    start: "top 85%",
  },
});
```

### Scroll-Linked Typography

```typescript
gsap.to(".scroll-text", {
  backgroundPositionX: "0%",
  ease: "none",
  scrollTrigger: {
    trigger: ".scroll-text",
    start: "top bottom",
    end: "bottom top",
    scrub: true,
  },
});
// CSS: background-clip: text with gradient from -100% to 0%
```

---

## Section Transition Recipes

### Wipe Transition

```typescript
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".section-a",
    start: "bottom bottom",
    end: "bottom top",
    scrub: true,
  },
});

tl.fromTo(".wipe-panel",
  { yPercent: 100 },
  { yPercent: 0, ease: "none" }
);
```

### Scale-Fade Handoff

```typescript
gsap.fromTo(".section-b",
  { scale: 0.9, opacity: 0 },
  {
    scale: 1,
    opacity: 1,
    ease: "none",
    scrollTrigger: {
      trigger: ".section-b",
      start: "top 90%",
      end: "top 50%",
      scrub: true,
    },
  }
);
```

### Color Morph Transition

Background color shifts as user scrolls between sections.

```typescript
gsap.to("body", {
  backgroundColor: "#0a0a0a",
  ease: "none",
  scrollTrigger: {
    trigger: ".dark-section",
    start: "top 80%",
    end: "top 20%",
    scrub: true,
  },
});
```

---

## Performance Patterns

### Batch ScrollTrigger Creation

```typescript
const triggers: ScrollTrigger[] = [];

sections.forEach((section) => {
  const st = ScrollTrigger.create({ ... });
  triggers.push(st);
});

// Cleanup
return () => {
  triggers.forEach(st => st.kill());
};
```

### Resize-Debounce Refresh

```typescript
let resizeTimer: ReturnType<typeof setTimeout>;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    ScrollTrigger.refresh();
  }, 250);
});
```

### Visibility Check for Animations

```typescript
const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!prefersReduced) {
  // Initialize all scroll animations
}
```

### GPU Acceleration Hints

```css
.animated-element {
  will-change: transform, opacity;
  transform: translateZ(0); /* Force compositing layer */
}

/* Remove will-change after animation completes */
.animation-complete {
  will-change: auto;
}
```
