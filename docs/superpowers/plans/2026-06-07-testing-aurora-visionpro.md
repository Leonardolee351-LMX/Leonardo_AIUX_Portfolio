# Testing Aurora Vision Pro UI Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将 [testing.html](file:///e:/Leonardo_AIUX_Portfolio/docs/testing.html) 升级为 Vision Pro 风格玻璃 UI + 极光流苏 WebGL 背景（含 A2 鼠标搅动与轻微拖尾残留），并用 GSAP 编排 UI 入场与参数 level/fade（含 reduced-motion），完成本地验证并勾选 `.trae/specs/.../tasks.md` 与 `checklist.md`。

**Architecture:** 保持 Three.js `ShaderMaterial` 渲染全屏背景，新增 ping-pong `WebGLRenderTarget` 反馈通道做尾迹；前景 UI 通过 CSS tokens 实现玻璃组件系统；GSAP 负责 UI 进入动效与背景参数 tween（不参与流体渲染）；WebGL/GSAP 失败时降级到静态背景与无编排 UI。

**Tech Stack:** HTML/CSS/JS（无构建）、Three.js（CDN）、GSAP（CDN + 降级）、WebGL RenderTarget ping-pong、`prefers-reduced-motion`（`gsap.matchMedia()` + CSS）。

---

## File Map

- Modify: [testing.html](file:///e:/Leonardo_AIUX_Portfolio/docs/testing.html)
- Create: [testing.css](file:///e:/Leonardo_AIUX_Portfolio/docs/testing.css)
- Create: [testing.js](file:///e:/Leonardo_AIUX_Portfolio/docs/testing.js)
- Modify: [.trae/specs/enhance-testing-aurora-visionpro/tasks.md](file:///e:/Leonardo_AIUX_Portfolio/.trae/specs/enhance-testing-aurora-visionpro/tasks.md)
- Modify: [.trae/specs/enhance-testing-aurora-visionpro/checklist.md](file:///e:/Leonardo_AIUX_Portfolio/.trae/specs/enhance-testing-aurora-visionpro/checklist.md)

---

### Task 1: 页面结构与资源拆分

**Files:**
- Modify: [testing.html](file:///e:/Leonardo_AIUX_Portfolio/docs/testing.html)
- Create: [testing.css](file:///e:/Leonardo_AIUX_Portfolio/docs/testing.css)
- Create: [testing.js](file:///e:/Leonardo_AIUX_Portfolio/docs/testing.js)

- [ ] **Step 1: 将内联 CSS/JS 拆分为外链文件**

在 `docs/testing.html`：
- 移除 `<style>` 与内联 `<script>` 主体
- 增加外链：`<link rel="stylesheet" href="./testing.css">`、`<script src="./testing.js" defer></script>`
- 继续使用 Three.js CDN（或替换为项目已有版本，但需确认不破坏）

- [ ] **Step 2: 引入 GSAP CDN（可失败降级）**

在 `docs/testing.html`：
- 增加 `<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js"></script>`（或同等可靠 CDN）
- `docs/testing.js` 中检测 `window.gsap` 是否存在；不存在则走 no-op 动效分支（不报错、不阻塞页面）

- [ ] **Step 3: 确认静态资源路径正确**

本地用静态服务器访问 `http://localhost:<port>/docs/testing.html`，确保 `testing.css/testing.js` 均被加载且无 404。

---

### Task 2: Vision Pro 玻璃组件系统

**Files:**
- Create/Modify: [testing.css](file:///e:/Leonardo_AIUX_Portfolio/docs/testing.css)
- Modify: [testing.html](file:///e:/Leonardo_AIUX_Portfolio/docs/testing.html)

- [ ] **Step 1: 定义 glass tokens（opacity/blur/border/highlight/shadow）**

在 `:root` 定义 tokens：
- `--glass-bg`, `--glass-border`, `--glass-highlight`, `--glass-shadow`, `--glass-blur`
- `--text-primary`, `--text-secondary`
- `--radius-*`, `--space-*`
- `--hit-area-min: 44px`

- [ ] **Step 2: 实现玻璃基础面 `.glass-surface`**

需要覆盖：
- 透明底色 + `backdrop-filter: blur(...)`（支持性不足时退化为半透明）
- 细边框 + 顶部高光（渐变）
- 深色阴影 + 内阴影（提升可读性）

- [ ] **Step 3: 组件：nav/button/card/chip**

实现类（命名可按现有风格调整，但保持一致）：
- `.glass-nav` `.glass-btn` `.glass-card` `.glass-chip`
- `:hover`、`:active`、`:focus-visible`、`:disabled`（或 `.is-disabled`）
- 保证键盘可达（`button/a` 元素 + focus-visible 样式）

- [ ] **Step 4: 可读性策略**

在 `main` 文本区域增加：
- 局部玻璃底板或遮罩（例如 `::before` 渐变层）
- 文字阴影/描边策略（适度，不糊）

---

### Task 3: 极光流苏背景升级（Three.js + ping-pong 尾迹）

**Files:**
- Create: [testing.js](file:///e:/Leonardo_AIUX_Portfolio/docs/testing.js)
- Modify: [testing.html](file:///e:/Leonardo_AIUX_Portfolio/docs/testing.html)

- [ ] **Step 1: WebGL 可用性检测与回退背景**

在 `testing.js`：
- 尝试创建 `WebGLRenderer`，失败则：
  - 在 `body` 或 `#canvas-container` 施加 CSS 静态背景（渐变 + 噪点）
  - 仍执行 UI 动效分支（如果 gsap 存在）

- [ ] **Step 2: Shader 输入扩展（拖尾/曝光控制）**

在 fragment shader 增加 uniforms：
- `uPrevTex`（上一帧纹理）
- `uTrailDecay`（残影衰减 0..1）
- `uLevel`（交互强度 0..1）
- `uExposure` / `uBloom`（或等价参数，用于不过曝控制）

输出策略：
- 先计算 “暗底 + 明确前缘高亮 + 柔尾”
- 对高亮做 soft clamp / tone-map，避免大面积发白

- [ ] **Step 3: ping-pong RenderTarget 反馈通道**

在 `testing.js`：
- 创建 `rtA/rtB` 两个 `WebGLRenderTarget`
- 每帧渲染时：
  - 将上帧 RT 的 texture 作为 `uPrevTex`
  - 渲染输出到另一个 RT
  - 最后把当前 RT 渲染到屏幕（或屏幕 quad 直接使用当前 RT）
  - 交换 A/B

- [ ] **Step 4: A2 鼠标交互（局部搅动 + 轻微拖尾残留）**

实现 level/fade：
- 鼠标移动时：`targetLevel = 1`
- 停止移动一段时间：`targetLevel -> 0`（由 GSAP tween）
- shader 内用 `uLevel` 控制鼠标场的影响半径/强度

---

### Task 4: GSAP 动效编排（UI 节奏 + 参数 tween + reduced-motion）

**Files:**
- Modify: [testing.js](file:///e:/Leonardo_AIUX_Portfolio/docs/testing.js)
- Modify: [testing.html](file:///e:/Leonardo_AIUX_Portfolio/docs/testing.html)

- [ ] **Step 1: UI 入场动效（stagger + ease）**

若 `window.gsap` 存在：
- header、main、cards、footer 做统一节奏入场
- 控制时长 150–600ms，避免闪现

- [ ] **Step 2: 背景参数 tween（level/fade + 曝光/拖尾）**

用 GSAP tween 这些运行参数（`testing.js` 内一个 `params` 对象）：
- `level`（交互强度）
- `trailDecay`（残影衰减）
- `exposure/bloom`（或等价参数）

并在 render loop 每帧同步到 uniforms。

- [ ] **Step 3: reduced-motion 策略**

使用 `gsap.matchMedia()`：
- `prefers-reduced-motion: reduce` 命中后降低：
  - 时间因子（uTime 速度）
  - `level` 上限
  - 尾迹强度（增大 decay 或直接关闭反馈）

---

### Task 5: 验证与打勾

**Files:**
- Modify: [.trae/specs/enhance-testing-aurora-visionpro/tasks.md](file:///e:/Leonardo_AIUX_Portfolio/.trae/specs/enhance-testing-aurora-visionpro/tasks.md)
- Modify: [.trae/specs/enhance-testing-aurora-visionpro/checklist.md](file:///e:/Leonardo_AIUX_Portfolio/.trae/specs/enhance-testing-aurora-visionpro/checklist.md)

- [ ] **Step 1: 本地静态服务器验证**

在仓库根目录启动静态服务器（任意一种）：

```bash
python -m http.server 5173
```

打开：
- `http://localhost:5173/docs/testing.html`

验收：
- 无控制台报错
- 背景默认不过曝（亮部仅在前缘，整体不泛白）
- 鼠标扰动为 A2 且有拖尾残留，停止移动后平滑衰减
- UI 玻璃组件可读、可交互、命中区 ≥44px
- `prefers-reduced-motion: reduce` 下动效显著降低（可接受的低频变化或近静态）
- WebGL 不可用时有回退背景

- [ ] **Step 2: 勾选 tasks.md 与 checklist.md**

将 `.trae/specs/enhance-testing-aurora-visionpro/tasks.md` 内所有子项勾选为完成，并保证依赖关系仍成立。

将 `.trae/specs/enhance-testing-aurora-visionpro/checklist.md` 内所有项勾选为完成。

---

## Plan Self-Review (Filled)

- Spec coverage: 文件拆分、玻璃 UI、极光流苏（A2 + level/fade + 拖尾 + 不过曝 + 回退）、GSAP 编排与 reduced-motion、验证与打勾均有对应任务。
- Placeholder scan: 无 TBD/TODO。
- Consistency: 参数命名统一采用 `params` → uniforms 同步；RenderTarget ping-pong 用 `uPrevTex + uTrailDecay` 反馈实现。
