# Luke Baffait 首页流体背景 — 完整技术解构与实现方案

## 一、截图效果精确分析

### 截图文案内容还原

从截图中可以清晰识别出以下文案和排版元素：

```
┌──────────────────────────────────────────────────────────────────────────┐
│                                                                          │
│  Quiet creator, bringing ideas to life,        ← 左上标语                │
│  through motion, detail and softness.                                    │
│                                                                          │
│                                                                          │
│                                                                          │
│                                                                          │
│                                                                          │
│                                                                          │
│                        Luke        Baffait       ← 底部巨型名字          │
│                       (无衬线)    (衬线斜体)                             │
│  ───────────────────────────────────────────────────────────  ← 细线    │
│  →V3.0    BEHANCE / LINKEDIN / GITHUB    WORK / INFO / CONTACT           │
│   (左)         (中 - 社交链接)                (右 - 导航)                │
│                                                                          │
└──────────────────────────────────────────────────────────────────────────┘
```

**实际文案内容：**

| 位置 | 文案 | 字体特征 |
|------|------|----------|
| 左上标语 | "Quiet creator, *bringing ideas to life*, through motion, detail and softness." | 14px sans-serif，斜体强调 |
| 底部主标题 | "Luke Baffait" | "Luke" = 无衬线 Light，"Baffait" = 衬线斜体 |
| 底部左 | "V3.0" | 11px 大写，箭头前缀 |
| 底部中 | "BEHANCE / LINKEDIN / GITHUB" | 11px 大写，斜杠分隔 |
| 底部右 | "WORK / INFO / CONTACT" | 11px 大写，斜杠分隔 |

### 视觉特征识别

从截图中可以清晰识别出以下特征：

| 元素 | 描述 |
|------|------|
| **背景基调** | 极深的近黑色 `#050505` 或 `#0a0a0a`，不是纯黑 |
| **主光斑** | 一个巨大的红色/橙红色模糊光团，占据右上到中央区域 |
| **光斑边缘** | 极度柔和，无硬边界，呈气态/烟雾状扩散 |
| **光斑形态** | 不是正圆形，略呈不规则椭圆，有机形态 |
| **动画特征** | 缓慢流动变形，周期约 15-20 秒 |
| **颗粒感** | 背景带有微妙的噪点纹理（胶片质感） |

### 效果定性

这不是 WebGL 粒子系统，也不是复杂的 Shader 噪声场。这是一个 **Gradient Blob（渐变模糊光斑）** 效果——本质上是一个或多个巨大的、极度模糊的颜色圆形，通过缓慢的位置移动和形态变形来创造有机流动感。

> 好消息：**纯 CSS + 少量 GSAP 即可完美复刻**，不需要 Three.js/WebGL。

---

## 二、文案排版深度分析

### 2.1 字体对比策略（核心设计手法）

Luke Baffait 首页最醒目的设计决策是 **"Luke"（无衬线） + "Baffait"（衬线斜体）** 的混排。这不是随意选择，而是经过精确计算的双字体策略：

| 维度 | "Luke" | "Baffait" |
|------|--------|-----------|
| **字体类型** | Sans-serif（无衬线） | Serif（衬线） |
| **字重** | Light (300) | Regular (400) |
| **字形** | Roman（正体） | Italic（斜体） |
| **气质** | 现代、简洁、技术感 | 经典、优雅、人文感 |
| **功能** | 承载 "名字" — 个人标识 | 承载 "姓氏" — 家族/传统 |

**设计意图**：通过两种对立字体风格的碰撞，传达 "现代技术与经典工艺融合" 的设计理念。Sans-serif 代表数字时代的简洁高效，Serif Italic 代表传统设计的优雅温度。

### 2.2 标语文案分析

> *"Quiet creator, bringing ideas to life, through motion, detail and softness."*

**文案结构拆解：**

```
Quiet creator,                    ← 身份定位：安静的创造者（谦逊）
      bringing ideas to life,     ← 核心能力：让想法成真（斜体强调）
      through motion, detail      ← 方法论：动态、细节
      and softness.               ← 风格特征：柔和感
```

**关键词选择策略：**
- "Quiet" — 与华丽的竞品形成反差定位
- "motion" — 暗示动画/交互专长
- "detail" — 强调精致度
- "softness" — 定义审美调性（与背景的柔和 blob 呼应）

**斜体强调手法**："bringing ideas to life" 使用斜体，这是文案中唯一被强调的部分。视觉层级：
1. 名字（最大，最醒目）
2. 标语中的斜体部分（次醒目，情感锚点）
3. 标语其余部分（辅助说明）
4. 导航（最小，功能性）

### 2.3 底部导航排版

```
→ V3.0          BEHANCE / LINKEDIN / GITHUB          WORK / INFO / CONTACT
   (版本号)            (社交出口)                           (站内导航)
     ↓                     ↓                                  ↓
   品牌感               外部信任                            用户路径
```

**斜杠分隔符 "/" 的选择**：
- 比 "|" 更柔和，比 "·" 更清晰
- 与斜体字的视觉角度呼应
- 创造节奏感：BEHANCE [pause] / [pause] LINKEDIN [pause] / [pause] GITHUB

**V3.0 的含义**：暗示网站经历了 3 个版本的迭代，传达 "持续进化" 的信号。

### 2.4 如何实现这种字体混排

```css
/* 方案 1：系统字体回退 */
.hero-name {
  font-size: clamp(60px, 15vw, 200px);
  line-height: 0.9;
  letter-spacing: -0.03em;
  color: #fff;
}

.hero-name .sans-part {
  font-family: -apple-system, 'Helvetica Neue', Arial, sans-serif;
  font-weight: 300;  /* Light */
}

.hero-name .serif-part {
  font-family: 'Georgia', 'Times New Roman', 'Noto Serif SC', serif;
  font-style: italic;
  font-weight: 400;
}

/* 方案 2：Google Fonts 精确匹配 */
/* 在 HTML head 中引入：
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300&family=Playfair+Display:ital,wght@1,400&display=swap" rel="stylesheet">
*/

.hero-name .sans-part {
  font-family: 'Inter', sans-serif;
  font-weight: 300;
}

.hero-name .serif-part {
  font-family: 'Playfair Display', serif;
  font-style: italic;
  font-weight: 400;
}

/* 方案 3：更接近原版的字体组合 */
/* "Luke" → Suisse Intl Light 或 Helvetica Neue Light */
/* "Baffait" → Cormorant Garamond Italic 或 Instrument Serif Italic */

.hero-name .sans-part {
  font-family: 'Helvetica Neue', 'Arial', sans-serif;
  font-weight: 300;
  letter-spacing: -0.02em;
}

.hero-name .serif-part {
  font-family: 'Cormorant Garamond', 'Georgia', serif;
  font-style: italic;
  font-weight: 400;
  letter-spacing: -0.01em;
}
```

### 2.5 字距（Letter Spacing）的微妙控制

```css
/* 大字名字：收紧字距，让字母更紧凑 */
.hero-name { letter-spacing: -0.03em; }

/* 导航：放宽字距，增加呼吸感 */
.hero-nav { letter-spacing: 0.15em; }

/* 标语：默认字距 */
.tagline { letter-spacing: 0; }

/* 规律：字号越大，letter-spacing 越负；字号越小，letter-spacing 越正 */
```

### 2.6 完整的排版实现代码

```tsx
// 完整 Hero 文案排版组件
export function HeroContent() {
  return (
    <div className="relative z-10 h-full flex flex-col justify-between px-[5vw] py-[5vh]">
      {/* 标语 - 左上 */}
      <p className="text-white/70 text-sm leading-relaxed max-w-[300px] tracking-[0]">
        Quiet creator, <em className="text-white/90 not-italic font-serif italic">bringing ideas to life</em>,
        <br />
        through motion, detail and softness.
      </p>

      {/* 主标题 - 底部 */}
      <h1
        className="text-white whitespace-nowrap leading-[0.9] tracking-[-0.03em]"
        style={{ fontSize: "clamp(60px, 15vw, 200px)" }}
      >
        <span className="font-sans font-light">名字</span>{" "}
        <span className="font-serif italic font-normal">姓氏</span>
      </h1>

      {/* 导航 - 底部 */}
      <nav className="flex justify-between items-center text-white/50 text-[11px] tracking-[0.15em] uppercase border-t border-white/10 pt-4">
        <span className="text-white/70">→ V3.0</span>
        <div>
          <a href="#" className="hover:text-white/90 transition-colors duration-300">Behance</a>
          <span className="mx-3 opacity-30">/</span>
          <a href="#" className="hover:text-white/90 transition-colors duration-300">LinkedIn</a>
          <span className="mx-3 opacity-30">/</span>
          <a href="#" className="hover:text-white/90 transition-colors duration-300">GitHub</a>
        </div>
        <div>
          <a href="#" className="hover:text-white/90 transition-colors duration-300">Work</a>
          <span className="mx-3 opacity-30">/</span>
          <a href="#" className="hover:text-white/90 transition-colors duration-300">Info</a>
          <span className="mx-3 opacity-30">/</span>
          <a href="#" className="hover:text-white/90 transition-colors duration-300">Contact</a>
        </div>
      </nav>
    </div>
  );
}
```

---

## 三、技术实现原理

### 图层结构

```
Layer 0: 深黑底色 #050505
    ↓
Layer 1: 主 Blob（红色径向渐变，blur(120px)）
    ↓
Layer 2: 次 Blob（暗红色，blur(80px)，反向移动）
    ↓
Layer 3: 颗粒噪点 SVG overlay（opacity: 0.03）
    ↓
前景内容：文字、导航
```

### 核心技术栈

| 技术 | 用途 | 必要性 |
|------|------|--------|
| CSS `radial-gradient` | Blob 的颜色填充 | 必需 |
| CSS `filter: blur()` | 创造柔和边缘 | 必需（关键） |
| CSS `@keyframes` | Blob 基础动画 | 基础方案 |
| GSAP | 更流畅的动画控制 + 滚动联动 | 增强方案 |
| SVG `feTurbulence` | 噪点纹理 | 可选（质感提升） |

---

## 三、三种实现方案

### 方案 A：纯 CSS（5 分钟实现）

最简实现，零依赖。

```html
<!DOCTYPE html>
<html lang="zh">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Gradient Blob Hero</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }

  .hero {
    position: relative;
    width: 100%;
    height: 100vh;
    background: #050505;
    overflow: hidden;
  }

  /* ===== Layer 1: 主红色 Blob ===== */
  .blob-main {
    position: absolute;
    width: 70vw;
    height: 70vw;
    min-width: 600px;
    min-height: 600px;
    border-radius: 50%;
    background: radial-gradient(
      circle at 50% 50%,
      rgba(220, 45, 25, 0.65) 0%,
      rgba(180, 30, 15, 0.3) 40%,
      transparent 70%
    );
    filter: blur(120px);
    top: -15%;
    right: -10%;
    animation: floatMain 20s ease-in-out infinite;
    will-change: transform;
  }

  /* ===== Layer 2: 次 Blob（暗红，增加层次） ===== */
  .blob-sub {
    position: absolute;
    width: 50vw;
    height: 50vw;
    min-width: 400px;
    min-height: 400px;
    border-radius: 50%;
    background: radial-gradient(
      circle at 50% 50%,
      rgba(200, 60, 30, 0.4) 0%,
      rgba(160, 40, 20, 0.15) 50%,
      transparent 70%
    );
    filter: blur(100px);
    top: 10%;
    right: 15%;
    animation: floatSub 25s ease-in-out infinite;
    will-change: transform;
  }

  /* ===== Layer 3: 颗粒噪点（胶片质感） ===== */
  .grain {
    position: absolute;
    inset: 0;
    pointer-events: none;
    opacity: 0.035;
    mix-blend-mode: overlay;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
    background-repeat: repeat;
    background-size: 256px 256px;
  }

  /* ===== 动画定义 ===== */
  @keyframes floatMain {
    0%, 100% {
      transform: translate(0, 0) scale(1);
    }
    25% {
      transform: translate(-5%, 3%) scale(1.05);
    }
    50% {
      transform: translate(3%, -2%) scale(0.95);
    }
    75% {
      transform: translate(-2%, 5%) scale(1.02);
    }
  }

  @keyframes floatSub {
    0%, 100% {
      transform: translate(0, 0) scale(1);
    }
    33% {
      transform: translate(8%, -5%) scale(1.08);
    }
    66% {
      transform: translate(-5%, 4%) scale(0.92);
    }
  }

  /* ===== 前景文字 ===== */
  .hero-content {
    position: relative;
    z-index: 10;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 5vh 5vw;
  }

  .tagline {
    color: rgba(255, 255, 255, 0.7);
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    font-size: 14px;
    line-height: 1.6;
    max-width: 300px;
  }

  .tagline em {
    font-style: italic;
    color: rgba(255, 255, 255, 0.9);
  }

  .hero-name {
    color: #fff;
    font-size: clamp(60px, 15vw, 200px);
    font-weight: 300;
    line-height: 0.9;
    letter-spacing: -0.03em;
    white-space: nowrap;
  }

  .hero-name .serif {
    font-family: 'Georgia', 'Times New Roman', serif;
    font-style: italic;
    font-weight: 400;
  }

  .hero-nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: rgba(255, 255, 255, 0.5);
    font-size: 11px;
    letter-spacing: 0.15em;
    text-transform: uppercase;
  }

  .hero-nav a {
    color: inherit;
    text-decoration: none;
    transition: color 0.3s;
  }

  .hero-nav a:hover {
    color: rgba(255, 255, 255, 0.9);
  }

  .hero-nav .divider {
    margin: 0 12px;
    opacity: 0.3;
  }
</style>
</head>
<body>

<div class="hero">
  <!-- 背景层 -->
  <div class="blob-main"></div>
  <div class="blob-sub"></div>
  <div class="grain"></div>

  <!-- 前景内容 -->
  <div class="hero-content">
    <p class="tagline">
      Quiet creator, <em>bringing ideas to life</em>,<br>
      through motion, detail and softness.
    </p>

    <div>
      <h1 class="hero-name">
        名字 <span class="serif">姓氏</span>
      </h1>
    </div>

    <nav class="hero-nav">
      <span>V3.0</span>
      <div>
        <a href="#">Behance</a>
        <span class="divider">/</span>
        <a href="#">LinkedIn</a>
        <span class="divider">/</span>
        <a href="#">GitHub</a>
      </div>
      <div>
        <a href="#">Work</a>
        <span class="divider">/</span>
        <a href="#">Info</a>
        <span class="divider">/</span>
        <a href="#">Contact</a>
      </div>
    </nav>
  </div>
</div>

</body>
</html>
```

---

### 方案 B：GSAP 增强版（推荐）

在 CSS 基础上，用 GSAP 实现更流畅的控制和滚动联动效果。

```tsx
// components/GradientBlobBackground.tsx
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export function GradientBlobBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const blob1Ref = useRef<HTMLDivElement>(null);
  const blob2Ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Blob 1: 主红色光斑 — 缓慢漂浮
    gsap.to(blob1Ref.current, {
      x: "-8%",
      y: "5%",
      scale: 1.08,
      duration: 12,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    });

    // Blob 2: 次光斑 — 反向移动，不同节奏
    gsap.to(blob2Ref.current, {
      x: "10%",
      y: "-6%",
      scale: 0.92,
      duration: 18,
      ease: "sine.inOut",
      repeat: -1,
      yoyo: true,
    });

    // 额外的缓慢旋转，增加有机感
    gsap.to([blob1Ref.current, blob2Ref.current], {
      rotation: 15,
      duration: 30,
      ease: "none",
      repeat: -1,
      yoyo: true,
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden">
      {/* 主 Blob — 红色 */}
      <div
        ref={blob1Ref}
        className="absolute will-change-transform"
        style={{
          width: "70vw",
          height: "70vw",
          minWidth: 600,
          minHeight: 600,
          borderRadius: "50%",
          background: `radial-gradient(circle at 50% 50%, rgba(220, 45, 25, 0.65) 0%, rgba(180, 30, 15, 0.3) 40%, transparent 70%)`,
          filter: "blur(120px)",
          top: "-15%",
          right: "-10%",
        }}
      />

      {/* 次 Blob — 暗红 */}
      <div
        ref={blob2Ref}
        className="absolute will-change-transform"
        style={{
          width: "50vw",
          height: "50vw",
          minWidth: 400,
          minHeight: 400,
          borderRadius: "50%",
          background: `radial-gradient(circle at 50% 50%, rgba(200, 60, 30, 0.4) 0%, rgba(160, 40, 20, 0.15) 50%, transparent 70%)`,
          filter: "blur(100px)",
          top: "10%",
          right: "15%",
        }}
      />

      {/* 噪点纹理 */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0.035,
          mixBlendMode: "overlay",
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "256px 256px",
        }}
      />
    </div>
  );
}
```

```tsx
// sections/HeroSection.tsx
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { GradientBlobBackground } from "../components/GradientBlobBackground";

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const navRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    // 入场时间线
    const tl = gsap.timeline({ delay: 0.3 });

    // 标语淡入
    tl.from(taglineRef.current, {
      y: 20,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    });

    // 名字入场 — 使用 SplitText 实现逐字效果
    // 注意：需要安装 SplitText 插件
    tl.from(nameRef.current, {
      y: 60,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out",
    }, "-=0.4");

    // 导航淡入
    tl.from(navRef.current, {
      opacity: 0,
      duration: 0.6,
      ease: "power2.out",
    }, "-=0.6");
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen bg-[#050505] overflow-hidden"
    >
      <GradientBlobBackground />

      <div className="relative z-10 h-full flex flex-col justify-between px-[5vw] py-[5vh]">
        {/* 标语 */}
        <p
          ref={taglineRef}
          className="text-white/70 text-sm leading-relaxed max-w-[300px]"
        >
          Quiet creator, <em className="text-white/90">bringing ideas to life</em>,<br />
          through motion, detail and softness.
        </p>

        {/* 名字 */}
        <h1
          ref={nameRef}
          className="text-white font-light leading-[0.9] tracking-[-0.03em] whitespace-nowrap"
          style={{ fontSize: "clamp(60px, 15vw, 200px)" }}
        >
          名字 <span className="font-serif italic font-normal">姓氏</span>
        </h1>

        {/* 导航 */}
        <nav
          ref={navRef}
          className="flex justify-between items-center text-white/50 text-[11px] tracking-[0.15em] uppercase"
        >
          <span>→ V3.0</span>
          <div>
            <a href="#" className="hover:text-white/90 transition-colors">Behance</a>
            <span className="mx-3 opacity-30">/</span>
            <a href="#" className="hover:text-white/90 transition-colors">LinkedIn</a>
            <span className="mx-3 opacity-30">/</span>
            <a href="#" className="hover:text-white/90 transition-colors">GitHub</a>
          </div>
          <div>
            <a href="#" className="hover:text-white/90 transition-colors">Work</a>
            <span className="mx-3 opacity-30">/</span>
            <a href="#" className="hover:text-white/90 transition-colors">Info</a>
            <span className="mx-3 opacity-30">/</span>
            <a href="#" className="hover:text-white/90 transition-colors">Contact</a>
          </div>
        </nav>
      </div>
    </section>
  );
}
```

---

### 方案 C：GSAP + 滚动联动（高阶）

Blob 颜色随页面滚动而变化，打造沉浸式体验。

```tsx
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function ScrollLinkedBlobBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const blob1Ref = useRef<HTMLDivElement>(null);
  const blob2Ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // 基础漂浮动画
    gsap.to(blob1Ref.current, {
      x: "-8%", y: "5%", scale: 1.08,
      duration: 12, ease: "sine.inOut", repeat: -1, yoyo: true,
    });
    gsap.to(blob2Ref.current, {
      x: "10%", y: "-6%", scale: 0.92,
      duration: 18, ease: "sine.inOut", repeat: -1, yoyo: true,
    });

    // 滚动联动：颜色变化
    gsap.to(blob1Ref.current, {
      background: `radial-gradient(circle at 50% 50%, rgba(100, 80, 220, 0.5) 0%, rgba(60, 40, 180, 0.2) 40%, transparent 70%)`,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    // 滚动联动：Blob 位置变化
    gsap.to(blob1Ref.current, {
      x: "20%",
      y: "30%",
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden">
      <div
        ref={blob1Ref}
        className="absolute will-change-transform"
        style={{
          width: "70vw", height: "70vw", minWidth: 600, minHeight: 600,
          borderRadius: "50%",
          background: `radial-gradient(circle at 50% 50%, rgba(220, 45, 25, 0.65) 0%, rgba(180, 30, 15, 0.3) 40%, transparent 70%)`,
          filter: "blur(120px)",
          top: "-15%", right: "-10%",
        }}
      />
      <div
        ref={blob2Ref}
        className="absolute will-change-transform"
        style={{
          width: "50vw", height: "50vw", minWidth: 400, minHeight: 400,
          borderRadius: "50%",
          background: `radial-gradient(circle at 50% 50%, rgba(200, 60, 30, 0.4) 0%, rgba(160, 40, 20, 0.15) 50%, transparent 70%)`,
          filter: "blur(100px)",
          top: "10%", right: "15%",
        }}
      />
      {/* 噪点纹理 */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          opacity: 0.035, mixBlendMode: "overlay",
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat", backgroundSize: "256px 256px",
        }}
      />
    </div>
  );
}
```

---

## 四、参数调优指南

### 颜色调整

| 风格 | 主 Blob 颜色 | 次 Blob 颜色 | 适合场景 |
|------|-------------|-------------|---------|
| 红色系（Luke 同款）| `rgba(220, 45, 25, 0.65)` | `rgba(200, 60, 30, 0.4)` | 大胆、戏剧性 |
| 蓝色系 | `rgba(30, 100, 220, 0.6)` | `rgba(20, 60, 180, 0.35)` | 冷静、科技 |
| 紫色系 | `rgba(130, 50, 220, 0.55)` | `rgba(100, 40, 180, 0.3)` | 神秘、创意 |
| 暖金色 | `rgba(220, 160, 40, 0.5)` | `rgba(200, 140, 30, 0.3)` | 奢华、温暖 |
| 薄荷绿 | `rgba(40, 200, 160, 0.5)` | `rgba(30, 180, 140, 0.3)` | 清新、自然 |

### 模糊值调整

```
blur(60px)  → 较清晰的光斑，边缘较明显
blur(100px) → 柔和光晕，推荐值
blur(120px) → 极柔和，几乎融入背景（Luke 同款感觉）
blur(150px) → 极致扩散，只剩隐约色感
```

**经验法则**：`blur` 值越大越"高级"，但也越不显眼。根据内容对比度调整。

### 动画速度调整

```
duration: 8s   → 快速流动，活泼感
duration: 15s  → 中等节奏
duration: 20s  → 缓慢沉稳（Luke 同款感觉）
duration: 30s  → 几乎静止，极简感
duration: 60s  → 仅微动，氛围感
```

---

## 五、性能优化清单

- [ ] 使用 `will-change: transform` 在 blob 元素上
- [ ] 动画结束后移除 `will-change`（如有暂停状态）
- [ ] 噪点纹理使用内联 SVG Data URI，避免额外请求
- [ ] 移动端减少 blur 值至 `60-80px`
- [ ] 移动端减少 blob 数量至 1 个
- [ ] 使用 `prefers-reduced-motion` 禁用动画
- [ ] 在低端设备上回退为静态渐变

```css
@media (prefers-reduced-motion: reduce) {
  .blob-main,
  .blob-sub {
    animation: none;
  }
}
```

---

## 六、总结

Luke Baffait 的流体背景效果本质上是一个 **精心调教的 Gradient Blob**，核心在于：

1. **极度模糊**（`blur(100-120px)`）创造柔和光晕
2. **巨大尺寸**（`60-80vw`）确保覆盖范围
3. **缓慢动画**（`15-25s` 周期）营造沉稳氛围
4. **噪点叠加**增添胶片质感
5. **深黑底色**让光斑成为唯一视觉焦点

不需要 WebGL，不需要 Three.js，不需要复杂 Shader。**纯 CSS + GSAP 即可完美实现。**
