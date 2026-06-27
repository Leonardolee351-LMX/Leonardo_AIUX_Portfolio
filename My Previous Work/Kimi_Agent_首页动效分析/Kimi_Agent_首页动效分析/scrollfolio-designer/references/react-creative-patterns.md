# React Creative Programming Patterns

## Table of Contents
1. [GSAP Integration Architecture](#gsap-integration-architecture)
2. [Component Patterns](#component-patterns)
3. [Canvas & WebGL Integration](#canvas--webgl-integration)
4. [Performance Optimization](#performance-optimization)
5. [Custom Hooks Library](#custom-hooks-library)

---

## GSAP Integration Architecture

### The gsap.context() Pattern

Always scope GSAP animations to prevent leaking and ensure cleanup.

```typescript
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export function AnimatedSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Scoped to containerRef — selectors only match inside
    gsap.from(".animate-in", {
      y: 50,
      opacity: 0,
      stagger: 0.1,
      scrollTrigger: {
        trigger: ".trigger-element",
        start: "top 80%",
      },
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef}>
      <div className="trigger-element">
        <div className="animate-in">Item 1</div>
        <div className="animate-in">Item 2</div>
      </div>
    </div>
  );
}
```

### Refs Over State for Animation Values

Never use React state for values that change every frame.

```typescript
// WRONG — causes re-render every frame
const [x, setX] = useState(0);
gsap.to({}, { onUpdate: () => setX(gsap.getProperty(el, "x")) });

// RIGHT — direct DOM manipulation
const xRef = useRef(0);
gsap.to(xRef, { 
  value: 100, 
  onUpdate: () => {
    el.style.transform = `translateX(${xRef.current}px)`;
  }
});
```

### Timeline Component Pattern

```typescript
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface TimelineSectionProps {
  children: React.ReactNode;
  pin?: boolean;
  scrollDistance?: string;
}

export function TimelineSection({ 
  children, 
  pin = false, 
  scrollDistance = "+=150%" 
}: TimelineSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useGSAP(() => {
    if (!sectionRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: scrollDistance,
        pin,
        scrub: 0.5,
      },
    });

    timelineRef.current = tl;

    // Entrance
    tl.fromTo(".section-content", 
      { y: 60, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 0.3 }, 
      0
    );

    // Exit
    tl.to(".section-content", 
      { y: -40, opacity: 0, duration: 0.2 }, 
      0.8
    );
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="min-h-screen relative">
      <div className="section-content">{children}</div>
    </section>
  );
}
```

---

## Component Patterns

### AnimatedText Component

Reusable text animation with multiple modes.

```typescript
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type AnimationMode = "fade-up" | "char-reveal" | "word-stagger" | "line-reveal";

interface AnimatedTextProps {
  children: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  mode?: AnimationMode;
  className?: string;
  delay?: number;
  triggerStart?: string;
}

export function AnimatedText({
  children,
  as: Tag = "p",
  mode = "fade-up",
  className = "",
  delay = 0,
  triggerStart = "top 85%",
}: AnimatedTextProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (!ref.current) return;

    const el = ref.current;

    switch (mode) {
      case "fade-up":
        gsap.from(el, {
          y: 40,
          opacity: 0,
          duration: 0.8,
          delay,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: triggerStart },
        });
        break;

      case "char-reveal":
        // Requires SplitText plugin
        const split = new SplitText(el, { type: "chars" });
        gsap.from(split.chars, {
          y: 100,
          opacity: 0,
          stagger: 0.02,
          duration: 0.6,
          ease: "back.out(1.7)",
          scrollTrigger: { trigger: el, start: triggerStart },
        });
        break;

      case "word-stagger":
        const wordSplit = new SplitText(el, { type: "words" });
        gsap.from(wordSplit.words, {
          y: 30,
          opacity: 0,
          stagger: 0.08,
          duration: 0.5,
          scrollTrigger: { trigger: el, start: triggerStart },
        });
        break;
    }
  }, { scope: ref });

  return (
    <Tag ref={ref as any} className={className}>
      {children}
    </Tag>
  );
}
```

### ParallaxLayer Component

```typescript
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ParallaxLayerProps {
  children: React.ReactNode;
  speed?: number; // -1 (faster) to 1 (slower), 0 = normal
  className?: string;
}

export function ParallaxLayer({ 
  children, 
  speed = 0.3, 
  className = "" 
}: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!ref.current) return;
    
    gsap.to(ref.current, {
      y: () => speed * 100,
      ease: "none",
      scrollTrigger: {
        trigger: ref.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  }, { scope: ref });

  return (
    <div ref={ref} className={className} style={{ willChange: "transform" }}>
      {children}
    </div>
  );
}
```

### MagneticButton Component

```typescript
import { useRef, useCallback } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  onClick?: () => void;
}

export function MagneticButton({ 
  children, 
  className = "", 
  strength = 0.4,
  onClick 
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(buttonRef.current, {
      x: x * strength,
      y: y * strength,
      duration: 0.3,
      ease: "power2.out",
    });

    gsap.to(textRef.current, {
      x: x * strength * 0.2,
      y: y * strength * 0.2,
      duration: 0.3,
      ease: "power2.out",
    });
  }, [strength]);

  const handleMouseLeave = useCallback(() => {
    gsap.to(buttonRef.current, {
      x: 0, y: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.3)",
    });
    gsap.to(textRef.current, {
      x: 0, y: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.3)",
    });
  }, []);

  return (
    <button
      ref={buttonRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      <span ref={textRef}>{children}</span>
    </button>
  );
}
```

---

## Canvas & WebGL Integration

### Canvas Overlay Pattern

Use Canvas 2D or WebGL as a background layer with DOM content overlaid.

```typescript
import { useRef, useEffect } from "react";

interface CanvasBackgroundProps {
  className?: string;
  render: (ctx: CanvasRenderingContext2D, time: number, scroll: number) => void;
}

export function CanvasBackground({ className = "", render }: CanvasBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth * window.devicePixelRatio;
      canvas.height = window.innerHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resize();
    window.addEventListener("resize", resize);

    const animate = (time: number) => {
      const scroll = window.scrollY;
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      render(ctx, time * 0.001, scroll);
      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [render]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none ${className}`}
      style={{ width: "100%", height: "100%" }}
    />
  );
}
```

### React-Three-Fiber Scene (Hero)

```typescript
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

function FloatingGeometry() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.1;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.2;
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1, 0]} />
      <meshStandardMaterial 
        color="#ffffff" 
        wireframe 
        transparent 
        opacity={0.3}
      />
    </mesh>
  );
}

export function HeroScene() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <FloatingGeometry />
      </Canvas>
    </div>
  );
}
```

---

## Performance Optimization

### Lazy Section Loading

```typescript
import { lazy, Suspense } from "react";

const HeavySection = lazy(() => import("./HeavySection"));

// In parent component
<Suspense fallback={<div className="h-screen" />}>
  <HeavySection />
</Suspense>
```

### Image Optimization Pipeline

```typescript
interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}

export function OptimizedImage({ src, alt, className, priority }: OptimizedImageProps) {
  return (
    <picture>
      <source srcSet={`${src}?format=webp`} type="image/webp" />
      <img
        src={src}
        alt={alt}
        className={className}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
      />
    </picture>
  );
}
```

### RAF Throttling for Scroll

```typescript
import { useRef, useEffect } from "react";

export function useThrottledScroll(callback: (scroll: number) => void, fps = 30) {
  const rafRef = useRef<number>(0);
  const lastRunRef = useRef<number>(0);
  const interval = 1000 / fps;

  useEffect(() => {
    const handleScroll = () => {
      const now = performance.now();
      if (now - lastRunRef.current < interval) return;

      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        callback(window.scrollY);
        lastRunRef.current = now;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, [callback, interval]);
}
```

### Will-Change Management

Add `will-change` before animation, remove after.

```typescript
gsap.fromTo(el, 
  { y: 100, opacity: 0 },
  {
    y: 0,
    opacity: 1,
    duration: 0.8,
    onStart: () => { el.style.willChange = "transform, opacity"; },
    onComplete: () => { el.style.willChange = "auto"; },
  }
);
```

---

## Custom Hooks Library

### useScrollProgress

```typescript
import { useState, useEffect } from "react";

export function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? scrollTop / docHeight : 0);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return progress;
}
```

### useInView

```typescript
import { useState, useEffect, useRef, RefObject } from "react";

export function useInView<T extends HTMLElement>(
  options?: IntersectionObserverInit
): [RefObject<T | null>, boolean] {
  const ref = useRef<T>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsInView(entry.isIntersecting);
    }, { threshold: 0.1, ...options });

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return [ref, isInView];
}
```

### useMediaQuery

```typescript
import { useState, useEffect } from "react";

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    setMatches(media.matches);

    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    media.addEventListener("change", handler);
    return () => media.removeEventListener("change", handler);
  }, [query]);

  return matches;
}

// Usage
const isMobile = useMediaQuery("(max-width: 768px)");
const prefersReduced = useMediaQuery("(prefers-reduced-motion: reduce)");
```

### useLenis

```typescript
import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useLenis() {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  return lenisRef;
}
```
