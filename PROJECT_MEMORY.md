# Leonardo Li - 作品集内容理解记忆 (PROJECT_MEMORY)

本文档旨在记录 Leonardo Li 作品集核心项目的理解，基于 PDF、简历及方案文件总结。

## 1. 简职 JianCareer (AI 求职工具平台)
- **核心定位**：AI Agent 驱动的一站式求职助手。技术报告 B07 0662（大模型多 Agent 架构）。
- **背景/痛点**：应届生求职重复性高、网申入口割裂、职业建议缺乏结构。
- **我的角色**：UI / Product Designer（0→1 体验与组件规范）+ 前端原型（Vibe Coding）。
- **体验骨架**：三入口同一用户模型——注册建档 / Dashboard / 浏览器插件；信息只录入一次。
- **重点三点闭环（面试必须可演示）**：
    1. **经历锚定的简历适配**：Profile → JD Evidence → Gap → Suggested Rewrite → User Review。不编造经历，Diff + Confirm。
    2. **可控 Agent 交互**：Understand → Explain → Propose → Preview → Confirm → Act → Recover。平衡适配度与真实性。
    3. **投递反馈飞轮**：Apply → Record → Track → Outcome → Feedback → Next Rec。Tracker 看成功率 / 面试通过率，反哺 Mentor。
- **核心功能**：结构化 AI Mentor（不做纯对话框）、渐进式建档、插件一键填写、Job Tracker、公司洞察。
- **设计系统**：Token 驱动（Reference → Semantic → Component → Density），Web + Plugin 双密度，业务组件（JobCard / MatchScore / AgentStatus）。
- **成就**：AI Agent 2025 toC 榜单 TOP 10%，伯乐与千里马分榜 TOP 1。
- **资产路径**：`jiancareer/` 原型与组件库；`docs/cases/Jiancareer.html` 案例页；Figma CODEX `N5JvV8Vpa1CCiXQuN9BRSk`。

## 2. Anxious Kit (可穿戴情绪辅助系统)
- **核心定位**：通过生理信号与 AI Agent 提供即时情绪反馈和长期管理。
- **核心痛点**：高压日常下的情绪觉察与低负担采样。
- **交互创新**：将情绪记录转化为低负担的事件标记与回顾反思。

## 3. StoryVibe (AI 视频叙事中间层)
- **核心定位**：将创作者模糊想法转化为结构化脚本与分镜工作流。
- **核心价值**：低门槛创作 + 快速反馈 + 可迭代产出。
- **当前状态**：Ongoing，已形成 Figma Slides 策划案与 Kimi 原型测试界面。

## 4. AdventureX - MemoryLens (AI 记忆辅助系统)
- **核心定位**：VisionPro 载体的 MR 寻物程序，辅助老年人记忆日常物品。
- **技术栈**：VisionOS + YOLO 视觉识别 + Dify LLM 工作流 + Python。
- **交互特点**：视觉定位 + 语音引导 + 情感陪伴。
- **产出**：杭州黑客松项目，48h 高压开发，完成可运行 Demo 并开源。

## 5. 儿童机器人 - AI 启蒙代练屋 (Toys)
- **核心定位**：AI 教育玩具，通过多模态交互与家长端报告提升趣味学习。
- **核心洞察**：平衡“教育效果可视化”与儿童“趣味互动”。
- **产品形态**：基于通义大模型的 AI 玩具鸭，支持场景化交互与情感反馈（“模拟行为+过家家”）。
- **成就**：Xbot 科创夏令营“最佳用户洞察奖”，5万元创业资金。

## 6. Twin City Tales (双城数据叙事网站)
- **核心定位**：深港边境通勤信息可视化叙事网站。
- **研究方法**：2021-2025 香港客流数据 + 建筑学城市界面叙事 + 田野调查。
- **技术实现**：D3.js 前端实现。
- **成就**：IEEE PacificVis 2026 Sydney Shortlist。

---
## 总结：核心竞争力
- **Vibe Coding 能力**：使用 TRAE/Lovable 快速将设计稿转化为可运行的前端原型。
- **AI 交互深度**：不局限于 Chatbot，探索多模态（VisionPro/教育硬件/实时影像）交互。
- **跨学科背景**：建筑学背景带来的空间叙事思维与复杂系统处理能力。
