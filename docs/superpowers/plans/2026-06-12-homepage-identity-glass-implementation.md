# Homepage Identity And Glass CTA Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将首页 logo 固定为默认白色，把 Hero 主身份改为 `Design Manager`，并把三个 CTA 升级为带厚度边缘的 skeuomorphic glass 按钮。

**Architecture:** 这次改动只动首页视觉层，不改信息架构。共享材质和品牌规则统一放在 `app/src/index.css`，Hero 文案与 CTA class 替换放在 `app/src/sections/v3/HeroSection3.tsx`，导航组件通过复用 `.brand-mark` 自动吃到白色 logo 规则。

**Tech Stack:** React 19, Vite 7, TypeScript, Tailwind utilities, 自定义 CSS 组件层

---

## 文件结构

- Modify: `e:/Leonardo_AIUX_Portfolio/My Previous Work/Kimi_Agent_首页动效分析/Kimi_Agent_首页动效分析/app/src/index.css`
  - 负责首页共享视觉规则：`brand-mark` 默认白色、CTA 玻璃按钮材质、hover/active/reduced-motion 状态
- Modify: `e:/Leonardo_AIUX_Portfolio/My Previous Work/Kimi_Agent_首页动效分析/Kimi_Agent_首页动效分析/app/src/sections/v3/HeroSection3.tsx`
  - 负责 Hero 主身份文案、次级身份层级、CTA 使用新的玻璃按钮类
- Verify only: `e:/Leonardo_AIUX_Portfolio/My Previous Work/Kimi_Agent_首页动效分析/Kimi_Agent_首页动效分析/app/src/components/layout/Navigation3.tsx`
  - 不直接修改；通过共享 `.brand-mark` 样式继承默认白色 logo

## Task 1: 锁定白色品牌标识并建立玻璃按钮基类

**Files:**
- Modify: `e:/Leonardo_AIUX_Portfolio/My Previous Work/Kimi_Agent_首页动效分析/Kimi_Agent_首页动效分析/app/src/index.css`

- [ ] **Step 1: 记录当前旧状态**

Run:

```bash
rg -n "prefers-color-scheme: light|\\.brand-mark|\\.glass-panel|\\.accent-ring" "e:/Leonardo_AIUX_Portfolio/My Previous Work/Kimi_Agent_首页动效分析/Kimi_Agent_首页动效分析/app/src/index.css"
```

Expected:

```text
能看到 `.brand-mark` 的默认白色规则
能看到 `@media (prefers-color-scheme: light)` 中把 `.brand-mark` 改成黑色
当前还没有 `.glass-button-shell` 或 `.glass-button-core` 相关类
```

- [ ] **Step 2: 在 `index.css` 中替换品牌与按钮材质规则**

将 `@layer components` 中 `brand-mark`、`accent-ring` 附近的实现更新为下面这组代码：

```css
.brand-hitbox {
  height: 64px;
  padding: 10px 10px;
  border-radius: 12px;
  transition: transform 0.18s ease;
}

.brand-mark {
  height: 26px;
  width: 108px;
  display: inline-block;
  background: #fff;
  -webkit-mask-image: url("/docs/img/icon/Vector.svg");
  -webkit-mask-repeat: no-repeat;
  -webkit-mask-position: center;
  -webkit-mask-size: contain;
  mask-image: url("/docs/img/icon/Vector.svg");
  mask-repeat: no-repeat;
  mask-position: center;
  mask-size: contain;
  mask-mode: luminance;
}

.brand-hitbox:hover {
  transform: scale(1.04);
}

.glass-panel {
  background: rgba(11, 11, 11, 0.62);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow:
    0 24px 80px rgba(0, 0, 0, 0.28),
    inset 0 1px 0 rgba(255, 255, 255, 0.04);
  backdrop-filter: blur(22px) saturate(150%);
  -webkit-backdrop-filter: blur(22px) saturate(150%);
}

.accent-ring {
  position: relative;
}

.accent-ring::before {
  content: "";
  position: absolute;
  inset: -1px;
  border-radius: inherit;
  padding: 1px;
  background: linear-gradient(120deg, rgba(137, 170, 204, 0.7), rgba(78, 133, 191, 0.2));
  -webkit-mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  opacity: 0;
  transition: opacity 0.35s ease;
  pointer-events: none;
}

.accent-ring:hover::before {
  opacity: 1;
}

.glass-button-shell {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.16);
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.14), rgba(255, 255, 255, 0.02)),
    rgba(7, 7, 9, 0.42);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.16),
    inset 0 -1px 0 rgba(255, 255, 255, 0.06),
    0 18px 40px rgba(0, 0, 0, 0.22),
    0 6px 14px rgba(0, 0, 0, 0.18);
  backdrop-filter: blur(24px) saturate(165%);
  -webkit-backdrop-filter: blur(24px) saturate(165%);
  transition:
    transform 0.22s ease,
    box-shadow 0.22s ease,
    border-color 0.22s ease,
    background 0.22s ease;
}

.glass-button-shell::before {
  content: "";
  position: absolute;
  inset: 1px 1px auto;
  height: 54%;
  border-radius: inherit;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.24), rgba(255, 255, 255, 0));
  opacity: 0.88;
  pointer-events: none;
}

.glass-button-shell::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 1px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.42), rgba(167, 206, 232, 0.18) 42%, rgba(255, 255, 255, 0.08) 72%, rgba(255, 255, 255, 0.22));
  -webkit-mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  opacity: 0.96;
  pointer-events: none;
}

.glass-button-core {
  position: relative;
  z-index: 1;
  display: inline-flex;
  min-height: 52px;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  border-radius: 999px;
  padding: 0.9rem 1.5rem;
  color: rgba(255, 255, 255, 0.92);
}

.glass-button-sheen {
  position: absolute;
  inset: -24% 8% auto auto;
  z-index: 0;
  height: 140%;
  width: 44%;
  transform: rotate(16deg);
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.22), rgba(255, 255, 255, 0));
  filter: blur(10px);
  opacity: 0.34;
  pointer-events: none;
  transition: opacity 0.22s ease, transform 0.22s ease;
}

.glass-button-shell:hover {
  transform: translateY(-2px) scale(1.01);
  border-color: rgba(255, 255, 255, 0.22);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.22),
    inset 0 -1px 0 rgba(255, 255, 255, 0.08),
    0 22px 48px rgba(0, 0, 0, 0.24),
    0 8px 18px rgba(0, 0, 0, 0.2);
}

.glass-button-shell:hover .glass-button-sheen {
  transform: rotate(16deg) translate3d(-8%, 0, 0);
  opacity: 0.5;
}

.glass-button-shell:active {
  transform: translateY(1px) scale(0.99);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.16),
    inset 0 -1px 0 rgba(255, 255, 255, 0.05),
    0 12px 26px rgba(0, 0, 0, 0.18);
}

@media (prefers-reduced-motion: reduce) {
  .brand-hitbox,
  .glass-button-shell,
  .glass-button-sheen {
    transition: none;
  }

  .glass-button-shell:hover,
  .glass-button-shell:active {
    transform: none;
  }
}
```

- [ ] **Step 3: 运行诊断并确认样式文件无错误**

Run:

```bash
npm run build
```

Working directory:

```bash
e:/Leonardo_AIUX_Portfolio/My Previous Work/Kimi_Agent_首页动效分析/Kimi_Agent_首页动效分析/app
```

Expected:

```text
Vite build 成功
新的 docs/assets CSS 产物生成成功
```

- [ ] **Step 4: 提交共享样式改动**

```bash
git add "e:/Leonardo_AIUX_Portfolio/My Previous Work/Kimi_Agent_首页动效分析/Kimi_Agent_首页动效分析/app/src/index.css"
git commit -m "feat: add homepage glass button materials"
```

## Task 2: 替换 Hero 身份文案并接入新按钮结构

**Files:**
- Modify: `e:/Leonardo_AIUX_Portfolio/My Previous Work/Kimi_Agent_首页动效分析/Kimi_Agent_首页动效分析/app/src/sections/v3/HeroSection3.tsx`

- [ ] **Step 1: 确认当前旧文案与旧按钮 class**

Run:

```bash
rg -n "Product Manager|Design Engineer|accent-ring glass-panel" "e:/Leonardo_AIUX_Portfolio/My Previous Work/Kimi_Agent_首页动效分析/Kimi_Agent_首页动效分析/app/src/sections/v3/HeroSection3.tsx"
```

Expected:

```text
能看到 `Product Manager`
能看到 `Design Engineer`
三个 CTA 都还在使用 `accent-ring glass-panel`
```

- [ ] **Step 2: 替换主身份文案并重写三个 CTA 的 DOM 结构**

将 `HeroSection3.tsx` 中 `h1` 和三个 `<a>` 替换为下面实现：

```tsx
<h1
  className="text-balance text-white font-semibold leading-[1.08] tracking-[-0.03em]"
  style={{ fontSize: "clamp(42px, 6.5vw, 84px)" }}
>
  Hi I'm{" "}
  <span className="font-serif italic font-normal text-white">LeonardoLi黎铭晞</span>
  <br />
  <span
    className="bg-gradient-to-r from-[var(--page-accent-a)] to-[var(--page-accent-b)] bg-clip-text font-sans font-semibold text-transparent"
    style={{ paddingBottom: 2 }}
  >
    Design Manager
  </span>
  <span className="mt-3 block text-[0.24em] uppercase tracking-[0.28em] text-white/42">
    Design Engineer
  </span>
</h1>
```

```tsx
<Reveal delay={0.34} className="mt-9 flex w-full flex-col items-center justify-center gap-3 lg:flex-row lg:gap-4">
  <a href="#works" className="glass-button-shell w-full sm:w-[min(520px,100%)]">
    <span className="glass-button-sheen" aria-hidden="true" />
    <span className="glass-button-core text-[12px] tracking-[0.08em]">
      <strong className="font-sans font-semibold tracking-normal">查看项目</strong>
      <span aria-hidden="true">→</span>
    </span>
  </a>
  <a href="/docs/resume.html" className="glass-button-shell w-full sm:w-[min(520px,100%)]">
    <span className="glass-button-sheen" aria-hidden="true" />
    <span className="glass-button-core text-[12px] tracking-[0.08em]">
      <strong className="font-sans font-semibold tracking-normal">查阅简历</strong>
      <span aria-hidden="true">→</span>
    </span>
  </a>
  <a href="/docs/art/index.html" className="glass-button-shell w-full sm:w-[min(520px,100%)]">
    <span className="glass-button-sheen" aria-hidden="true" />
    <span className="glass-button-core text-[12px] tracking-[0.08em]">
      <strong className="font-sans font-semibold tracking-normal">艺术创想</strong>
      <span aria-hidden="true">→</span>
    </span>
  </a>
</Reveal>
```

- [ ] **Step 3: 运行构建并检查 TypeScript / JSX 是否正常**

Run:

```bash
npm run build
```

Expected:

```text
TypeScript 编译通过
Vite build 成功
`docs/index.html` 指向新的 CSS/JS 产物
```

- [ ] **Step 4: 提交 Hero 改动**

```bash
git add "e:/Leonardo_AIUX_Portfolio/My Previous Work/Kimi_Agent_首页动效分析/Kimi_Agent_首页动效分析/app/src/sections/v3/HeroSection3.tsx"
git commit -m "feat: update homepage identity and CTA markup"
```

## Task 3: 浏览器验收首页视觉结果

**Files:**
- Verify: `e:/Leonardo_AIUX_Portfolio/docs/index.html`
- Verify: `e:/Leonardo_AIUX_Portfolio/docs/assets/*`

- [ ] **Step 1: 启动本地静态服务**

Run:

```bash
python -m http.server 8000
```

Working directory:

```bash
e:/Leonardo_AIUX_Portfolio
```

Expected:

```text
本地服务启动在 http://localhost:8000
```

- [ ] **Step 2: 打开首页并做人工验收**

Open:

```text
http://localhost:8000/docs/index.html?verify=glass
```

Expected checklist:

```text
左上角 logo 默认白色
Hero 中央 logo 默认白色
主身份只显示 `Design Manager`
页面中不再出现 `Product Manager`
`Design Engineer` 仍保留，但更弱
三个按钮默认即有玻璃边缘，不靠 hover 才成立
hover 有轻微上浮和高光增强
active 有轻微按压感
按钮文字始终清晰可读
```

- [ ] **Step 3: 检查诊断与控制台**

Run:

```bash
rg -n "Product Manager" "e:/Leonardo_AIUX_Portfolio/docs/index.html" "e:/Leonardo_AIUX_Portfolio/docs/assets"
```

Expected:

```text
不再命中 `Product Manager`
```

Browser expected:

```text
首页控制台无新的站点自身错误
网络请求仍只指向本地 docs 资源
```

- [ ] **Step 4: 提交发布产物**

```bash
git add "e:/Leonardo_AIUX_Portfolio/docs/index.html" "e:/Leonardo_AIUX_Portfolio/docs/assets"
git commit -m "feat: ship homepage design manager and glass CTAs"
```

## 自检结果

### Spec coverage

- logo 默认白色：Task 1
- 主身份改为 `Design Manager`：Task 2
- `Design Engineer` 弱化：Task 2
- skeuomorphic glass 按钮：Task 1 + Task 2
- hover / active / reduced-motion：Task 1
- 浏览器验收：Task 3

### Placeholder scan

- 计划中没有 `TODO`、`TBD`、`之后再做`
- 所有命令、路径、改动代码块都已给出

### Type consistency

- 共享类名统一为 `glass-button-shell`、`glass-button-core`、`glass-button-sheen`
- Hero 中引用的类名与 `index.css` 中定义保持一致
