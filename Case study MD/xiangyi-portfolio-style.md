\---

## name: xiangyi-portfolio-style

## （Weblink）https://xiangyidesign.com/project


description: "Xiangyi Design 大厂设计师作品集风格参考系统。适用于需要构建'Notion式长文叙事 + 项目详情页'风格的作品集——深色背景、左侧目录导航、Before/After对比、serif标题字体、过程稿展示、设计决策叙事。触发关键词：Notion风格作品集、项目详情页、长文叙事、Before/After对比、设计过程展示、设计师作品集详情、TikTok风格项目页。"
---

# Xiangyi Design 设计系统

## 核心设计哲学

**"设计即叙事"** — 每个项目不是展示最终成品，而是讲述一个完整的设计故事：从发现问题 → 分析过程 → 关键决策 → 最终产出 → 反思收获。访客通过阅读你的思考过程来评估你的设计能力。

## 视觉系统

### 色彩

|Token|值|用途|
|-|-|-|
|`--bg-primary`|`#000000`|主背景，纯黑|
|`--bg-elevated`|`rgba(255,255,255,0.03)`|卡片/ elevated表面|
|`--text-primary`|`#ffffff`|主要文字|
|`--text-secondary`|`rgba(255,255,255,0.6)`|次要文字|
|`--text-tertiary`|`rgba(255,255,255,0.4)`|辅助文字|
|`--accent`|`#ffffff`|强调（白色，极简）|
|`--border`|`rgba(255,255,255,0.08)`|边框线|
|`--highlight-bg`|`rgba(255,255,255,0.06)`|高亮块背景|

### 字体层级

|层级|字体|大小|字重|字间距|用途|
|-|-|-|-|-|-|
|H1|Serif (Playfair Display / Times)|48px|400|-0.02em|项目大标题|
|H2|Serif|32px|400|-0.01em|章节标题|
|H3|Sans-serif (Inter)|18px|600|0|小节标题|
|Body|Sans-serif|16px|400|0|正文|
|Caption|Sans-serif|14px|400|0.02em|图片说明|
|Label|Sans-serif|12px|600|0.08em|分类标签（大写）|
|Nav|Sans-serif|14px|400|0|目录导航|

### 空间

* 内容最大宽度：`900px`
* 侧边导航宽度：`280px`
* 内容区padding：`64px`
* 元素间距：`48px`（章节间）、`24px`（段间距）
* 行高：正文 `1.8`、标题 `1.3`

## 布局架构

### 项目详情页结构

```
┌──────────────────────────────────────────────────────┐
│  Navbar (fixed, minimal)                              │
├──────────────────────────────────────────────────────┤
│                                                      │
│              Project Hero                             │
│         \[大标题 - Serif字体]                          │
│         \[一句话描述]                                   │
│                                                      │
├──────────────────────────────────────────────────────┤
│                                                      │
│  ┌──────────────┐  ┌──────────────────────────────┐  │
│  │              │  │                               │  │
│  │   Context    │  │   Meta Bar:                  │  │
│  │   How        │  │   ROLE / CREDITS / TIME      │  │
│  │   Foundation │  │                               │  │
│  │   Core       │  │   \[内容区...]                 │  │
│  │   Iterations │  │                               │  │
│  │   Unique \&   │  │   H2 Section Title            │  │
│  │   Key        │  │   \[正文段落]                   │  │
│  │   Innovations│  │                               │  │
│  │   Design     │  │   \[图片/视频]                  │  │
│  │   Engineering│  │   Caption                     │  │
│  │              │  │                               │  │
│  │              │  │   Callout Block               │  │
│  │              │  │                               │  │
│  └──────────────┘  └──────────────────────────────┘  │
│       ↑ TOC              ↑ Main Content               │
│   (fixed left)        (scrollable right)              │
└──────────────────────────────────────────────────────┘
```

### 作品一览页结构

```
┌──────────────────────────────────────────────────────┐
│  \[Yi] · Work · Index  ← 顶部简洁导航                  │
├──────────────────────────────────────────────────────┤
│                                                      │
│  All(6)  Product(3)  Tech(2)  Creative(1)           │
│                                                      │
│  ┌──────────────┐  ┌──────────────┐                  │
│  │  大图卡片     │  │   卡片        │                  │
│  │  \[项目截图]   │  │  \[项目截图]    │                  │
│  │              │  │              │                  │
│  │  项目名称     │  └──────────────┘                  │
│  │  角色 · 时间  │                                   │
│  └──────────────┘                                   │
│                                                      │
└──────────────────────────────────────────────────────┘
```

## 核心组件

### 1\. Table of Contents（左侧目录导航）

* 固定定位，左侧 `280px`
* 顶部返回链接：`<- Back to Index`
* 标题："Contents" 小写灰色
* 章节链接列表：

  * 主章节：`font-size: 14px; color: rgba(255,255,255,0.6)`
  * 子章节：`padding-left: 16px; font-size: 13px`
* 激活状态：`color: white;` 左侧加白色竖线指示器
* 滚动时自动高亮当前章节

### 2\. Meta Bar（元信息栏）

* 三列网格：`ROLE | CREDITS | TIME`
* 列标题：`12px; uppercase; letter-spacing: 0.08em; color: rgba(255,255,255,0.4)`
* 内容：`14px; color: rgba(255,255,255,0.6)`
* 底部分隔线：`1px solid rgba(255,255,255,0.08)`

### 3\. Before/After Comparison

* 左右并排，中间有可拖拽的分割线
* 或上下两张图，分别标注 "Before" / "After"
* 容器：`border-radius: 8px; overflow: hidden`
* 标签：`position: absolute; top: 12px; left/right: 12px`
* 标签样式：黑色背景 + 白色文字 + 圆角

### 4\. Callout Block（信息框）

```css
.callout {
  background: rgba(255,255,255,0.04);
  border-left: 3px solid rgba(255,255,255,0.3);
  border-radius: 4px;
  padding: 20px 24px;
  margin: 32px 0;
}
```

* 用于强调设计决策、关键洞察、个人反思
* 可选变体：💡 Insight / ⚡ Decision / 🎯 Takeaway

### 5\. Image Block（图片块）

```css
.image-block {
  border-radius: 8px;
  overflow: hidden;
  margin: 32px 0;
}
.image-caption {
  font-size: 14px;
  color: rgba(255,255,255,0.4);
  margin-top: 12px;
}
```

### 6\. Process Timeline（过程时间线）

* 左侧垂直线 + 节点圆点
* 每个节点：阶段标题 + 内容描述
* 阶段标签：Phase 1, Phase 2, Phase 3...

### 7\. Mini Browser Preview（迷你浏览器预览）

* 右下角固定的小窗口
* 模拟浏览器外壳：地址栏 + 内容区
* 用于展示网站实际效果
* `position: fixed; bottom: 24px; right: 24px;`
* 尺寸约 `320px × 240px`

## 动效系统

### 页面入场

* 内容区 `opacity: 0 → 1`，`duration: 600ms`
* TOC从左侧滑入

### 滚动触发

* 图片进入视口时 `opacity: 0 → 1` + `translateY(20px → 0)`
* `duration: 400ms; easing: ease-out`

### 目录高亮

* 滚动时自动高亮当前章节
* 高亮切换：`transition: color 200ms`

## 叙事结构模板

每个项目详情页遵循以下叙事结构：

```
1. Context（背景）
   - 项目一句话概述
   - 要解决的问题/机会点
   - 我加入时的状况

2. How \[项目名] drive growth（如何驱动增长）
   - 核心策略概述
   - Before/After对比

3. The Foundation（基础）
   - 设计规范建立
   - 流程梳理
   - 团队对齐

4. Core Iterations, Steady Growth（核心迭代）
   - 关键迭代1：问题→方案→结果
   - 关键迭代2：问题→方案→结果
   - 关键迭代3：问题→方案→结果

5. Unique and Key Innovations（关键创新）
   - 独特贡献
   - 技术创新点
   - 设计突破

6. Design Engineering（设计工程）
   - 技术实现细节
   - 工具链
   - 代码与设计结合

7. Reflection（反思）
   - 学到了什么
   - 如果重新做会怎样
   - 对职业发展的影响
```

## 参考网站

* https://xiangyidesign.com/project
* https://xiangyidesign.com/tiktokweb

