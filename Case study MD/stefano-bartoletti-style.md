---
name: stefano-bartoletti-style
（Weblink）https://www.stefanobartoletti.it/

description: "Stefano Bartoletti 个人作品集网站设计风格参考系统。适用于需要构建'操作系统界面隐喻'风格的作品集网站——将网页呈现为桌面OS窗口，包含标题栏、侧边Dock、状态栏、3D浮动元素。触发关键词：OS风格作品集、窗口隐喻、开发者作品集、复古未来主义、操作系统UI、绿色主题作品集。"
---

# Stefano Bartoletti 设计系统

## 核心设计哲学

**"开发者即操作系统"** — 将网页呈现为一个运行中的操作系统界面，访客不是在浏览网页，而是在操作一个为开发者量身定制的桌面环境。

## 视觉系统

### 色彩

| Token | 值 | 用途 |
|-------|-----|------|
| `--bg-primary` | `#0a0a0f` | 主背景，深黑带微蓝 |
| `--bg-window` | `rgba(10,10,15,0.95)` | 窗口面板背景 |
| `--accent-green` | `#4ade80` | 主强调色，荧光绿 |
| `--accent-glow` | `rgba(74,222,128,0.3)` | 光晕/发光效果 |
| `--text-primary` | `#e8e8e8` | 主要文字 |
| `--text-dim` | `#6b7280` | 次要文字 |
| `--text-green` | `#4ade80` | 强调文字 |
| `--border` | `rgba(255,255,255,0.08)` | 边框线 |

### 字体
- **标题**：`font-family: 'Inter', -apple-system, sans-serif; letter-spacing: -0.02em;`
- **代码/装饰**：等宽字体，用于括号、花括号等代码符号
- **正文**：系统默认sans-serif，14px，行高1.6

### 空间
- 窗口圆角：`border-radius: 12px`
- 内部padding：`24px`
- 元素间距：`16px` 标准间隔
- Dock宽度：`64px`

## 布局架构（OS Window Metaphor）

```
┌─────────────────────────────────────────────────────────────┐
│ [●] [●] [●]  stefano <bartoletti>              [Search] [_] │  ← Title Bar
├────────┬────────────────────────────────────────────────────┤
│        │                                                    │
│  [H]   │           Main Content Area                       │
│  [A]   │                                                    │
│  [W]   │    Hero: 3D floating brackets + gradient          │
│  [E]   │          "I build accessible" [websites]           │
│  [C]   │                                                    │
│        │    Project Grid: 01 02 03 cards                    │
│        │                                                    │
├────────┴────────────────────────────────────────────────────┤
│  Italy, Europe · 12:47 PM · GitHub · LinkedIn · ...        │  ← Status Bar
└─────────────────────────────────────────────────────────────┘
       ↑
    Left Dock (vertical, icon + label)
```

### 三大结构组件

#### 1. Title Bar（标题栏）
- 顶部固定，高度 `48px`
- 左侧：三个圆点（红/黄/绿 = 关闭/最小化/最大化）
- 中间：网站标题 `stefano <bartoletti>`，`<bartoletti>` 用绿色高亮
- 右侧：搜索图标、窗口控制按钮
- 底部边框：`1px solid var(--border)`

#### 2. Left Dock（侧边导航）
- 左侧固定，宽度 `64px`
- 垂直排列的图标按钮
- 每个按钮：图标 + 下方小标签（Home, About, Work, Experiments, Contact）
- 激活状态：绿色图标 + 左侧绿色指示条
- Hover：背景色轻微变化

#### 3. Status Bar（状态栏）
- 底部固定，高度 `40px`
- 左侧：地理位置（"Italy, Europe"）+ 实时当地时间
- 右侧：社交链接图标（GitHub, LinkedIn, Mastodon, RSS）
- 分隔符：`·` 圆点

## 动效系统

### 3D浮动几何体（Hero区核心）
- 元素：花括号 `{}`、方括号 `[]`、尖括号 `<>`、`/` 等代码符号
- 使用Three.js或纯CSS 3D transform实现
- 每个符号缓慢旋转 + 上下浮动
- 颜色：绿色渐变或半透明绿色
- 视差效果：鼠标移动时几何体轻微偏移

```css
.floating-bracket {
  animation: float-rotate 20s ease-in-out infinite;
  transform-style: preserve-3d;
}
@keyframes float-rotate {
  0%, 100% { transform: translateY(0) rotateY(0deg); }
  50% { transform: translateY(-20px) rotateY(180deg); }
}
```

### 文字高亮动画
- 关键词用绿色高亮
- 可选：打字机效果逐字显示

### 窗口控制交互
- 点击关闭按钮：窗口抖动动画后"关闭"
- 点击最小化：窗口缩小到Dock
-  Hover圆点：显示工具提示

## 组件规范

### Project Card（项目卡片）
```
┌──────────────────────────────┐
│  01                          │  ← 编号（大号绿色）
│                              │
│  [项目名称]                  │
│  简短描述                    │
│                              │
│  [Vue] [Nuxt] [CSS]         │  ← 技术栈标签
└──────────────────────────────┘
```
- 背景：`rgba(255,255,255,0.02)`
- 边框：`1px solid var(--border)`
- 圆角：`12px`
- Hover：边框变绿 + 轻微上浮

### Tech Tag（技术标签）
- 背景：透明或微弱绿色底
- 文字：绿色
- 圆角：`4px`
- 字号：`12px`

## 页面路由
| 路由 | 内容 |
|------|------|
| `/` | Home - Hero + 项目列表 |
| `/about` | About - 个人介绍 + 技术栈 |
| `/work` | Work - 完整项目列表 |
| `/experiments` | Experiments - 实验性小项目 |
| `/contact` | Contact - 联系方式 |

## 参考网站
- https://www.stefanobartoletti.it/
