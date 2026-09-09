(function () {
  const KEY = "jc_lab_v1";

  const DEFAULT_PROFILE = {
    name: "陈宇航",
    project: "新一代室内智能摄像头",
    role: "硬件产品经理 / 智能硬件产品经理",
    time: "2023.04 – 至今",
    packId: "chen-hw",
    bullets: [
      { id: "cy1", text: "基于用户访谈、电商评价及售后数据分析超过2,000条用户反馈，识别「夜视效果、误报率、隐私保护、安装便捷性」为核心用户需求。", locked: true },
      { id: "cy2", text: "完成产品定位、用户场景、核心功能及硬件规格定义。", locked: true },
      { id: "cy3", text: "联合研发确定SoC、Sensor、镜头、Wi-Fi模组及存储方案。", locked: true },
      { id: "cy4", text: "协调ID、结构、电子、算法、App、供应链等8个团队推进产品开发。", locked: true },
      { id: "cy5", text: "负责EVT、DVT、PVT阶段产品验收及问题优先级管理。", locked: true },
      { id: "cy6", text: "通过器件替代和结构优化推动BOM成本下降。", locked: true },
      { id: "cy7", text: "立项到量产约9个月；BOM较初始方案降低12%；夜视有效距离提升约30%；AI误报率降低25%；上市6个月销量超过8万台；电商评分4.2提升至4.6/5.0。", locked: true }
    ]
  };

  const SAMPLE_JD = `Agent前端开发工程师 - 飞书
团队介绍：飞书是字节跳动旗下 AI 工作平台，面向人与agent协作，提供一站式协同办公、组织管理、业务提效工具和深入企业场景的 AI 能力，让 AI 真能用真落地。
从互联网、高科技、消费零售到制造、金融、医疗健康，各行各业先进企业都在飞书落地AI，与飞书共创行业最佳实践。先进团队，AI用飞书。

1、负责字节跳动飞书信任与安全相关产品的服务端研发，构建保障用户安全的平台能力与风控体系；
2、参与AI时代安全体系建设，利用大模型和AI工具提升威胁检测、内容安全治理、风险防控的效率与精准度；
3、负责团队服务质量与系统稳定性，从工具、系统、流程上持续提升开发与交付效率；
4、与产品、运营、法务、安全策略等多团队密切协作，推动安全能力落地与跨部门项目高效推进；
5、主要技术栈为Golang。
职位要求
1、2027届获得本科及以上学历，计算机、软件工程、信息安全等相关专业；
2、具备AI使用和实践经验，有将大模型/AI工具应用于实际业务场景的经验，熟悉Prompt工程、AI Agent编排或LLM应用开发者优先，了解安全相关知识（如Web安全的常见威胁与防护）者优先；
3、对外沟通协作能力强，能够跨团队、跨职能高效推进项目，善于将技术方案转化为业务语言与非技术团队对齐；
4、较好的产品意识，愿意将产品效果作为工作的重要驱动因素；
5、掌握Web后端开发技术：协议、架构、存储、缓存、安全等；
6、积极乐观，认真负责，乐于协作。`;

  const SAMPLE_JD_HARDWARE = `某消费电子公司 · 智能硬件产品经理
深圳 · 5 年经验 · 全职

职责：
- 独立负责智能硬件 0→1 到量产上市，覆盖产品定义、硬件规格与 EVT/DVT/PVT
- 基于用户研究与售后数据定义场景与优先级，输出可评审 PRD
- 跨部门协同研发、结构、电子、供应链推进量产
- 对 BOM 成本、体验与上市节奏做取舍
- 结果需可公开复核，不接受无法溯源的转化率

要求：
- 3 年以上硬件或消费电子产品经验
- 能写规格书，能跟样机问题闭环`;

  const SAMPLE_JD_ALGO = `某互联网公司 · 推荐算法工程师
北京 · 3–5 年 · 全职

职责：
- 负责推荐 / 搜索召回与排序，特征、样本与离线评估
- 与产品、运营对齐业务指标，用 AUC、NDCG、停留时长等已有指标迭代
- 参与大模型特征或 RAG 相关实验，结论必须可复现，禁止口头拍数

要求：
- 熟悉 Python、SQL、至少一种深度学习框架
- 有完整上线过的推荐或搜索项目`;

  const SAMPLE_POSTINGS = [
    { id: "feishu", label: "飞书 Agent 前端", raw: SAMPLE_JD, path: "samples/jd-feishu.html" },
    { id: "hardware", label: "智能硬件 PM", raw: SAMPLE_JD_HARDWARE, path: "samples/jd-hardware.html" },
    { id: "algo", label: "推荐算法", raw: SAMPLE_JD_ALGO, path: "samples/jd-algo.html" }
  ];

  const SIGNALS = [
    { id: "zero", label: "0→1 全生命周期", keys: ["0-1", "0→1", "从零", "全生命", "evt", "量产", "立项"] },
    { id: "cross", label: "跨部门协同", keys: ["跨部门", "协同", "供应链", "研发", "结构", "电子"] },
    { id: "cost", label: "BOM / 成本", keys: ["成本", "bom", "毛利", "定价", "器件"] },
    { id: "user", label: "用户研究", keys: ["用户", "访谈", "反馈", "场景", "售后"] },
    { id: "metric", label: "可公开结果", keys: ["销量", "转化", "评分", "降低", "提升", "指标", "auc", "ndcg"] },
    { id: "algo", label: "算法 / 模型", keys: ["算法", "召回", "排序", "模型", "特征", "rag"] },
    { id: "agent", label: "Agent / LLM", keys: ["agent", "大模型", "llm", "prompt", "飞书"] }
  ];

  function load() {
    try { return JSON.parse(localStorage.getItem(KEY) || "{}"); } catch { return {}; }
  }
  function save(patch) {
    const next = Object.assign(load(), patch, { updatedAt: Date.now() });
    localStorage.setItem(KEY, JSON.stringify(next));
    return next;
  }
  function state() {
    const s = load();
    if (!s.profile) s.profile = JSON.parse(JSON.stringify(DEFAULT_PROFILE));
    if (!s.jobs) s.jobs = [];
    if (!s.apps) s.apps = [];
    if (!s.answers) s.answers = {};
    return s;
  }

  function hasDigit(text) { return /\d/.test(text || ""); }
  function hit(text, keys) {
    const t = (text || "").toLowerCase();
    return (keys || []).some((k) => t.includes(String(k).toLowerCase()));
  }

  /** 字段抽取：在原文上定位 keyword span（阅读实验的可回指证据） */
  function collectSpans(text, fields) {
    const src = String(text || "");
    const lower = src.toLowerCase();
    const raw = [];
    (fields || []).forEach((f) => {
      (f.keys || []).forEach((k) => {
        const needle = String(k || "").toLowerCase();
        if (!needle) return;
        let from = 0;
        while (from < lower.length) {
          const i = lower.indexOf(needle, from);
          if (i < 0) break;
          raw.push({
            start: i,
            end: i + needle.length,
            fieldId: f.id,
            label: f.label,
            quote: src.slice(i, i + needle.length)
          });
          from = i + Math.max(1, needle.length);
        }
      });
    });
    raw.sort((a, b) => a.start - b.start || (b.end - b.start) - (a.end - a.start));
    const out = [];
    raw.forEach((s) => {
      const last = out[out.length - 1];
      if (last && s.start < last.end) {
        if (s.end - s.start > last.end - last.start) out[out.length - 1] = s;
      } else out.push(s);
    });
    return out;
  }

  function jdQuote(jdText, keys) {
    const src = String(jdText || "");
    const lower = src.toLowerCase();
    for (let i = 0; i < (keys || []).length; i++) {
      const needle = String(keys[i] || "").toLowerCase();
      if (!needle) continue;
      const at = lower.indexOf(needle);
      if (at >= 0) {
        const a = Math.max(0, at - 10);
        const b = Math.min(src.length, at + needle.length + 14);
        return src.slice(a, b).replace(/\s+/g, " ").trim();
      }
    }
    return "";
  }

  const ACCOUNT_RESUMES = [
    {
      id: "chen-hw",
      name: "陈宇航",
      track: "产品",
      role: "硬件产品经理 / 智能硬件",
      updated: "2026-09-09",
      text: "陈宇航\n硬件产品经理 / 智能硬件产品经理\n深圳 · 5年 · 消费电子 / IoT / 智能家居 / 可穿戴\n手机：138-XXXX-XXXX · 邮箱：yuhang.chen@example.com\n\n个人简介\n5年智能硬件及消费电子产品经验，其中3年负责硬件产品全生命周期管理。熟悉从用户需求洞察、产品定义、PRD输出到EVT/DVT/PVT与量产上市的完整流程。\n\n工作经历\n深圳智联科技有限公司｜高级硬件产品经理｜2023.04 – 至今\n负责智能家居及消费电子产品线，包括智能摄像头、家庭中控及传感器类产品。\n项目：新一代室内智能摄像头（2023.04 – 至今）\n- 基于用户访谈、电商评价及售后数据分析超过2,000条用户反馈，识别「夜视效果、误报率、隐私保护、安装便捷性」为核心用户需求。\n- 完成产品定位、用户场景、核心功能及硬件规格定义。\n- 联合研发确定SoC、Sensor、镜头、Wi-Fi模组及存储方案。\n- 协调ID、结构、电子、算法、App、供应链等8个团队推进产品开发。\n- 负责EVT、DVT、PVT阶段产品验收及问题优先级管理。\n- 通过器件替代和结构优化推动BOM成本下降。\n- 立项到量产约9个月；BOM较初始方案降低12%；夜视有效距离提升约30%；AI误报率降低25%；上市6个月销量超过8万台；电商评分4.2提升至4.6/5.0。\n项目：智能家居中控屏\n- 分析米家、华为、Amazon Echo Show等15款竞品，建立功能、性能、价格及生态竞争矩阵。\n- 定义屏幕尺寸、扬声器、麦克风阵列、无线连接方案和桌面/墙装使用方式。\n- 输出产品PRD、硬件规格书及交互需求。\n\n深圳极客智能有限公司｜产品经理｜2021.07 – 2023.03\n- 负责USB-C多功能扩展坞产品线市场研究、产品定义及上市管理。\n- 上市3个月销量超过3万件；毛利率提升6个百分点。\n\n教育背景\n华南理工大学｜电子信息工程｜本科｜2015.09 – 2019.06\n主修：数字电路 · 模拟电路 · 通信原理 · 单片机 · 嵌入式系统\n\n其他信息\n英语：CET-6，可阅读英文技术资料\n奖项：（暂无公开奖项条目，可按真实经历补充）\n技能：Axure / Figma / Jira / Confluence / Excel / PPT"
    },
    {
      id: "lin-algo",
      name: "林晓舟",
      track: "算法",
      role: "推荐算法工程师",
      updated: "2026-08-21",
      text: "林晓舟\n推荐算法工程师\n北京 · 4年 · 信息流 / 搜索 / 广告\n邮箱：xiaozhou.lin@example.com\n\n个人简介\n4年推荐 / 搜索算法经验，熟悉召回、排序与离线评估，实验结论以平台报告为准，不外推未采集指标。\n\n工作经历\n某互联网公司｜推荐算法工程师｜2023.03 – 至今\n项目：首页信息流召回与排序（2023.03 – 至今）\n- 负责首页信息流双塔召回，日均请求约 1.2 亿次，离线用 AUC 与 Recall@50 评估。\n- 与产品对齐停留时长目标，把样本切成曝光 / 点击 / 完读三档，不补未采集的转化率。\n- 上线一组多目标排序，完读率相对基线提升 3.1%，以实验平台报告为准。\n- 参与 RAG 特征实验：用已有点击日志做检索，结论写进实验文档，不外推业务增量。\n- 与数据同学核对特征口径，下线 2 个泄漏特征后，离线 AUC 回落到可复现区间。\n\n教育背景\n北京邮电大学｜计算机科学与技术｜硕士｜2019.09 – 2022.06\n\n其他信息\n技能：Python / SQL / PyTorch\n奖项：（可补充竞赛 / 论文 / 开源贡献等真实条目）"
    },
    {
      id: "zhao-ops",
      name: "赵晚晴",
      track: "运营",
      role: "用户增长运营",
      updated: "2026-07-30",
      text: "赵晚晴\n用户增长运营\n上海 · 3年 · 工具产品 / 活动运营\n邮箱：wanqing.zhao@example.com\n\n个人简介\n3年工具产品用户增长经验，擅长首周任务、活动排期与渠道素材归档；数字只引用官方看板与增长周报。\n\n工作经历\n某工具产品公司｜用户增长运营｜2024.01 – 至今\n项目：新用户首周留存活动（2024.01 – 至今）\n- 负责工具 App 新用户首周任务，周活来自官方看板，不估算未披露的付费转化。\n- 与产品、设计排期 3 期活动，落地任务、push 与落地页，节点写在排期表。\n- 首周留存从 18% 提到 23%，数字来自增长周报，活动结束后回落写进复盘。\n- 搭建渠道素材库，投放素材按渠道归档，禁止把渠道侧口头数字写进简历。\n- 组织 2 场用户访谈（共 16 人），把「不知道下一步做什么」收成任务文案改写。\n\n教育背景\n华东师范大学｜传播学｜本科｜2017.09 – 2021.06\n\n其他信息\n奖项：（可补充校园活动 / 增长案例奖等真实条目）"
    },
    {
      id: "wu-design",
      name: "吴清越",
      track: "设计",
      role: "产品设计师",
      updated: "2026-08-04",
      text: "吴清越\n产品设计师\n杭州 · 4年 · ToB / Agent 工具\n邮箱：qingyue.wu@example.com\n\n个人简介\n4年 ToB / Agent 工具产品设计经验，擅长从混乱 Demo 收敛工作台路径，用可用性测试与设计系统支撑可交付原型。\n\n工作经历\n某 Agent 求职工具｜产品设计师｜2023.11 – 至今\n项目：Agent 工作台信息架构（2023.11 – 至今）\n- 把混乱 Demo 收成工作台 / 简历适配 / Mentor / 飞轮四条路径，输出可点击 HTML 原型。\n- 用 8 场可用性测试（每场 45 分钟）记录卡住点，改导航文案，不编造任务完成率。\n- 建立组件与 Token，从 40+ 页面反推 Button / Tag / JobCard，而不是先画空规范。\n- 与研发对齐状态机：Understand → Preview → Confirm → Act，失败可回退。\n- 交付设计走查清单 26 条，上线前关闭 19 条 P0，其余记入下一迭代。\n\n教育背景\n中国美术学院｜工业设计｜本科｜2016.09 – 2020.06\n\n其他信息\n技能：Figma / HTML 原型 / 可用性测试\n奖项：（可按真实经历补充设计竞赛 / 公开演讲等）"
    },
    {
      id: "sun-admin",
      name: "孙牧",
      track: "行政",
      role: "行政 / 校园招聘",
      updated: "2026-06-18",
      text: "孙牧\n行政专员 / 校园招聘\n成都 · 2年 · 人力资源 / 行政支持\n邮箱：mu.sun@example.com\n\n个人简介\n2年行政与校园招聘执行经验，擅长宣讲统筹、简历分拣与入职清单；通过率只引用 ATS 导出。\n\n工作经历\n某科技公司｜行政专员 / 校园招聘｜2024.09 – 至今\n项目：2025 校园招聘执行（2024.09 – 2025.04）\n- 统筹 6 所高校宣讲与摊位物料，日程、场地、签到表归档到共享盘。\n- 收集 420 份简历，按岗位标签分拣后交给用人部门，不代写候选人经历。\n- 安排 38 场初面日程，迟到 / 改期写入日历备注，面试通过率以 ATS 导出为准。\n- 负责工位、门禁与入职礼包，入职当天清单 12 项，缺项记在行政周报。\n- 更新员工手册行政章节 3 次，变更只收录已公布制度，不补充未审批福利。\n\n教育背景\n四川大学｜行政管理｜本科｜2018.09 – 2022.06\n校园经历\n- 校学生会行政部干事，负责活动场地与物资清单。\n\n其他信息\n奖项：（可补充校级志愿 / 优秀干事等真实条目）"
    }
  ];

  const RESUME_BASE = {
    name: "陈宇航",
    role: "硬件产品经理 / 智能硬件产品经理",
    lang: "深圳 · 5年经验 · 消费电子 / IoT / 智能家居 / 可穿戴设备",
    contacts: [
      { label: "手机", value: "138-XXXX-XXXX" },
      { label: "邮箱", value: "yuhang.chen@example.com" },
      { label: "所在地", value: "深圳" },
      { label: "工具", value: "Axure / Figma / Jira / Confluence / Excel / PPT / XMind / Notion" }
    ],
    summary: [
      "5年智能硬件及消费电子产品经验，其中3年负责硬件产品全生命周期管理。熟悉从用户需求洞察、产品定义、PRD输出、ID/结构/电子方案评审，到EVT/DVT/PVT、试产、量产及上市运营的完整流程。",
      "曾主导智能摄像头、便携储能配件、智能家居中控等产品项目，可协同研发、工业设计、结构、电子、供应链、品质、市场及销售推进落地。",
      "对成本、体验、技术可行性与上市节奏之间的平衡有较深理解，具备BOM成本管理、竞品分析、用户研究和数据分析能力。"
    ],
    education: [
      { school: "华南理工大学", degree: "电子信息工程｜本科", detail: "数字电路 · 模拟电路 · 通信原理 · 单片机 · 嵌入式系统 · 信号与系统 · 项目管理", time: "2015.09 – 2019.06" }
    ],
    skills: [
      { name: "产品规划", text: "用户需求与场景定义 · Roadmap · MRD / PRD / 规格书 · 功能优先级 · SKU 规划" },
      { name: "硬件产品开发", text: "ID / CMF / 结构评审 · PCBA 与关键器件评估 · EVT / DVT / PVT / MP · 样机问题闭环 · 认证试产量产" },
      { name: "商业与供应链", text: "BOM 成本分析 · 供应商方案比较 · 定价与毛利测算 · 生命周期成本 · 市场及竞品分析" },
      { name: "项目管理", text: "跨部门推进 · 风险与问题闭环 · 开发节点管理 · Launch 计划" }
    ],
    awards: [],
    extras: [
      { label: "英语", text: "CET-6，可阅读英文技术资料，并与海外供应商日常沟通" },
      { label: "技术理解", text: "基础电路与 PCBA · MCU / SoC · Bluetooth / Wi-Fi · USB-C / PD · Sensor · 结构模具与 CMF" },
      { label: "个人优势", text: "完整硬件 0→1 经验；能在体验、实现与成本之间决策；熟悉研供协同；用反馈与市场数据找机会；能推动复杂项目按期量产" }
    ]
  };

  const STATIC_JOBS = [
    {
      company: "深圳智联科技有限公司",
      title: "高级硬件产品经理",
      time: "2023.04 – 至今｜深圳",
      intro: "负责公司智能家居及消费电子产品线，包括智能摄像头、家庭中控设备及传感器类产品。",
      projects: [
        {
          id: "cam",
          title: "智能家庭摄像头项目",
          lead: "作为产品负责人，主导新一代室内智能摄像头从0到1产品开发。",
          pack: true
        },
        {
          title: "智能家居中控屏项目",
          lead: "负责家庭智能中控产品的产品规划和硬件定义。",
          bullets: [
            "分析米家、华为、Amazon Echo Show等15款竞品，建立功能、性能、价格及生态竞争矩阵。",
            "定义屏幕尺寸、扬声器、麦克风阵列、无线连接方案和桌面/墙装使用方式。",
            "输出产品PRD、硬件规格书及交互需求。",
            "协调结构团队解决整机散热、壁挂安装和跌落可靠性问题。",
            "联合采购及供应链完成核心器件选型和成本控制。",
            "目标成本控制在立项预算 ±3%；DVT 重大问题关闭率 100%；按期量产；上市首季完成销售目标 118%。"
          ]
        }
      ]
    },
    {
      company: "深圳极客智能有限公司",
      title: "产品经理",
      time: "2021.07 – 2023.03｜深圳",
      intro: "负责便携式智能硬件及消费电子配件产品。",
      projects: [
        {
          title: "USB-C多功能扩展坞产品线",
          lead: "负责扩展坞产品的市场研究、产品定义及上市管理。",
          bullets: [
            "分析Amazon、京东及天猫市场销售数据和用户评论，梳理办公、游戏、摄影等场景需求。",
            "规划6合1、8合1及专业版三个SKU，定义HDMI、USB、PD、电源管理及散热规格。",
            "协同供应商推进PCBA设计及结构开发，输出包装、卖点及上市资料。",
            "上市3个月销量超过3万件；毛利率提升6个百分点；SKU由9款优化至5款；库存周转提升约20%。"
          ]
        }
      ]
    },
    {
      company: "深圳创新电子有限公司",
      title: "产品助理 / 项目工程师",
      time: "2019.07 – 2021.06｜深圳",
      intro: "参与蓝牙音箱、充电器及智能硬件产品开发。",
      projects: [
        {
          title: "消费电子开发支持",
          bullets: [
            "市场及竞品调研、产品规格整理、样机测试、项目进度跟踪。",
            "供应商沟通，试产问题整理及闭环，产品说明书及上市资料制作。",
            "参与超过10款消费电子产品从开发到量产，为后续硬件产品管理积累研供经验。"
          ]
        }
      ]
    }
  ];

  const FEATURED_PROJECT = {
    title: "新一代AI智能摄像头",
    role: "产品负责人",
    background: "公司原有产品在夜视、AI误报及隐私体验方面存在明显用户投诉，需要开发新一代产品提升市场竞争力。",
    decisions: "2K 高清 Sensor · 物理隐私遮挡 · 优化红外夜视 · 本地 AI 人形检测 · 双向语音 · 云存储及本地 TF 卡",
    duties: "用户研究及产品定义 · 商业需求分析 · 硬件规格 · PRD · 样机验收 · 研发推进 · BOM 成本 · 上市策略配合",
    result: "产品上市半年销量超过8万台，并成为公司智能家居品类核心SKU。"
  };

  const PACK_FIELDS = {
    "chen-hw": [
      { id: "cy1", tag: "用户洞察", original: "基于用户访谈、电商评价及售后数据分析超过2,000条用户反馈，识别「夜视效果、误报率、隐私保护、安装便捷性」为核心用户需求。", polish: "用超过 2,000 条访谈、电商评价与售后反馈，把夜视、误报、隐私、安装收成可验收需求，再进入规格定义。", evidence: "对应 JD：用户研究驱动定义" },
      { id: "cy2", tag: "产品定义", original: "完成产品定位、用户场景、核心功能及硬件规格定义。", polish: "把定位、场景、功能优先级和硬件规格写成可评审的产品定义，作为 0→1 开发输入。", evidence: "对应 JD：产品定义 / PRD" },
      { id: "cy3", tag: "硬件方案", original: "联合研发确定SoC、Sensor、镜头、Wi-Fi模组及存储方案。", polish: "与研发共同锁定 SoC、Sensor、镜头、Wi-Fi 模组与存储方案，保证体验目标可被硬件实现。", evidence: "对应 JD：硬件规格" },
      { id: "cy4", tag: "跨部门推进", original: "协调ID、结构、电子、算法、App、供应链等8个团队推进产品开发。", polish: "作为产品负责人协同 ID / 结构 / 电子 / 算法 / App / 供应链等 8 个团队按节点推进，而不是只出文档。", evidence: "对应 JD：跨部门协同" },
      { id: "cy5", tag: "全流程验收", original: "负责EVT、DVT、PVT阶段产品验收及问题优先级管理。", polish: "覆盖 EVT / DVT / PVT 验收，按优先级关闭问题，把样机问题收到量产前门禁。", evidence: "对应 JD：EVT–PVT 全流程" },
      { id: "cy6", tag: "成本体验", original: "通过器件替代和结构优化推动BOM成本下降。", polish: "用器件替代与结构优化压 BOM，同时保住夜视与误报体验，不把成本优化做成偷工。", evidence: "对应 JD：成本与体验平衡" },
      { id: "cy7", tag: "已发生结果", original: "立项到量产约9个月；BOM较初始方案降低12%；夜视有效距离提升约30%；AI误报率降低25%；上市6个月销量超过8万台；电商评分4.2提升至4.6/5.0。", polish: "立项到量产约 9 个月；BOM 降 12%；夜视距离提升约 30%；AI 误报率降 25%；上市 6 个月销量超过 8 万台；评分 4.2 → 4.6/5.0。数字全部来自原简历，不外补。", evidence: "已发生结果，禁止外推" }
    ],
    "lin-algo": [
      { id: "la1", tag: "召回", original: "负责首页信息流双塔召回，日均请求约 1.2 亿次，离线用 AUC 与 Recall@50 评估。", polish: "负责首页信息流双塔召回，日均请求约 1.2 亿次；离线评估只用 AUC 与 Recall@50，不补未采集转化率。", evidence: "对应 JD：召回 / 离线评估" },
      { id: "la2", tag: "样本", original: "与产品对齐停留时长目标，把样本切成曝光 / 点击 / 完读三档，不补未采集的转化率。", polish: "按曝光 / 点击 / 完读切样本，对齐停留时长；没有的转化率不写。", evidence: "对应 JD：指标必须可复现" },
      { id: "la3", tag: "上线结果", original: "上线一组多目标排序，完读率相对基线提升 3.1%，以实验平台报告为准。", polish: "多目标排序上线后，完读率相对基线 +3.1%，数字来自实验平台报告。", evidence: "已发生实验结果" },
      { id: "la4", tag: "RAG", original: "参与 RAG 特征实验：用已有点击日志做检索，结论写进实验文档，不外推业务增量。", polish: "RAG 特征只用已有点击日志，结论留在实验文档，不外推业务增量。", evidence: "对应 JD：大模型实验可复现" },
      { id: "la5", tag: "特征口径", original: "与数据同学核对特征口径，下线 2 个泄漏特征后，离线 AUC 回落到可复现区间。", polish: "核对特征口径并下线 2 个泄漏特征，让离线 AUC 回到可复现区间。", evidence: "对应 JD：评估可信" }
    ],
    "zhao-ops": [
      { id: "zo1", tag: "增长", original: "负责工具 App 新用户首周任务，周活来自官方看板，不估算未披露的付费转化。", polish: "负责新用户首周任务；周活只引用官方看板，不估算未披露付费转化。", evidence: "对应 JD：增长结果可核对" },
      { id: "zo2", tag: "协同", original: "与产品、设计排期 3 期活动，落地任务、push 与落地页，节点写在排期表。", polish: "三期活动与产品、设计排期，任务 / push / 落地页节点写在排期表。", evidence: "对应 JD：跨职能推进" },
      { id: "zo3", tag: "留存", original: "首周留存从 18% 提到 23%，数字来自增长周报，活动结束后回落写进复盘。", polish: "首周留存 18% → 23%（增长周报）；活动结束后的回落写进复盘，不把峰值当常态。", evidence: "已发生运营结果" },
      { id: "zo4", tag: "渠道", original: "搭建渠道素材库，投放素材按渠道归档，禁止把渠道侧口头数字写进简历。", polish: "渠道素材按渠道归档；口头投放数字不写进投递稿。", evidence: "禁止无证据数字" },
      { id: "zo5", tag: "访谈", original: "组织 2 场用户访谈（共 16 人），把「不知道下一步做什么」收成任务文案改写。", polish: "2 场共 16 人访谈，把「不知道下一步做什么」收成任务文案。", evidence: "对应 JD：用户研究" }
    ],
    "wu-design": [
      { id: "wd1", tag: "架构", original: "把混乱 Demo 收成工作台 / 简历适配 / Mentor / 飞轮四条路径，输出可点击 HTML 原型。", polish: "把 Demo 收成工作台、简历适配、Mentor、飞轮四条路径，并交付可点击 HTML 原型。", evidence: "对应 JD：复杂工具 IA" },
      { id: "wd2", tag: "研究", original: "用 8 场可用性测试（每场 45 分钟）记录卡住点，改导航文案，不编造任务完成率。", polish: "8 场 × 45 分钟可用性测试记录卡住点并改导航；不编任务完成率。", evidence: "对应 JD：研究证据" },
      { id: "wd3", tag: "系统", original: "建立组件与 Token，从 40+ 页面反推 Button / Tag / JobCard，而不是先画空规范。", polish: "从 40+ 页面反推 Button / Tag / JobCard 与 Token，而不是先画空规范。", evidence: "对应 JD：设计系统" },
      { id: "wd4", tag: "Agent UX", original: "与研发对齐状态机：Understand → Preview → Confirm → Act，失败可回退。", polish: "对齐 Understand → Preview → Confirm → Act，失败可回退，用户始终看得到 Agent 在做什么。", evidence: "对应 JD：可控 Agent 交互" },
      { id: "wd5", tag: "走查", original: "交付设计走查清单 26 条，上线前关闭 19 条 P0，其余记入下一迭代。", polish: "走查 26 条，上线前关闭 19 条 P0，其余记入下一迭代。", evidence: "已发生交付结果" }
    ],
    "sun-admin": [
      { id: "sa1", tag: "校招执行", original: "统筹 6 所高校宣讲与摊位物料，日程、场地、签到表归档到共享盘。", polish: "统筹 6 校宣讲与物料，日程 / 场地 / 签到表归档共享盘。", evidence: "对应 JD：行政执行" },
      { id: "sa2", tag: "简历分拣", original: "收集 420 份简历，按岗位标签分拣后交给用人部门，不代写候选人经历。", polish: "收集 420 份简历并按岗分拣；不代写候选人经历。", evidence: "对应 JD：招聘支持" },
      { id: "sa3", tag: "面试安排", original: "安排 38 场初面日程，迟到 / 改期写入日历备注，面试通过率以 ATS 导出为准。", polish: "安排 38 场初面；改期写入日历；通过率只引用 ATS 导出。", evidence: "禁止口头通过率" },
      { id: "sa4", tag: "入职", original: "负责工位、门禁与入职礼包，入职当天清单 12 项，缺项记在行政周报。", polish: "工位 / 门禁 / 礼包按 12 项当天清单执行，缺项记行政周报。", evidence: "对应 JD：入职支持" },
      { id: "sa5", tag: "制度", original: "更新员工手册行政章节 3 次，变更只收录已公布制度，不补充未审批福利。", polish: "手册行政章节更新 3 次，只收录已公布制度，不补未审批福利。", evidence: "对应 JD：制度归档" }
    ]
  };

  function profileFromResume(item) {
    const parsed = parseResumeText(item.text);
    parsed.packId = item.id;
    parsed.name = item.name || parsed.name;
    parsed.role = item.role || parsed.role;
    const pack = PACK_FIELDS[item.id];
    if (pack) parsed.bullets = pack.map((f) => ({ id: f.id, text: f.original, locked: true }));
    return parsed;
  }

  function parseResumeText(text) {
    const lines = String(text || "").split(/\n+/).map((x) => x.trim()).filter(Boolean);
    const bullets = lines
      .filter((l) => /^[-•·]/.test(l) || (l.length > 22 && !/电话|邮箱|手机|求职意向|个人简介|教育背景|其他信息|工作经历|奖项[:：]/.test(l) && lines.indexOf(l) > 2))
      .map((l, i) => ({ id: "b" + (i + 1), text: l.replace(/^[-•·\s]+/, ""), locked: true }));
    const known = ACCOUNT_RESUMES.find((r) => r.text && text && r.text.slice(0, 12) === String(text).slice(0, 12));
    const roleLine = lines.find((l) => /工程师|经理|设计|运营|行政|招聘|产品|算法|PM|Designer/.test(l)) || (known && known.role) || "未识别角色";
    const proj = lines.find((l) => /项目[:：]|（20\d{2}/.test(l)) || lines[3] || "未命名项目";
    const nameLine = lines[0] && lines[0].length <= 16 ? lines[0] : (known && known.name) || "未命名";
    return {
      name: nameLine.replace(/[·•].*$/, "").slice(0, 16),
      project: String(proj).replace(/^项目[:：]\s*/, "").slice(0, 80),
      role: roleLine.slice(0, 80),
      time: (lines.find((l) => /20\d{2}/.test(l)) || ""),
      packId: known ? known.id : "upload",
      bullets: bullets.length ? bullets : (known ? profileFromResume(known).bullets : []),
      source: "resume"
    };
  }

  function parseJD(raw) {
    const text = (raw || "").trim();
    const lines = text.split(/\n+/).map((x) => x.trim()).filter(Boolean);
    const titleLine = lines[0] || "未命名岗位";
    const evidence = lines.filter((l) => /独立|0→1|0-1|EVT|量产|BOM|协同|用户|成本|规格|PRD|Agent|大模型|Golang|安全|飞书|Prompt|LLM|召回|排序|AUC|留存|运营|设计|行政|招聘|简历/i.test(l)).slice(0, 6);
    const signals = SIGNALS.filter((s) => hit(text, s.keys));
    return { raw: text, titleLine, evidence: evidence.length ? evidence : lines.slice(1, 4), signals };
  }

  function htmlToText(html) {
    const doc = new DOMParser().parseFromString(String(html || ""), "text/html");
    doc.querySelectorAll("script,style,nav,header,footer").forEach((n) => n.remove());
    const main = doc.querySelector("[data-jd], [data-cv], main, article, pre") || doc.body;
    return String((main && main.innerText) || "").replace(/\n{3,}/g, "\n\n").trim();
  }

  function sampleJobById(id) {
    return SAMPLE_POSTINGS.find((j) => j.id === id) || SAMPLE_POSTINGS[0];
  }

  function matchJobSample(url) {
    const u = String(url || "").toLowerCase();
    if (/jd-hardware|智能硬件|hardware/.test(u)) return sampleJobById("hardware");
    if (/jd-algo|推荐算法|algorithm/.test(u)) return sampleJobById("algo");
    if (/jd-feishu|feishu|lark|agent前端/.test(u)) return sampleJobById("feishu");
    return null;
  }

  async function fetchUrlText(url) {
    const res = await fetch(url, { mode: "cors" });
    if (!res.ok) throw new Error("HTTP " + res.status);
    const ctype = (res.headers.get("content-type") || "") + "";
    const raw = await res.text();
    if (/html/i.test(ctype) || /<html/i.test(raw.slice(0, 200))) return htmlToText(raw);
    return raw.trim();
  }

  async function resolveJobFromUrl(url) {
    const href = String(url || "").trim();
    if (!/^https?:\/\//i.test(href) && !/^\.?\//.test(href) && !/samples\//.test(href)) {
      throw new Error("请粘贴 http(s) 链接，或点下方岗位示例链接。");
    }
    try {
      const text = await fetchUrlText(href);
      if (text && text.length > 40) {
        return { text, source: "live", note: "已从链接抽取岗位原文。Agent 不补数字。" };
      }
    } catch (err) {
      /* cross-origin or local file; fall through to sample map */
    }
    const sample = matchJobSample(href);
    if (sample) {
      return {
        text: sample.raw,
        source: "demo",
        note: "浏览器拦了跨域招聘站。已用对应「岗位示例」演示抽取。正式版由服务端抓取。"
      };
    }
    throw new Error("打不开这个链接。可点下方岗位示例链接（同源可爬），或改贴文本。");
  }

  async function resolveResumeFromUrl(url) {
    const href = String(url || "").trim();
    try {
      const text = await fetchUrlText(href);
      if (text && text.length > 20) {
        return { text, source: "live", note: "已从链接抽取简历原文。" };
      }
    } catch (err) {
      /* fall through */
    }
    const known = ACCOUNT_RESUMES.find((r) => href.toLowerCase().includes(r.id) || href.toLowerCase().includes(encodeURIComponent(r.name)));
    if (known) return { text: known.text, source: "demo", note: "跨域无法读取该页。已改用账户里对应的简历示例。" };
    throw new Error("打不开这份简历链接。可上传文件，或选左侧账户简历。");
  }

  const ALIGN_KEYS = [
    { id: "agent", label: "Agent / LLM", keys: ["agent", "llm", "大模型", "prompt", "编排"], unit: "工作经历", focus: "experience" },
    { id: "secure", label: "信任与安全", keys: ["安全", "风控", "威胁", "治理"], unit: "工作经历", focus: "experience" },
    { id: "golang", label: "Golang / 后端", keys: ["golang", "服务端", "后端", "协议", "缓存"], unit: "工作经历", focus: "experience" },
    { id: "collab", label: "跨职能推进", keys: ["跨团队", "跨部门", "协作", "协同", "法务", "运营"], unit: "工作经历", focus: "experience" },
    { id: "quality", label: "稳定性 / 交付", keys: ["稳定性", "质量", "交付", "效率"], unit: "工作经历", focus: "experience" },
    { id: "product", label: "产品意识", keys: ["产品意识", "产品效果", "prd"], unit: "项目经历", focus: "experience" },
    { id: "user", label: "用户研究", keys: ["用户", "访谈", "反馈", "场景"], unit: "项目经历", focus: "experience" },
    { id: "zero", label: "0→1 / 量产", keys: ["0→1", "0-1", "evt", "量产", "立项"], unit: "项目经历", focus: "experience" },
    { id: "cost", label: "BOM / 成本", keys: ["bom", "成本", "毛利"], unit: "项目经历", focus: "experience" },
    { id: "campus", label: "学历届别", keys: ["2027", "本科", "校招", "应届"], unit: "校园经历", focus: "basic" }
  ];

  const SECTION_META = {
    basic: { title: "基本信息", focus: false, note: "本阶段不深挖；可提示补奖项 / 作品等真实条目" },
    summary: { title: "个人简介", focus: false, note: "简介只作索引，匹配主战场在经历" },
    work: { title: "工作经历", focus: true, note: "主分析区：抽最值钱的工作量" },
    project: { title: "项目经历", focus: true, note: "主分析区：抽最值钱的工作量" },
    campus: { title: "校园经历", focus: true, note: "主分析区：可写的真实校园工作量" },
    education: { title: "教育背景", focus: false, note: "可推荐补充奖项 / 竞赛 / 公开作品" },
    other: { title: "其他信息", focus: false, note: "技能 / 语言 / 奖项等轻量补强" },
    experience: { title: "经历", focus: true, note: "主分析区" }
  };

  function valueWorkload(text) {
    const t = String(text || "");
    const hasScale = /\d/.test(t) && /(万|千|亿|%|％|场|条|人|周|月|页|团队|所|份|次|台|件)/.test(t);
    const hasDecision = /(主导|定义|决策|取舍|对齐|推进|关闭|统筹|识别|反推|收敛)/.test(t);
    const hasOutcome = /(提升|降低|完成|销量|评分|通过率|留存|量产|关闭|输出)/.test(t);
    if (hasScale && (hasDecision || hasOutcome)) {
      return { tier: "high", label: "高价值工作量", tip: "已有可复核规模 / 决策 / 结果，优先保留并对齐 JD 用语，勿补未发生数字。" };
    }
    if (hasScale || hasDecision || hasOutcome) {
      return { tier: "mid", label: "有信号", tip: "已有信号。再想清楚：规模、服务对象、决策或结果里，哪一项已经发生、能诚实写上。" };
    }
    return { tier: "thin", label: "偏职责罗列", tip: "偏职责罗列。诱导自己回答：这段经历里最值钱的一块工作量是什么？做成了什么、服务了谁、规模多大？" };
  }

  function classifySectionTitle(line) {
    const t = String(line || "").replace(/[:：]\s*$/, "").trim();
    if (/^(个人简介|简介|基本信息|联系方式)$/.test(t)) return "summary";
    if (/^(工作经历|职业经历|任职经历)$/.test(t)) return "work";
    if (/^(项目经历|项目经验|项目)$/.test(t) || /^项目[:：]/.test(line)) return "project";
    if (/^(教育背景|教育经历|学历)$/.test(t)) return "education";
    if (/^(校园经历|在校经历|社团|学生工作)$/.test(t)) return "campus";
    if (/^(其他信息|其他|奖项|证书|技能|语言)$/.test(t)) return "other";
    return "";
  }

  function buildAlignDoc(profile, resumeText) {
    const packId = (profile && profile.packId) || "";
    const known = ACCOUNT_RESUMES.find((r) => r.id === packId);
    // 账户示例始终用完整原文；上传稿才用 resumeText
    let raw = known ? String(known.text || "").trim() : String(resumeText || "").trim();
    if (!raw && profile) {
      const bits = [profile.name, profile.role, profile.project, profile.time]
        .concat(((profile.bullets || []).filter((b) => !b.dropped).map((b) => "- " + b.text)));
      raw = bits.filter(Boolean).join("\n");
    }
    const lines = String(raw).split(/\n/).map((x) => x.replace(/\s+$/, "")).filter((x, i, arr) => x.trim() || (arr[i - 1] && arr[i - 1].trim()));
    const sections = [];
    let cur = { id: "sec-basic", type: "basic", title: "基本信息", focus: false, lines: [] };
    sections.push(cur);
    let lineNo = 0;
    lines.forEach((rawLine) => {
      const line = rawLine.trim();
      if (!line) return;
      const head = classifySectionTitle(line);
      if (head) {
        const meta = SECTION_META[head] || SECTION_META.other;
        cur = {
          id: "sec-" + head + "-" + sections.length,
          type: head,
          title: /^项目[:：]/.test(line) ? line.replace(/^项目[:：]\s*/, "项目 · ") : meta.title,
          focus: !!meta.focus,
          lines: []
        };
        sections.push(cur);
        if (/^项目[:：]/.test(line)) {
          /* project title already used as section title */
        }
        return;
      }
      if (/^[｜|]/.test(line) === false && /｜20\d{2}|公司|有限公司/.test(line) && cur.type === "basic" && sections.length === 1) {
        cur = { id: "sec-work-" + sections.length, type: "work", title: "工作经历", focus: true, lines: [] };
        sections.push(cur);
      }
      if (/^项目[:：]/.test(line) && cur.type !== "project") {
        cur = {
          id: "sec-project-" + sections.length,
          type: "project",
          title: "项目 · " + line.replace(/^项目[:：]\s*/, ""),
          focus: true,
          lines: []
        };
        sections.push(cur);
        return;
      }
      lineNo += 1;
      const isBullet = /^[-•·]/.test(line) || (cur.focus && line.length > 18);
      const text = line.replace(/^[-•·\s]+/, "");
      const id = "L" + lineNo;
      const value = cur.focus ? valueWorkload(text) : null;
      cur.lines.push({
        id,
        text,
        raw: line,
        isBullet: !!isBullet,
        focus: !!cur.focus,
        value,
        sectionType: cur.type
      });
    });
    const cleaned = sections.filter((s) => s.lines.length || s.type === "basic");
    if (cleaned[0] && !cleaned[0].lines.length && cleaned.length > 1) cleaned.shift();
    const experienceLines = cleaned.flatMap((s) => s.lines.filter((l) => l.focus));
    const basicLines = cleaned.flatMap((s) => s.lines.filter((l) => !l.focus));
    const hasAward = /奖项/.test(raw) && !/奖项[：:]\s*[（(]?暂无|奖项[：:]\s*[（(]?可/.test(raw);
    return {
      raw,
      sections: cleaned,
      experienceLines,
      basicLines,
      hasAward,
      analysisNote: {
        focus: "现阶段最在乎项目 / 工作 / 校园经历与 JD 的匹配度，并抽出其中最值钱的工作量，诱导用户想清楚再呈现。",
        basic: "基本信息与教育背景本阶段未刻意深挖；可在教育或其它信息中推荐补充奖项、竞赛、公开作品等符合简历的真实内容。"
      }
    };
  }

  function alignReport(jd, profile, fullResumeText) {
    const doc = buildAlignDoc(profile, fullResumeText);
    const jdText = ((jd && jd.raw) || "") + " " + ((jd && jd.titleLine) || "");
    const experienceLines = doc.experienceLines.length
      ? doc.experienceLines
      : ((profile && profile.bullets) || []).filter((b) => !b.dropped).map((b) => ({ id: b.id, text: b.text, focus: true, value: valueWorkload(b.text) }));
    const resumeText = experienceLines.map((b) => b.text).join(" ") + " " + (doc.raw || "") + " " + (profile.role || "") + " " + (profile.project || "");
    const jdKeys = ALIGN_KEYS.filter((k) => hit(jdText, k.keys));
    const pool = jdKeys.length ? jdKeys : ALIGN_KEYS.filter((k) => (jd.signals || []).some((s) => hit(s.label, k.keys) || s.id === k.id));
    const keys = (pool.length ? pool : ALIGN_KEYS.slice(0, 4));
    const traits = [];
    if (profile.role) traits.push(profile.role.split(/[\/·|]/)[0].trim());
    if (profile.project) traits.push(String(profile.project).slice(0, 18));
    experienceLines.slice(0, 3).forEach((b) => {
      const t = (b.text || "").replace(/^[基于负责完成联合协调通过立项]+/, "").slice(0, 16);
      if (t) traits.push(t);
    });
    const uniqTraits = [...new Set(traits)].slice(0, 6);
    const matches = [];
    const misses = [];
    keys.forEach((k) => {
      const on = hit(resumeText, k.keys);
      const line = on ? experienceLines.find((b) => hit(b.text, k.keys)) || doc.basicLines.find((b) => hit(b.text, k.keys)) : null;
      const spans = line ? collectSpans(line.text, [k]) : [];
      const row = {
        id: k.id,
        label: k.label,
        unit: k.unit,
        keys: k.keys,
        focus: k.focus || "experience",
        jd: k.label,
        resume: line ? line.text : "",
        resumeQuote: spans[0] ? spans[0].quote : (line ? line.text.slice(0, 28) : ""),
        bulletId: line ? line.id : "",
        spans,
        suggest: on
          ? "保留原文口径，下一步只改表述顺序，不补数字。"
          : (k.unit === "校园经历"
            ? "JD 写了届别 / 学历。有就写公开信息，没有就标「不适用」，不要编毕业时间。"
            : "简历经历区没有直接证据。只改写相邻事实，或标明缺口；禁止补未发生经历。")
      };
      if (on) matches.push(row);
      else misses.push(row);
    });
    const askBank = {
      agent: {
        id: "agent",
        unit: "工作经历",
        title: "工作经历：有没有可公开的 Agent 相邻事实",
        q: "JD 要 Agent / LLM。你现有工作里，哪一条已经发生、可以公开写？没有就空着。",
        hint: "能写「用过模型工具做检测 / 写过 Prompt」；不能写没做过的安全平台。",
        choices: ["没有可公开的 Agent 经历", "只用过内部工具，不宜写进投递稿", "简历里已有相邻事实，沿用原文"]
      },
      secure: {
        id: "secure",
        unit: "工作经历",
        title: "工作经历：安全相关能不能写",
        q: "JD 要信任与安全。你做过内容安全、权限或风控的哪一件，是已经发生的？",
        hint: "没有就不写。隐私遮挡、误报治理可以算相邻，不要升级成安全平台。",
        choices: ["没有安全平台经历", "只有隐私 / 误报等相邻事实，按原文改写", "不投这条要求"]
      },
      golang: {
        id: "golang",
        unit: "工作经历",
        title: "工作经历：技术栈缺口怎么处理",
        q: "JD 主栈是 Golang / 后端。你要不要在简历里诚实标成缺口？",
        hint: "缺口可以写「未掌握，不编造项目」。不要补未写过的服务端数字。",
        choices: ["标成技能缺口，不编项目", "有课程 / 练手，但不宜当工作经历", "这条不作为投递重点"]
      },
      collab: {
        id: "collab",
        unit: "工作经历",
        title: "工作经历：跨职能推进怎么说",
        q: "JD 要跨团队推进。你简历里哪一条已经写出协同对象，可以沿用？",
        hint: "沿用已写的团队名。不要补没出现过的法务 / 安全策略。",
        choices: ["沿用已写的 8 个团队协同", "只写「跨部门」，不扩名单", "这条不是我的职责"]
      },
      quality: {
        id: "quality",
        unit: "工作经历",
        title: "工作经历：稳定性有没有原文",
        q: "JD 要质量与交付效率。你有哪条已发生的验收 / 闭环可以沿用？",
        hint: "EVT–PVT、问题优先级可以算。不要补未统计的 SLA。",
        choices: ["沿用验收与问题闭环原文", "没有可公开的质量数字", "不写进本岗投递"]
      },
      product: {
        id: "product",
        unit: "项目经历",
        title: "项目经历：产品效果怎么对齐",
        q: "JD 要产品意识。这个项目里，哪一句已经能证明你对效果负责？",
        hint: "只用已有评分 / 销量 / 误报率。不估算未发生转化。",
        choices: ["沿用已有结果句", "效果句先不写", "改顺序，不改数字"]
      },
      user: {
        id: "user",
        unit: "项目经历",
        title: "项目经历：用户研究怎么改写",
        q: "JD 看重用户与场景。摄像头项目哪一句已经有访谈 / 反馈证据？",
        hint: "2000 条反馈可以沿用。不要补没做过的飞书用户研究。",
        choices: ["沿用 2000 条反馈原文", "只保留场景，不写数量", "这条与本岗无关"]
      },
      zero: {
        id: "zero",
        unit: "项目经历",
        title: "项目经历：0→1 决策能不能写锋利",
        q: "从立项到量产，你做过的第一个不可逆决定是什么？必须已经发生。",
        hint: "先锁需求再定规格，可以写。没决策就写跟进度。",
        choices: ["先用反馈锁需求，再定规格", "只跟进度，没有决策", "简历已写清，沿用"]
      },
      cost: {
        id: "cost",
        unit: "项目经历",
        title: "项目经历：成本取舍",
        q: "压 BOM 时，哪条体验你明确不让步？",
        hint: "对应已写的夜视 / 误报。不要补未发生的毛利。",
        choices: ["夜视和误报不让步", "简历已写清，沿用", "本岗不谈成本"]
      },
      campus: {
        id: "campus",
        unit: "校园经历",
        title: "校园经历：届别与学历",
        q: "JD 写了届别 / 学历。你的公开学历怎么写？没有就标不适用。",
        hint: "只写已发生的学校与学位。不要编 2027 届。",
        choices: ["按真实学历写，不改届别", "本岗学历要求不适用", "学历先不放进投递稿"]
      }
    };
    const askIds = misses.map((m) => m.id).concat(matches.map((m) => m.id));
    const questions = [...new Set(askIds)].map((id) => askBank[id]).filter(Boolean).slice(0, 3);
    const total = keys.length || 1;
    const hitN = matches.length;
    const score = Math.round(28 + 72 * (hitN / total));
    const comments = experienceLines.map((b) => {
      const spans = collectSpans(b.text, keys);
      const hitKeys = keys.filter((k) => spans.some((s) => s.fieldId === k.id) || hit(b.text, k.keys));
      const kind = hitKeys.length ? "match" : "neutral";
      const value = b.value || valueWorkload(b.text);
      return {
        id: b.id,
        kind,
        unit: (hitKeys[0] && hitKeys[0].unit) || "经历",
        labels: hitKeys.map((k) => k.label),
        fieldIds: hitKeys.map((k) => k.id),
        spans,
        text: b.text,
        value,
        suggest: kind === "match"
          ? "这句已抽出字段：" + hitKeys.map((k) => k.label).join("、") + "。" + value.tip
          : value.tip
      };
    });
    const valueNotes = experienceLines
      .filter((b) => (b.value || valueWorkload(b.text)).tier !== "high")
      .slice(0, 4)
      .map((b) => {
        const value = b.value || valueWorkload(b.text);
        return {
          id: "val-" + b.id,
          kind: "value",
          bulletId: b.id,
          labels: [value.label],
          text: b.text,
          resumeQuote: b.text.slice(0, 36),
          suggest: value.tip
        };
      });
    const basicTips = [];
    if (!doc.hasAward) {
      basicTips.push({
        id: "tip-award",
        kind: "basic",
        labels: ["教育 / 其他 · 奖项补强"],
        text: "",
        suggest: "基本信息本阶段不深挖。若教育或其它里还没有奖项 / 竞赛 / 公开作品，可按真实经历补充一条；没有就保持空白，不要编。"
      });
    }
    basicTips.push({
      id: "tip-basic-scope",
      kind: "basic",
      labels: ["分析范围说明"],
      text: "",
      suggest: doc.analysisNote.basic
    });
    /** 字段级命中证据（阅读实验：右栏按 schema 字段，不按整句堆批注） */
    const evidenceNotes = matches.map((m) => ({
      id: "hit-" + m.id,
      kind: "match",
      fieldId: m.id,
      unit: m.unit,
      labels: [m.label],
      bulletId: m.bulletId,
      text: m.resume,
      resumeQuote: m.resumeQuote,
      spans: m.spans,
      suggest: "绿 = 经历原文 span 覆盖该 JD 字段。点左侧高亮可回指。"
    }));
    function secTypeOf(unit) {
      const u = String(unit || "");
      if (/项目/.test(u)) return "project";
      if (/校园|学历|届别/.test(u)) return "campus";
      if (/教育/.test(u)) return "education";
      return "work";
    }
    const gapCursor = {};
    function anchorLine(unit) {
      const type = secTypeOf(unit);
      let pool = (doc.sections || [])
        .filter((s) => s.type === type || (type === "campus" && s.type === "education"))
        .flatMap((s) => s.lines || []);
      const focused = pool.filter((l) => l.focus);
      if (focused.length) pool = focused;
      if (!pool.length) pool = experienceLines.slice();
      if (!pool.length) return null;
      gapCursor[type] = gapCursor[type] || 0;
      const line = pool[gapCursor[type] % pool.length];
      gapCursor[type] += 1;
      return line || null;
    }
    const gapNotes = misses.map((m) => {
      const line = anchorLine(m.unit);
      return {
        id: "gap-" + m.id,
        kind: "gap",
        fieldId: m.id,
        unit: m.unit,
        labels: [m.label],
        bulletId: line ? line.id : "",
        text: line ? line.text : "",
        resumeQuote: line ? String(line.text || "").slice(0, 42) : "",
        jdQuote: jdQuote(jdText, m.keys || []),
        suggest: m.suggest
      };
    });
    return {
      titleLine: (jd && jd.titleLine) || "未命名岗位",
      person: (profile && profile.name) || "候选人",
      role: (profile && profile.role) || "",
      project: (profile && profile.project) || "",
      doc,
      jdKeys: keys.map((k) => ({ id: k.id, label: k.label, on: hit(resumeText, k.keys), unit: k.unit })),
      traits: uniqTraits,
      matches: matches.slice(0, 4),
      misses: misses.slice(0, 4),
      comments,
      evidenceNotes,
      gapNotes,
      valueNotes,
      basicTips,
      score,
      hitN,
      total,
      formula: "匹配度 = 28 + 72 ×（命中字段数 ÷ JD 字段数）。命中优先看项目 / 工作 / 校园经历原文能否抽出 span。基本信息不进主分。",
      analysisNote: doc.analysisNote,
      questions
    };
  }

  function detectGaps(jd, profile) {
    const all = (profile.bullets || []).map((b) => b.text).join(" ");
    const gaps = [];
    if (jd.signals.some((s) => s.id === "metric") && !hasDigit(all)) {
      gaps.push("metric");
    }
    if (jd.signals.some((s) => s.id === "zero") && !hit(all, ["主导", "独立", "0→1", "从0到1", "产品负责人"])) {
      gaps.push("ownership");
    }
    if (!hit(all, ["不编造", "不外补", "未发生", "原简历"])) {
      gaps.push("constraint");
    }
    if (jd.signals.some((s) => s.id === "cost") && !hit(all, ["BOM", "成本", "毛利"])) {
      gaps.push("cost");
    }
    if (gaps.length < 2) gaps.push("audience");
    return [...new Set(gaps)].slice(0, 4);
  }

  const QUESTION_BANK = {
    metric: {
      id: "metric",
      title: "缺漏：可公开沿用的数字",
      q: "这份 JD 要结果。哪些数字已经写在简历上，可以公开沿用？",
      hint: "禁止估算未发生的销量或转化率。空比假数字更安全。",
      choices: ["没有可再补的公开数字", "沿用简历已有的 8 万台 / 12% BOM / 4.6 分", "有，但不宜写进投递稿"]
    },
    ownership: {
      id: "ownership",
      title: "推测：0→1 决策还不够锋利",
      q: "摄像头从 0 到 1，你做的第一个不可逆产品决策是什么？",
      hint: "对齐 JD 的「独立负责智能硬件 0→1」。",
      choices: ["先用 2000 条反馈锁夜视/误报/隐私/安装，再定规格", "只跟进度，没有决策", "简历里已有，确认沿用"]
    },
    constraint: {
      id: "constraint",
      title: "缺漏：你挡住了哪条错误路径",
      q: "如果只留一条你坚持不写进投递稿的事，是什么？",
      hint: "面试官爱听边界，不爱听功能清单。",
      choices: ["不把未发生的销量写成已发生", "不外补转化率", "不把别人的项目成果写成自己的"]
    },
    cost: {
      id: "cost",
      title: "推测：成本与体验怎么取舍",
      q: "压 BOM 时，哪一条体验你明确不让步？",
      hint: "对应 JD：体验、可行性、成本与上市节奏。",
      choices: ["夜视距离和误报率不让步", "只压成本，体验可降", "简历里已写清，沿用"]
    },
    audience: {
      id: "audience",
      title: "缺漏：这个产品卖给谁",
      q: "室内摄像头最终服务谁的哪一个场景？",
      hint: "受众清楚，规格才卖得出去。",
      choices: ["家庭用户的夜间看护与隐私", "安装师傅的施工效率", "渠道要的低价SKU"]
    }
  };

  function questionsFor(jd, profile) {
    const mm = (state().mmQuestions || []).filter((q) => q && q.q).slice(0, 3);
    if (mm.length) return mm;
    const report = alignReport(jd, profile);
    if (report.questions.length) return report.questions;
    return detectGaps(jd, profile).map((id) => QUESTION_BANK[id]).filter(Boolean).slice(0, 3);
  }

  function packFieldsFor(profile) {
    const id = (profile && profile.packId) || "chen-hw";
    const pack = PACK_FIELDS[id];
    if (pack) return pack;
    return (profile.bullets || []).map((b, i) => ({
      id: b.id || ("b" + (i + 1)),
      tag: "经历",
      original: b.text,
      polish: b.text,
      evidence: "来自上传简历原文"
    }));
  }

  function buildDraft(jd, profile, answers) {
    const fields = packFieldsFor(profile);
    const rows = fields.map((f) => ({
      id: f.id,
      status: f.polish && f.polish !== f.original ? "rewrite" : "keep",
      source: f.tag ? ("【" + f.tag + "】") : "事实锁",
      text: f.polish || f.original,
      original: f.original,
      evidence: f.evidence || "",
      tag: f.tag || ""
    }));

    const metricAns = (answers && answers.metric) || "";
    if (jd && jd.signals && jd.signals.some((s) => s.id === "metric")) {
      if (!metricAns || /没有/.test(metricAns)) {
        rows.push({
          id: "metric-gap",
          status: "reject",
          source: "拒绝编造",
          text: "不写入任何转化率 / offer 数。缺口保留为「可用过程指标，但尚未采集」。",
          original: "（原简历没有转化率 / offer 数）",
          evidence: "JD 要复盘指标，档案无证据",
          tag: "边界"
        });
      } else if (hasDigit(metricAns) || metricAns.length > 4) {
        rows.push({
          id: "metric-ask",
          status: "ask",
          source: "用户补事实",
          text: hasDigit(metricAns) ? metricAns : metricAns + "（无新数字，保持定性）",
          original: "（原简历未写此句，来自 Alignment）",
          evidence: "来自 Alignment 追问",
          tag: "补事实"
        });
      }
    }

    const extras = ["constraint", "ownership", "cost", "audience"]
      .map((k) => answers && answers[k] ? { k, v: String(answers[k]).trim() } : null)
      .filter((x) => x && x.v && !/没有|不投|简历里已/.test(x.v));
    extras.slice(0, 2).forEach((x) => {
      if (rows.some((r) => r.text.includes(x.v))) return;
      rows.push({
        id: "ans-" + x.k,
        status: "ask",
        source: "用户补事实",
        text: x.v,
        original: "（原简历未写此句，来自 Alignment）",
        evidence: "Alignment 追问",
        tag: "补事实"
      });
    });

    return rows;
  }

  function escapeHtml(s) {
    return String(s || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  function inlineDiff(oldT, newT) {
    const a = [...(oldT || "")];
    const b = [...(newT || "")];
    if (!a.length && !b.length) return "—";
    if (oldT === newT) return escapeHtml(newT);
    if (a.length * b.length > 12000) {
      return `<span class="del">${escapeHtml(oldT)}</span><span class="ins">${escapeHtml(newT)}</span>`;
    }
    const dp = Array.from({ length: a.length + 1 }, () => Array(b.length + 1).fill(0));
    for (let i = 1; i <= a.length; i++) {
      for (let j = 1; j <= b.length; j++) {
        dp[i][j] = a[i - 1] === b[j - 1] ? dp[i - 1][j - 1] + 1 : Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
    const tok = [];
    const push = (type, ch) => {
      const last = tok[tok.length - 1];
      if (last && last.type === type) last.s += ch;
      else tok.push({ type, s: ch });
    };
    let i = a.length, j = b.length;
    while (i > 0 || j > 0) {
      if (i > 0 && j > 0 && a[i - 1] === b[j - 1]) { push("eq", a[i - 1]); i--; j--; }
      else if (j > 0 && (i === 0 || dp[i][j - 1] >= dp[i - 1][j])) { push("ins", b[j - 1]); j--; }
      else { push("del", a[i - 1]); i--; }
    }
    return tok.slice().reverse().map((t) => {
      const s = escapeHtml([...t.s].reverse().join(""));
      if (t.type === "del") return `<span class="del">${s}</span>`;
      if (t.type === "ins") return `<span class="ins">${s}</span>`;
      return s;
    }).join("");
  }

  function resolveSeg(row, side, editable) {
    if (!row) return null;
    const pick = row.pick || (row.status === "reject" ? "drop" : (row.original && row.text !== row.original ? "accept" : "keep"));
    const changed = !!(row.original && row.text && row.original !== row.text);
    if (side === "left") {
      return {
        id: row.id,
        text: row.original || row.text,
        html: escapeHtml(row.original || row.text),
        changed: changed && pick !== "keep",
        pick,
        editable: false
      };
    }
    const shown = pick === "keep" ? (row.original || row.text) : row.text;
    return {
      id: row.id,
      text: shown,
      html: pick === "accept" && changed ? inlineDiff(row.original, row.text) : escapeHtml(shown),
      changed: pick === "accept" && changed,
      dropped: pick === "drop",
      pick,
      editable: !!editable
    };
  }

  function resumeDoc(profile, jd, side, rows, interactive) {
    const intent = (jd && jd.titleLine) || profile.role;
    const byId = {};
    (rows || []).forEach((r) => { byId[r.id] = r; });
    const pack = packFieldsFor(profile);
    const packBullets = pack.map((f) => {
      const row = byId[f.id];
      if (!row) return interactive ? resolveSeg({ id: f.id, original: f.original, text: f.polish, pick: "drop", status: "reject" }, side, true) : null;
      return resolveSeg(row, side, interactive && side === "right");
    }).filter(Boolean);

    return {
      name: (profile && profile.name) || RESUME_BASE.name,
      role: (profile && profile.role) || RESUME_BASE.role,
      intent: side === "right" ? intent : "",
      lang: RESUME_BASE.lang,
      contacts: RESUME_BASE.contacts,
      summary: RESUME_BASE.summary,
      jobs: (profile && profile.packId === "chen-hw") ? STATIC_JOBS : [],
      packBullets,
      featured: (profile && profile.packId === "chen-hw") ? FEATURED_PROJECT : null,
      education: RESUME_BASE.education,
      skills: RESUME_BASE.skills,
      extras: RESUME_BASE.extras,
      side
    };
  }

  function renderLi(item) {
    if (typeof item === "string") return "<li>" + escapeHtml(item) + "</li>";
    const cls = ["cv-seg"];
    if (item.dropped) cls.push("drop");
    if (item.changed && item.editable) cls.push("is-changed");
    if (item.changed && !item.editable) cls.push("is-done");
    if (item.pick) cls.push("pick-" + item.pick);
    const float = item.editable
      ? '<div class="cv-float"><button type="button" data-act="keep">保留原文</button><button type="button" data-act="accept">用改写</button><button type="button" data-act="drop">删除</button></div>'
      : "";
    const flag = item.changed ? '<span class="cv-flag">已改</span>' : "";
    return `<li class="${cls.join(" ")}" data-id="${escapeHtml(item.id || "")}">${flag}${item.html || escapeHtml(item.text || "")}${float}</li>`;
  }

  function renderSheet(doc) {
    const d = doc || {};
    const packLis = (d.packBullets || []).map(renderLi).join("");
    const jobs = (d.jobs || []).map((job) => {
      const projects = (job.projects || []).map((p) => {
        const bullets = p.pack
          ? packLis
          : (p.bullets || []).map((t) => "<li>" + escapeHtml(t) + "</li>").join("");
        return '<div class="cv-proj"><h4>' + escapeHtml(p.title) + "</h4>" +
          (p.lead ? '<p class="cv-lead">' + escapeHtml(p.lead) + "</p>" : "") +
          "<ul>" + bullets + "</ul></div>";
      }).join("");
      return '<div class="cv-exp"><div class="cv-exp-h"><h3>' + escapeHtml(job.company) + '</h3><p class="cv-meta">' + escapeHtml(job.time) + "</p></div>" +
        '<p class="cv-job">' + escapeHtml(job.title) + "</p>" +
        (job.intro ? '<p class="cv-co">' + escapeHtml(job.intro) + "</p>" : "") +
        projects + "</div>";
    }).join("");
    const feat = d.featured || {};
    return '<article class="cv-sheet">' +
      '<header class="cv-head">' +
        "<h1>" + escapeHtml(d.name || "陈宇航") + "</h1>" +
        '<p class="cv-role">' + escapeHtml(d.intent ? ("求职意向：" + d.intent) : (d.role || "")) + "</p>" +
        (d.intent && d.role ? '<p class="cv-note">' + escapeHtml(d.role) + "</p>" : "") +
        '<p class="cv-note">' + escapeHtml(d.lang || "") + "</p>" +
        '<div class="cv-contacts">' + (d.contacts || []).map((c) => "<span><b>" + escapeHtml(c.label) + ":</b> " + escapeHtml(c.value) + "</span>").join("") + "</div>" +
      "</header>" +
      '<section class="cv-sec"><h2>个人简介</h2>' + (d.summary || []).map((p) => '<p class="cv-sum">' + escapeHtml(p) + "</p>").join("") + "</section>" +
      '<section class="cv-sec"><h2>核心能力</h2><div class="cv-skills">' + (d.skills || []).map((s) =>
        "<div><h4>" + escapeHtml(s.name) + "</h4><p>" + escapeHtml(s.text) + "</p></div>"
      ).join("") + "</div></section>" +
      '<section class="cv-sec"><h2>工作经历</h2>' + jobs + "</section>" +
      (feat.title
        ? '<section class="cv-sec"><h2>项目经验</h2><div class="cv-exp"><div class="cv-exp-h"><h3>' + escapeHtml(feat.title || "") + '</h3><p class="cv-meta">' + escapeHtml(feat.role || "") + "</p></div>" +
        '<p class="cv-co">' + escapeHtml(feat.background || "") + "</p>" +
        '<p class="cv-extra"><b>核心产品决策：</b>' + escapeHtml(feat.decisions || "") + "</p>" +
        '<p class="cv-extra"><b>本人职责：</b>' + escapeHtml(feat.duties || "") + "</p>" +
        '<p class="cv-extra"><b>最终成果：</b>' + escapeHtml(feat.result || "") + "</p></div></section>"
        : "") +
      '<section class="cv-sec"><h2>教育背景</h2>' + (d.education || []).map((e) =>
        '<div class="cv-edu"><div><h3>' + escapeHtml(e.school) + '</h3><p class="deg">' + escapeHtml(e.degree) + '</p><p class="det">' + escapeHtml(e.detail) + "</p></div><p class=\"cv-meta\">" + escapeHtml(e.time) + "</p></div>"
      ).join("") + "</section>" +
      '<section class="cv-sec"><h2>其他信息</h2>' + (d.extras || []).map((x) =>
        '<p class="cv-extra"><b>' + escapeHtml(x.label) + "：</b>" + escapeHtml(x.text) + "</p>"
      ).join("") + "</section>" +
    "</article>";
  }

  function resumeExportHtml(sheetInner) {
    return "<!doctype html><html lang=\"zh-CN\"><head><meta charset=\"utf-8\"><title>陈宇航 · 简历</title>" +
      "<link rel=\"stylesheet\" href=\"https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;600;700&family=Noto+Serif+SC:wght@700&display=swap\">" +
      "<style>body{margin:0;background:#fff} .cv-sheet{max-width:840px;margin:0 auto;border:0}" +
      "@page{size:A4;margin:10mm} @media print{body{background:#fff}}</style>" +
      "<link rel=\"stylesheet\" href=\"assets/resume-sheet.css\">" +
      "</head><body>" + sheetInner + "</body></html>";
  }

  function matchScore(jd, draft) {
    const usable = (draft || []).filter((r) => r.status !== "reject").length;
    const need = Math.max((jd && jd.signals && jd.signals.length) || 0, 3);
    return Math.min(94, 62 + Math.round((usable / need) * 28));
  }

  function localAlignEdit(kind, labels, suggest) {
    if (kind === "match") {
      return "这句已命中「" + (labels || []).join("、") + "」。下一步只调语序和岗位措辞，数字保持原文。不要补未发生的安全平台或 Golang 项目。";
    }
    if (kind === "gap") {
      return suggest || "JD 有这条要求，简历没有直接证据。标成缺口，或只改写相邻事实。禁止编造。";
    }
    return "这句没有直接命中当前 JD 关键词。可以保持原样。若要改，先说明它服务哪条相邻要求，仍只能用已发生的事实。";
  }

  async function mmAlignEdit(jd, sentence, kind, labels) {
    const text = await mmChat([
      {
        role: "system",
        content: "你是简职 Alignment 审阅助手。用户在看一句简历原文和 JD。只讨论如何在不编造经历/数字的前提下改表述。用中文短段落，最多 120 字。"
      },
      {
        role: "user",
        content: "岗位：" + ((jd && jd.titleLine) || "") + "\n句子：" + (sentence || "（JD 缺口，无对应原句）") + "\n状态：" + kind + "\n关键词：" + (labels || []).join("、") + "\n请给出可执行的改法或明确说不要写。"
      }
    ], 400);
    return text || localAlignEdit(kind, labels);
  }

  const SAMPLE_JOBS = {
    big: [
      { company: "腾讯", title: "产品经理 · PCG", why: "要 0→1 收束 + 跨端同一数据" },
      { company: "字节跳动", title: "AI 产品经理", why: "要可评测的 Agent 编排，而不是套壳聊天" },
      { company: "阿里巴巴", title: "体验设计师", why: "要规范沉淀与多角色协作" }
    ],
    startup: [
      { company: "早期 AI Agent 团队", title: "Founding Designer", why: "要你能把混乱 Demo 收成可演示闭环" },
      { company: "垂直求职工具", title: "Product Designer", why: "要插件现场执行 + Tracker 飞轮" },
      { company: "多模态创业公司", title: "AI UX", why: "要 Alignment：人机认知一致才允许行动" }
    ]
  };

  function mentorInsight(jobs, profile) {
    const big = jobs.filter((j) => j.scene !== "startup");
    const start = jobs.filter((j) => j.scene === "startup");
    const titles = jobs.map((j) => (j.title + " " + j.company).toLowerCase()).join(" ");
    const skills = [];
    if (/产品|pm|manager/.test(titles)) skills.push({ name: "把体验决策写成可验收指标", scene: "大厂 / 中厂" });
    if (/设计|ux|ui/.test(titles)) skills.push({ name: "组件 / Pattern 而不是单页视觉", scene: "大厂 / 中厂" });
    if (/agent|ai/.test(titles)) skills.push({ name: "状态、预览、确认、恢复", scene: "两类都要" });
    if (start.length) skills.push({ name: "0→1 收束与亲自验证原型", scene: "初创" });
    if (!hasDigit((profile.bullets || []).map((b) => b.text).join(" "))) {
      skills.push({ name: "可公开过程指标（测试人数 / 走查页数）", scene: "大厂更卡" });
    }
    const path = [];
    if (big.length && start.length) {
      path.push("你同时在看大厂岗位与初创岗位。大厂买的是可协作、可评测、可复盘；初创买的是你能把模糊问题收成可演示闭环。");
      path.push("成长路径不要两边都装：先用 1 个项目把 Grounding + Agent 控制 + 飞轮讲穿，再按场景换措辞。");
    } else if (big.length) {
      path.push("目标偏大厂 / 中厂：补过程指标、系统边界、协作方式，少讲「我画了很多页」。");
    } else if (start.length) {
      path.push("目标偏初创：强调入场时的混乱、你挡住的错误路径、以及你能独立把原型跑起来。");
    } else {
      path.push("还没有岗位记忆。先加入 2–3 个你真想投的 JD，Mentor 才能开始分化成长路径。");
    }
    return {
      bigCount: big.length,
      startCount: start.length,
      skills: skills.slice(0, 5),
      path,
      recs: {
        big: SAMPLE_JOBS.big,
        startup: SAMPLE_JOBS.startup
      }
    };
  }

  function rates(apps) {
    const n = apps.length || 0;
    const interview = apps.filter((a) => ["interview", "offer"].includes(a.status)).length;
    const offer = apps.filter((a) => a.status === "offer").length;
    const rejected = apps.filter((a) => a.status === "rejected");
    const reasons = {};
    rejected.forEach((a) => { const k = a.reason || "未标注"; reasons[k] = (reasons[k] || 0) + 1; });
    const topReason = Object.entries(reasons).sort((a, b) => b[1] - a[1])[0];
    return {
      n,
      success: n ? Math.round((interview / n) * 100) : 0,
      interviewPass: interview ? Math.round((offer / interview) * 100) : 0,
      reasons,
      topReason: topReason ? topReason[0] : "尚无拒绝样本"
    };
  }

  const MM_STORE = "jc_mm_v1";
  const MM_HOSTS = [
    "http://127.0.0.1:4188/v1/chat/completions",
    "https://api.minimax.cn/v1/chat/completions",
    "https://api.minimaxi.com/v1/chat/completions"
  ];

  function mmLoad() {
    try { return JSON.parse(localStorage.getItem(MM_STORE) || "{}"); } catch { return {}; }
  }
  function mmSave(patch) {
    const next = Object.assign(mmLoad(), patch);
    localStorage.setItem(MM_STORE, JSON.stringify(next));
    return next;
  }
  function mmKey() { return (mmLoad().key || "").trim(); }
  function stripThink(text) {
    return String(text || "").replace(/<think>[\s\S]*?<\/think>/gi, "").trim();
  }
  function parseJsonish(text) {
    const raw = stripThink(text);
    const fence = raw.match(/```(?:json)?\s*([\s\S]*?)```/);
    const body = fence ? fence[1] : raw;
    const bracket = body.indexOf("[");
    const brace = body.indexOf("{");
    const start = bracket >= 0 && (brace < 0 || bracket < brace) ? bracket : brace;
    const endBracket = body.lastIndexOf("]");
    const endBrace = body.lastIndexOf("}");
    const end = start === bracket ? endBracket : endBrace;
    if (start < 0 || end < 0) throw new Error("MiniMax 没有返回 JSON");
    return JSON.parse(body.slice(start, end + 1));
  }

  async function mmChat(messages, maxTokens, model) {
    const key = mmKey();
    if (!key) throw new Error("还没有本机 MiniMax Key");
    const payloadObj = {
      model: model || "MiniMax-M2.5",
      messages,
      max_tokens: maxTokens || 1024,
      temperature: 0.3
    };
    if ((model || "").indexOf("M3") >= 0) payloadObj.thinking = { type: "disabled" };
    const payload = JSON.stringify(payloadObj);
    let lastErr = null;
    for (const url of MM_HOSTS) {
      try {
        const res = await fetch(url, {
          method: "POST",
          headers: { Authorization: "Bearer " + key, "Content-Type": "application/json" },
          body: payload
        });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
          lastErr = new Error((data.base_resp && data.base_resp.status_msg) || (data.error && data.error.message) || ("HTTP " + res.status));
          if (res.status === 401 || res.status === 403) throw lastErr;
          continue;
        }
        const msg = data.choices && data.choices[0] && data.choices[0].message;
        return stripThink(msg && msg.content);
      } catch (err) {
        lastErr = err;
      }
    }
    throw lastErr || new Error("MiniMax 调用失败。本机可开 4188 代理避开跨域。");
  }

  async function mmAlignmentQuestions(jd, profile) {
    const gaps = detectGaps(jd, profile);
    const text = await mmChat([
      {
        role: "system",
        content: "你是 JianCareer 的 Alignment Tutor。只追问缺漏，禁止编造经历、转化率、offer 数。最多 4 个问题。只输出 JSON 数组，每项: {\"id\":\"metric|ownership|constraint|agent|audience\",\"title\":\"推测或缺漏：...\",\"q\":\"具体问题\",\"hint\":\"没有就写没有，不要编。\",\"choices\":[\"点选答案1\",\"点选答案2\",\"点选答案3\"]}"
      },
      {
        role: "user",
        content: "基于这份 JD 和简历事实，生成 3 到 4 个 Alignment 追问。优先覆盖 gapIds。没有证据就问有没有，不要替用户写答案。\n" + JSON.stringify({
          title: jd.titleLine,
          evidence: jd.evidence,
          signals: (jd.signals || []).map((s) => s.label),
          facts: profile,
          gapIds: gaps
        })
      }
    ], 1200);
    const arr = parseJsonish(text);
    if (!Array.isArray(arr)) throw new Error("追问格式不对");
    return arr.slice(0, 4).map((q, i) => ({
      id: String(q.id || ("q" + i)).slice(0, 32),
      title: String(q.title || "Alignment 追问"),
      q: String(q.q || ""),
      hint: String(q.hint || "没有就写没有，不要编。"),
      choices: Array.isArray(q.choices) ? q.choices.slice(0, 4).map(String) : (QUESTION_BANK[q.id] && QUESTION_BANK[q.id].choices) || []
    })).filter((q) => q.q);
  }

  async function mmMentorInsight(jobs, profile, appRates) {
    const text = await mmChat([
      {
        role: "system",
        content: "你是 JianCareer Mentor。根据想投岗位记忆，分化大厂/中厂 vs 初创成长路径。禁止编造用户没做过的经历。只输出 JSON: {\"path\":[\"...\"],\"skills\":[{\"name\":\"...\",\"scene\":\"大厂 / 中厂|初创|两类都要\"}],\"recs\":{\"big\":[{\"company\":\"...\",\"title\":\"...\",\"why\":\"...\"}],\"startup\":[{\"company\":\"...\",\"title\":\"...\",\"why\":\"...\"}]}}"
      },
      { role: "user", content: JSON.stringify({ jobs, profile, rates: appRates }) }
    ], 1400);
    const data = parseJsonish(text);
    const local = mentorInsight(jobs, profile);
    return {
      path: Array.isArray(data.path) && data.path.length ? data.path.slice(0, 4) : local.path,
      skills: Array.isArray(data.skills) && data.skills.length ? data.skills.slice(0, 5) : local.skills,
      recs: {
        big: (data.recs && data.recs.big && data.recs.big.length) ? data.recs.big.slice(0, 3) : local.recs.big,
        startup: (data.recs && data.recs.startup && data.recs.startup.length) ? data.recs.startup.slice(0, 3) : local.recs.startup
      },
      bigCount: local.bigCount,
      startCount: local.startCount,
      fromMiniMax: true
    };
  }

  async function mmReadStructured(prompt, image, model) {
    const user = image
      ? [{ type: "text", text: prompt }, { type: "image_url", image_url: { url: image } }]
      : prompt;
    const text = await mmChat([
      { role: "system", content: "只根据输入里真实出现的内容抽取。禁止编造转化率、offer、用户没写过的经历。只输出 JSON。" },
      { role: "user", content: user }
    ], 1400, model || (image ? "MiniMax-M3" : "MiniMax-M2.5"));
    return parseJsonish(text);
  }

  async function mmParseJD({ text, image }) {
    if (!mmKey()) {
      if (text) return parseJD(text);
      throw new Error("截图识别需要 MiniMax Key，或改用文本粘贴");
    }
    try {
      const data = await mmReadStructured(
        "从这份 JD（截图或文本）抽取 JSON: {\"titleLine\":\"公司 · 岗位\",\"evidence\":[\"原文短句\"],\"raw\":\"可读全文\"}。evidence 必须是原文，不要改写。\n" + (text || "见图片"),
        image
      );
      const raw = String(data.raw || text || "").trim();
      const local = parseJD(raw || text || data.titleLine || "");
      return {
        raw: raw || local.raw,
        titleLine: data.titleLine || local.titleLine,
        evidence: Array.isArray(data.evidence) && data.evidence.length ? data.evidence.slice(0, 6) : local.evidence,
        signals: local.signals
      };
    } catch (err) {
      if (text) return parseJD(text);
      throw err;
    }
  }

  async function mmParseResume({ text, image }) {
    if (!mmKey()) return parseResumeText(text || "");
    try {
      const data = await mmReadStructured(
        "从这份简历抽取 JSON: {\"name\":\"姓名\",\"project\":\"项目名\",\"role\":\"角色\",\"time\":\"时间\",\"bullets\":[\"只保留原文事实，不要润色\"]}。没有的字段留空。禁止添加数字。\n" + (text || "见图片"),
        image
      );
      const bullets = (Array.isArray(data.bullets) ? data.bullets : []).filter(Boolean).slice(0, 8)
        .map((t, i) => ({ id: "b" + (i + 1), text: String(t), locked: true }));
      const local = parseResumeText(text || bullets.map((b) => b.text).join("\n"));
      return {
        name: data.name || local.name,
        project: data.project || local.project,
        role: data.role || local.role,
        time: data.time || local.time,
        packId: local.packId || "upload",
        bullets: bullets.length ? bullets : local.bullets,
        source: "resume"
      };
    } catch (err) {
      return parseResumeText(text || "");
    }
  }

  function mountMiniMaxBar() {
    if (document.getElementById("mmBar")) return;
    const bar = document.createElement("div");
    bar.id = "mmBar";
    bar.className = "mm-bar";
    const connected = !!mmKey();
    const fields =
      "<input id=\"mmKeyInput\" type=\"password\" placeholder=\"粘贴 MiniMax 会员 Key\" autocomplete=\"off\">" +
      "<button type=\"button\" class=\"btn btn-secondary\" id=\"mmSave\">保存到本机</button>" +
      "<button type=\"button\" class=\"btn btn-secondary\" id=\"mmClear\">清除</button>";
    if (document.body.classList.contains("gd")) {
      bar.innerHTML =
        "<details class=\"mm-fold\">" +
          "<summary><span class=\"mm-dot " + (connected ? "on" : "") + "\"></span>MiniMax · " +
            (connected ? "已连接" : "未连接") + "</summary>" +
          "<div class=\"mm-fold-body\">" +
            "<span class=\"small\">" + (connected ? "本机 Token Plan 可读 JD / 简历，不编经历" : "Key 只存在这台浏览器，不进仓库") + "</span>" +
            fields +
          "</div>" +
        "</details>";
    } else {
      bar.innerHTML = "<b>MiniMax</b><span class=\"mm-dot " + (connected ? "on" : "") + "\"></span>" +
        "<span class=\"small\">" + (connected ? "本机 Token Plan 已连接 · 可读 JD/简历，不编经历" : "未连接 · Key 只存在这台浏览器，不进仓库") + "</span>" +
        fields;
    }
    const nav = document.querySelector(".topbar");
    if (nav) nav.after(bar); else document.body.prepend(bar);
    document.getElementById("mmSave").onclick = () => {
      const value = document.getElementById("mmKeyInput").value.trim();
      if (!value) return;
      mmSave({ key: value });
      document.getElementById("mmKeyInput").value = "";
      mountMiniMaxBar.refresh();
    };
    document.getElementById("mmClear").onclick = () => {
      localStorage.removeItem(MM_STORE);
      mountMiniMaxBar.refresh();
    };
  }
  mountMiniMaxBar.refresh = () => {
    const el = document.getElementById("mmBar");
    if (el) el.remove();
    mountMiniMaxBar();
  };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", mountMiniMaxBar);
  else mountMiniMaxBar();

  function probeQuestions(sec, report) {
    const title = (sec && sec.title) || "这段经历";
    const unit = /项目/.test(title) ? "项目经历" : /校园/.test(title) ? "校园经历" : "工作经历";
    const lines = ((sec && sec.lines) || []).filter((l) => l.focus);
    const thin = lines.find((l) => l.value && l.value.tier !== "high") || lines[0];
    const snippet = thin ? String(thin.text || "").replace(/\s+/g, " ").slice(0, 28) : "原句";
    const gaps = ((report && report.gapNotes) || []).filter((g) =>
      lines.some((l) => l.id === g.bulletId)
    );
    const gapLabel = (gaps[0] && (gaps[0].labels || [])[0]) || "JD 字段";
    return [
      {
        id: "gem",
        unit,
        title: "最值钱的环节",
        q: "在「" + title + "」里，已经发生、能公开写的最值钱环节是哪一块？",
        hint: "没有量化结果就写没有。禁止编转化率、完成率、offer 数。",
        choices: ["规模 / 服务了谁（原文已有数字才写）", "一个已发生的不可逆决策", "把混乱收成可演示路径", "没有更值钱的，保持原句"]
      },
      {
        id: "sharp",
        unit,
        title: "哪句该写锋利",
        q: "「" + snippet + (snippet.length >= 28 ? "…" : "") + "」这句工作量偏薄。你想把它写成这段的主轴，还是只补定性约束？",
        hint: "只改表述。数字必须来自原简历。",
        choices: ["写成这段主轴", "只补一句已发生的约束", "这句保持原样"]
      },
      {
        id: "gap",
        unit,
        title: "缺口怎么处理",
        q: gaps.length
          ? "这段对上 JD 的「" + gapLabel + "」目前是缺口。怎么处理？"
          : "这段如果还有对不上 JD 的要求，怎么处理？",
        hint: "不会的技术栈、没做过的平台，直接标缺口。不要编项目补上。",
        choices: ["标成缺口，不编项目", "有相邻事实，只改表述", "这条要求先不作为投递重点"]
      }
    ];
  }

  function localProbePropose(sec, answers) {
    const lines = ((sec && sec.lines) || []).filter((l) => l.focus);
    const thin = lines.find((l) => l.value && l.value.tier !== "high");
    const high = lines.find((l) => l.value && l.value.tier === "high");
    const gem = String((answers && answers.gem) || "");
    const sharp = String((answers && answers.sharp) || "");
    const best = (/主轴/.test(sharp) && thin) ? thin : (high || thin || lines[0]);
    if (!best) {
      return { lineId: "", original: "", next: "", why: "这段没有可追问的经历句。" };
    }
    const extra = String((answers && answers._extra) || "").trim();
    const origAll = lines.map((l) => l.text).join(" ");
    if (extra && /\d/.test(extra)) {
      const hasInOrig = extra.split(/\D+/).filter(Boolean).every((d) => origAll.indexOf(d) !== -1);
      if (!hasInOrig) {
        return {
          lineId: best.id,
          original: best.text,
          next: best.text,
          blocked: true,
          why: "你补充了原文没有的数字。本页不会写入。删掉数字，或确认它本来就在简历里。"
        };
      }
    }
    let next = best.text;
    let why = "追问用来想清楚最值钱的环节。改写不新增经历，数字与原文一致。";
    if (/保持原句|没有更值钱|保持原样/.test(gem + sharp)) {
      why = "你选择保持原句。最值钱的环节就是现有写法。";
    } else if (/决策/.test(gem)) {
      why = /主导|决定|先|锁|不可逆/.test(best.text)
        ? "把已发生决策当作这段主轴。没有的决策不会补进去。"
        : "原文没有可前置的决策。保持原句，标成可提升，不编造。";
    } else if (/路径|收成/.test(gem)) {
      why = "强调把混乱收成可演示路径。不新增页数或完成率。";
    } else if (/规模/.test(gem)) {
      why = "规模只保留原文数字。原文没有的量不补。";
    }
    if (extra && !/\d/.test(extra) && !/保持原句|没有更值钱|保持原样/.test(gem + sharp)) {
      next = best.text.replace(/[。．]?$/, "。") + extra.replace(/[。．]?$/, "。");
      why = "把你补充的定性事实接在原句后，未写入新数字。";
    }
    return { lineId: best.id, original: best.text, next, why };
  }

  window.JCLab = {
    DEFAULT_PROFILE,
    SAMPLE_JD,
    SAMPLE_POSTINGS,
    SAMPLE_JOBS,
    SIGNALS,
    ACCOUNT_RESUMES,
    profileFromResume,
    resolveJobFromUrl,
    resolveResumeFromUrl,
    load,
    save,
    state,
    parseJD,
    parseResumeText,
    buildAlignDoc,
    alignReport,
    detectGaps,
    questionsFor,
    packFieldsFor,
    buildDraft,
    resumeDoc,
    renderSheet,
    resumeExportHtml,
    matchScore,
    mentorInsight,
    rates,
    mmKey,
    mmChat,
    mmAlignmentQuestions,
    mmMentorInsight,
    mmAlignEdit,
    localAlignEdit,
    probeQuestions,
    localProbePropose,
    mmParseJD,
    mmParseResume
  };
})();
