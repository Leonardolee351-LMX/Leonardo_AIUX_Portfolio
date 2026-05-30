---
name: "ui-ux-pro-max"
description: "提供跨平台 UI/UX 设计智能与质量检查。用户要求设计/改进界面、组件、样式、可用性或无障碍时调用。"
---

# UI/UX Pro Max（Trae 版）

本技能是对 UI/UX Pro Max 思维框架的 Trae 适配版，用于在做 Web / Mobile UI 时给出可执行的设计系统建议、实现约束与交付前检查清单。

来源参考：<https://github.com/nextlevelbuilder/ui-ux-pro-max-skill>

## 何时启用

当任务会改变一个功能的外观、层级、交互、可读性、可用性、动效或无障碍时，必须启用本技能。

### 必须用

- 新页面/新流程设计（Landing、Dashboard、Admin、SaaS、Mobile）
- 组件设计/重构（Button、Modal、Form、Table、Chart、Navbar、Sidebar 等）
- 颜色、字体、排版、间距、栅格、阴影、圆角等设计系统决策
- UI 代码评审：一致性、可用性、无障碍、交互状态、响应式
- 需要“更专业”“更清晰”“更好用”但原因不明确时

### 不需要用

- 纯后端/接口/数据库/DevOps
- 与界面无关的性能优化或脚本任务

## 工作方式（输出结构）

每次处理 UI/UX 任务时，按以下结构输出，保证可落地：

1. 目标与约束：用户目标、平台（Web/iOS/Android）、技术栈、受众、品牌调性、交付物
2. 设计系统：风格、色板、字体配对、排版与间距标尺、组件半径/阴影/动效基准、图标策略
3. 页面结构：信息层级、关键区块、导航模式、主要 CTA、状态与空态
4. 实现要点：组件拆分、状态机、响应式断点、可访问性属性、性能注意事项
5. 交付前检查清单：按优先级逐项核对

## 规则优先级（先保底，再变美）

按 1→10 的顺序决策与检查：

1. 无障碍（Accessibility）：对比度、键盘可达、焦点可见、语义结构、替代文本
2. 触控与交互：触控目标、反馈、加载态、避免“只靠 hover”
3. 性能体验：图片与字体加载、CLS、首屏可用、长列表
4. 风格选择：与产品类型匹配，避免风格混杂、避免用 emoji 当图标
5. 响应式与布局：移动优先、断点体系、内容不横向滚动、可读行宽
6. 字体与颜色：字号/行高/字重体系、语义色 token、暗色模式配对
7. 动效：150–300ms、transform/opacity、尊重 reduced-motion
8. 表单与反馈：可见标签、就近错误提示、渐进披露
9. 导航：可预测返回、移动端底部导航≤5、深链与状态保持
10. 图表与数据：图例/tooltip、不可只靠颜色表达信息

## 快速清单（必须满足）

### 无障碍

- 普通文本对比度 ≥ 4.5:1（大字 ≥ 3:1）
- 交互元素有清晰 focus ring（不要移除）
- 图标按钮必须有可读标签（aria-label / accessibilityLabel）
- 表单用真实 label（不要只靠 placeholder）
- 支持键盘操作：Tab 顺序与视觉一致，Esc 可退出模态
- 尊重 prefers-reduced-motion

### 触控与交互

- 点击目标≥44×44（或等效命中区）
- 重要动作有按下/悬停/禁用/加载态
- 不把关键交互藏在 hover（移动端不可用）

### 响应式与排版

- Mobile-first：375 / 768 / 1024 / 1440（或项目既定断点）
- 移动端正文不小于 16px，行高 1.5–1.75
- 控制行宽：桌面端 60–75 字符/行
- 避免横向滚动；固定元素需要留出安全区/内容间距

### 性能体验

- 图片用 WebP/AVIF，非首屏用 lazy loading
- 给图片/媒体声明宽高或 aspect-ratio，避免 CLS
- 字体用 font-display: swap/optional，避免 FOIT

## 常见输出模板

### 设计系统（简版）

- 产品类型：<一句话>
- 风格：<1 个主风格 + 2–3 个关键词>
- 色板：Primary/Secondary/CTA/Background/Text + 语义色（success/warn/error）
- 字体：Heading / Body（含字重与字号标尺）
- 组件基准：radius、shadow、border、spacing scale（4/8 系统）
- 动效基准：150–300ms，ease-out 进入 / ease-in 退出

### 交付前检查（简版）

- 可访问性：对比度 / focus / aria / 键盘
- 状态：hover/pressed/disabled/loading/empty/error
- 响应式：375/768/1024/1440 下布局与触控
- 性能：图片尺寸、懒加载、CLS、字体加载策略

