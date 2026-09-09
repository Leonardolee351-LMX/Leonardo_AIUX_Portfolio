(function () {
  const COMPONENTS = [
    { id: "logo", name: "Logo", desc: "Brand / 浅底 / 深底 / 现网 lockup", group: "Core", preview: '<img src="../brand/logo-brand.png" alt="" style="height:32px;width:auto">' },
    { id: "icons", name: "UI Icons", desc: "search / mail / bell / menu PNG", group: "Core", preview: '<div class="row"><img src="assets/img/icon-search.png" width="20" height="20" alt=""><img src="assets/img/icon-mail.png" width="20" height="20" alt=""><img src="assets/img/icon-bell.png" width="20" height="20" alt=""></div>' },
    { id: "guest-nav", name: "Guest Nav", desc: "未登录顶栏 · index / login / register", group: "Core", preview: '<img src="assets/img/logo-jiancareer.png" alt="" style="height:22px;width:auto">' },
    { id: "app-nav", name: "App Nav", desc: "登录后顶栏 · dashboard", group: "Core", preview: '<div class="row"><span class="sub" style="color:#00a9bc">工作台</span></div>' },
    { id: "button", name: "Button", desc: "调性规格 + 页面胶囊 / 橙色主路径", group: "Core", preview: '<div class="row"><button class="btn solid">Button</button><button class="btn highlight">Button</button></div>' },
    { id: "input", name: "Text Field", desc: "登录注册输入框 · 左侧图标", group: "Core", preview: '<div class="pg" style="width:100%"><div class="input"><input value="邮箱 / 用户ID"></div></div>' },
    { id: "tag", name: "Pill / Tag / Status", desc: "首页 kicker · 技能标签 · Tracker 状态", group: "Core", preview: '<div class="pg row"><span class="tag on">AI 产品</span><span class="st int">面试邀请</span></div>' },
    { id: "auth", name: "Login Card", desc: "login.html 右侧白卡片", group: "Auth", preview: '<img src="assets/img/auth-login-visual.png" alt="" style="height:64px;width:auto;border-radius:8px">' },
    { id: "register", name: "Register Visual", desc: "register.html 插画 + 徽章", group: "Auth", preview: '<img src="assets/img/auth-register-visual.png" alt="" style="height:64px;width:auto;border-radius:8px">' },
    { id: "upload", name: "Resume Dropzone", desc: "upload.html 虚线上传框", group: "Onboard", preview: '<img src="assets/img/icon-upload.png" alt="" width="32" height="32">' },
    { id: "agent", name: "Agent Overlay", desc: "读取简历四步", group: "Onboard", preview: '<div class="sub">识别 · 抽取 · 核对 · 预览</div>' },
    { id: "profile", name: "Profile Form", desc: "profile.html 分步资料卡", group: "Onboard", preview: '<div class="sub">基本信息 / 教育 / 工作</div>' },
    { id: "complete", name: "Profile Completion", desc: "工作台完整度圆环", group: "Dashboard", preview: '<b style="color:#00b0c2">78%</b>' },
    { id: "track", name: "Tracker Table", desc: "投递跟踪表 + 状态胶囊", group: "Dashboard", preview: '<div class="pg"><span class="st int">面试邀请</span></div>' },
    { id: "home", name: "Homepage pieces", desc: "主句 + Guest Nav + 信任条", group: "Pages", preview: '<div style="text-align:left;width:100%"><b style="font-size:16px">规划清楚，改好简历，一键投递</b></div>' },
    { id: "feature", name: "Feature Grid", desc: "首页四列功能", group: "Pages", preview: '<div class="sub">修改简历 · 规划 · 投递 · 跟踪</div>' },
    { id: "story", name: "Story Card", desc: "功能介绍 / 关于我们", group: "Pages", preview: '<div class="sub">白卡片四宫格</div>' }
  ];

  const DETAILS = {
    Logo: {
      tokens: ["logo-brand", "logo-on-light", "logo-on-dark", "logo-jiancareer", "icon-logo"],
      usage: [
        ["When", "任何需要品牌识别的顶栏、页脚、Favicon。"],
        ["Where", "实验室顶栏用 logo-brand；现网 chrome 用 logo-jiancareer；Favicon 用 icon-logo。"],
        ["Don't", "不要再画 J 方块或 SVG 箭头标。三态文件已经齐。"]
      ],
      guidelines: [
        ["Height", "顶栏 lockup 高度 40px。"],
        ["Background", "Brand 放浅底或深底都可以，因为文件自带透明。"]
      ],
      source: '<img src="../brand/logo-brand.png" alt="简职 JianCareer" height="40" />'
    },
    "UI Icons": {
      tokens: ["icon-search", "icon-mail", "icon-bell", "icon-menu", "icon-logout", "icon-upload", "icon-trash"],
      usage: [
        ["When", "App 顶栏工具、上传、删除、退出。"],
        ["Where", "jc-nav.js 与现网 chrome.js 共用同一套 PNG。"],
        ["Don't", "不要用 Lucide / 手绘 SVG 替换这套图标。"]
      ],
      guidelines: [
        ["Size", "顶栏 20px，菜单 22px，热区 40px。"],
        ["Color", "图标本身已带颜色，容器只负责热区和 hover 底。"]
      ],
      source: '<button class="jc-icon" aria-label="搜索">\n  <img src="../brand/icon-search.png" width="20" height="20" alt="">\n</button>'
    },
    "Guest Nav": {
      tokens: ["logo-jiancareer", "button.fill #00A9BC", "72px bar"],
      usage: [
        ["When", "未登录的营销页、登录注册页。"],
        ["Where", "完整网页原型 index / login / register。"],
        ["Don't", "Guest 顶栏不要放工作台五入口，也不要放搜索铃铛。"]
      ],
      guidelines: [
        ["IA", "只保留功能介绍、关于我们。"],
        ["Actions", "登录是主按钮，注册是描边。"]
      ],
      source: '<NavBar variant="guest" items={["功能介绍","关于我们"]} />'
    },
    "App Nav": {
      tokens: ["logo-jiancareer", "icon-search", "icon-mail", "icon-bell"],
      usage: [
        ["When", "用户已登录，在工作台与后续入口之间切换。"],
        ["Where", "prototype/dashboard.html。"],
        ["Don't", "不要把实验室顶栏的 logo-brand 换进这套产品页。"]
      ],
      guidelines: [
        ["IA", "工作台 / 简历修改 / AI职场导师 / 求职跟踪。"],
        ["Icons", "必须用 PNG，与 chrome.js 同一套。"]
      ],
      source: '<NavBar variant="app" />'
    },
    Button: {
      tokens: ["#00B0C2 默认", "#FCB000 高亮", "radius 12", "padding 9 / 24", "icon 16 / 20 optional"],
      usage: [
        ["When", "主行动用默认青绿。次行动用勾边。需要强调但不是主 CTA 时用高亮金。"],
        ["Where", "首页立即体验、工作台主按钮、插件底栏。icon 是 Variable，可有可无。"],
        ["Don't", "不要把高亮金和默认青绿并排放两个同等主按钮。Loading 要保 min-width，避免字宽跳动。"]
      ],
      guidelines: [
        ["States", "正常 / 悬浮（更浅）/ 激活（更深）/ 禁用（浅灰）/ 加载中。"],
        ["Icon", "icon 只出现在文字左侧。Small 16px，Large 20px。没有 icon 时不要留空位。"]
      ],
      source: '<Button variant="primary" size="lg" icon={<Check />}>Button</Button>\n<Button variant="outline">Button</Button>\n<Button variant="highlight">Button</Button>'
    },
    "Text Field": {
      tokens: ["auth.css .input", "radius 10", "focus ring teal"],
      usage: [
        ["When", "登录、注册、设定里要填邮箱或密码。"],
        ["Where", "login.html / register.html / settings.html。"],
        ["Don't", "不要做成没图标的单线框。页面里左侧一定有图标。"]
      ],
      guidelines: [
        ["Focus", "边框 #00B0C2，外环 rgba(0,176,194,.12)。"],
        ["Ghost", "密码可见、获取验证码放在输入框右侧。"]
      ],
      source: '<div class="field"><label>邮箱 / 用户ID</label><div class="input">…</div></div>'
    },
    "Login Card": {
      tokens: ["auth-card 24", "auth-tabs", "btn-primary block"],
      usage: [
        ["When", "登录。左插画右表单。"],
        ["Where", "login.html。"],
        ["Don't", "不要把插画换成纯色块。"]
      ],
      guidelines: [
        ["Tabs", "账号登录 / 验证码登录。"],
        ["Social", "微信 / Apple / Google 圆形按钮。"]
      ],
      source: "// source: 完整网页原型逐页实现/login.html"
    },
    "Resume Dropzone": {
      tokens: ["choice-drop", "icon-upload", "dashed #7fd4d4"],
      usage: [
        ["When", "注册后建档第一步。"],
        ["Where", "upload.html。"],
        ["Don't", "三条路径都要在：自动识别、手填、先逛首页。"]
      ],
      guidelines: [
        ["CTA", "主路径橙色，次路径青绿，跳过用描边。"],
        ["Agent", "上传后必须看见四步读取，不能只 toast。"]
      ],
      source: "// source: 完整网页原型逐页实现/upload.html"
    },
    "Tracker Table": {
      tokens: [".st.int", ".st.view", ".st.wait", "table.jobs"],
      usage: [
        ["When", "投过的岗位进 Tracker。"],
        ["Where", "dashboard.html 04 投递跟踪。"],
        ["Don't", "不要用假匹配分卡片替代这张表。"]
      ],
      guidelines: [
        ["Status", "面试邀请 / 已查看 / 待处理 用状态胶囊。"],
        ["Next", "下一步建议来自改写缺口，不是再推新职位。"]
      ],
      source: "// source: 完整网页原型逐页实现/dashboard.html"
    },
    "Homepage pieces": {
      tokens: ["Guest Nav", "btn-primary pill", "logo-chip"],
      usage: [
        ["When", "对外讲产品承诺。"],
        ["Where", "完整网页原型逐页实现/index.html。"],
        ["Don't", "首页不是 Dashboard 缩小版，不要岗位广场。"]
      ],
      guidelines: [
        ["Copy", "主句保持「规划清楚，改好简历，一键投递」。"],
        ["Hero", "右侧是工作台浮层 mock。"]
      ],
      source: "// source: 完整网页原型逐页实现/index.html"
    },
    "Register Visual": {
      tokens: ["auth-register-visual.png", "planar-badge", "reg-stat"],
      usage: [
        ["When", "注册页左侧讲「识 / 入」。"],
        ["Where", "register.html。"],
        ["Don't", "不要把插画换成渐变色块。"]
      ],
      guidelines: [
        ["Badges", "识 智能解析、入 一键导入。"],
        ["Copy", "注册后继续同一份档案，不重新建档。"]
      ],
      source: "// source: 完整网页原型逐页实现/register.html"
    },
    "Agent Overlay": {
      tokens: ["agent-card", "agent-steps"],
      usage: [
        ["When", "用户刚上传简历，Agent 正在读文件。"],
        ["Where", "upload.html 遮罩。"],
        ["Don't", "不能只 toast 成功。四步必须看见。"]
      ],
      guidelines: [
        ["Copy", "只整理简历里的事实，不编造数字。"],
        ["States", "done / is-on / pending。"]
      ],
      source: "// source: 完整网页原型逐页实现/upload.html"
    },
    "Profile Form": {
      tokens: ["pf-steps", "pf-card", "pf-field"],
      usage: [
        ["When", "建档分步填写。"],
        ["Where", "profile.html。"],
        ["Don't", "必填用红星。禁止替用户填量化结果。"]
      ],
      guidelines: [
        ["Steps", "基本信息 / 教育 / 工作 / 项目 / 技能。"],
        ["Radius", "字段圆角 8px，卡片更大。"]
      ],
      source: "// source: 完整网页原型逐页实现/profile.html"
    },
    "Profile Completion": {
      tokens: ["donut 78%", "status-item", "dot ok/warn/info"],
      usage: [
        ["When", "工作台 01 修改简历。"],
        ["Where", "dashboard.html。"],
        ["Don't", "缺口必须标出，不要虚增完整度。"]
      ],
      guidelines: [
        ["Ring", "数字来自已填字段，不是匹配分。"],
        ["Hint", "未完成 / 待完善 用 warn / info。"]
      ],
      source: "// source: 完整网页原型逐页实现/dashboard.html"
    },
    "Mentor Tip": {
      tokens: ["mentor-tip", "mentor-float"],
      usage: [
        ["When", "工作台右上角给下一步。"],
        ["Where", "dashboard.html；首页 Hero 浮层复用 mentor-float。"],
        ["Don't", "不要做成纯对话框。"]
      ],
      guidelines: [
        ["Copy", "指向档案缺口或改写，不推新岗位。"]
      ],
      source: "// source: 完整网页原型逐页实现/dashboard.html"
    },
    "Settings Card": {
      tokens: ["set-card", "set-field", "btn-primary / btn-ghost"],
      usage: [
        ["When", "改账户、退出登录。"],
        ["Where", "settings.html。"],
        ["Don't", "退出必须回到营销首页，再走登录或注册。"]
      ],
      guidelines: [
        ["Save", "保存用胶囊主按钮。"],
        ["Logout", "退出用描边。"]
      ],
      source: "// source: 完整网页原型逐页实现/settings.html"
    },
    "Hero Job Card": {
      tokens: [".job-card", ".match", ".bar"],
      usage: [
        ["When", "首页右侧工作台浮层。"],
        ["Where", "index.html Hero mock。"],
        ["Don't", "这不是岗位广场。标签写「不编造 / Mentor」，不要 92% 匹配分。"]
      ],
      guidelines: [
        ["Copy", "系统边界表达 · Grounding · 已有经历。"]
      ],
      source: "// source: 完整网页原型逐页实现/index.html"
    },
    "Quote Card": {
      tokens: ["quote-card", "stars", "quote-user"],
      usage: [
        ["When", "首页社会证明。"],
        ["Where", "index.html「他们都在用简职」。"]
      ],
      guidelines: [
        ["Copy", "强调证据和缺口，不强调刷岗效率。"]
      ],
      source: "// source: 完整网页原型逐页实现/index.html"
    },
    "Feature Grid": {
      tokens: ["feature-grid", "feature-ico"],
      usage: [
        ["When", "首页讲四件事。"],
        ["Where", "index.html 四列。"],
        ["Don't", "不要加第五列「岗位广场」。"]
      ],
      guidelines: [
        ["Icon", "圆形青绿底，不是圆角方块。"]
      ],
      source: "// source: 完整网页原型逐页实现/index.html"
    },
    "Story Card": {
      tokens: ["story-cards", "story-card 20"],
      usage: [
        ["When", "功能介绍、关于我们。"],
        ["Where", "features.html / about.html。"],
        ["Don't", "不要换成实验室 Grounding Diff 或假匹配分。"]
      ],
      guidelines: [
        ["Grid", "两列白卡片，圆角 20px。"]
      ],
      source: "// source: 完整网页原型逐页实现/features.html"
    },
    "Pill / Tag / Status": {
      tokens: [".pill", ".tag.on", ".st.int .view .wait"],
      usage: [
        ["When", "首页 kicker、技能、Tracker 状态。"],
        ["Where", "index.html / dashboard.html。"]
      ],
      guidelines: [
        ["Status", "面试邀请 / 已查看 / 待处理。"]
      ],
      source: "// source: 完整网页原型逐页实现/dashboard.html"
    },
    "页面里的 Button": {
      tokens: ["btn-primary 胶囊", "jc-btn-fill #00A9BC", "choice-btn-orange"],
      usage: [
        ["When", "真实页面 CTA，不是规格矩阵。"],
        ["Where", "index / chrome / upload。"]
      ],
      guidelines: [
        ["Landing", "立即体验用胶囊渐变。"],
        ["Nav", "登录 #00A9BC，注册描边。"],
        ["Upload", "主路径橙色。"]
      ],
      source: "// source: 完整网页原型逐页实现"
    }
  };

  const FALLBACK = {
    tokens: ["color.action.brand.default → --jc-color-action-brand-default"],
    usage: [
      ["When", "Web Comfortable 与 Plugin Compact 共用这一套语言。"],
      ["Where", "对应页面或插件壳，而不是孤立的视觉稿。"],
      ["Don't", "AI 行动必须带 Preview / Confirm / Recover。"]
    ],
    guidelines: [
      ["Token", "页面不直接造颜色。先找组件，缺失时补 Token。"],
      ["Assets", "先查 Graphic Assets，再决定要不要新图。"]
    ],
      source: "// source: 完整网页原型逐页实现/"
  };

  const grid = document.getElementById("componentGrid");
  if (grid) {
    grid.innerHTML = COMPONENTS.map((c) => `<article class="card" data-id="${c.id}" data-search="${c.name} ${c.desc} ${c.group}">
      <div class="thumb">${c.preview}</div>
      <div class="card-head"><div><div class="card-title">${c.name}</div><div class="card-sub">${c.desc}</div></div><span class="pill">${c.group}</span></div>
    </article>`).join("");
  }

  document.querySelectorAll(".gallery .card, .component-grid .card").forEach((card) => {
    card.addEventListener("click", (e) => {
      if (e.target.closest("button, a, input, textarea, select, label")) return;
      openDrawer(card.querySelector(".card-title")?.textContent || "Component", card.querySelector(".card-sub")?.textContent || "", card.querySelector(".canvas, .thumb")?.innerHTML || "");
    });
  });

  const layer = document.getElementById("drawerLayer");
  document.getElementById("closeDrawer")?.addEventListener("click", () => closeDrawer());
  document.getElementById("openGallery")?.addEventListener("click", () => document.getElementById("gallery")?.scrollIntoView({ behavior: "smooth" }));
  layer?.addEventListener("click", (e) => { if (e.target === layer) closeDrawer(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeDrawer(); });

  document.getElementById("detailTabs")?.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-tab]");
    if (!btn) return;
    document.querySelectorAll("#detailTabs button").forEach((b) => b.classList.toggle("active", b === btn));
    document.querySelectorAll(".detail-pane").forEach((p) => p.classList.toggle("active", p.dataset.pane === btn.dataset.tab));
  });

  document.getElementById("density")?.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-density]");
    if (!btn) return;
    document.getElementById("app").dataset.density = btn.dataset.density;
    document.querySelectorAll("#density button").forEach((b) => b.classList.toggle("active", b === btn));
  });

  document.getElementById("search")?.addEventListener("input", (e) => {
    const q = e.target.value.toLowerCase();
    document.querySelectorAll("[data-search]").forEach((el) => {
      const hay = (el.dataset.search || el.textContent || "").toLowerCase();
      el.style.display = hay.includes(q) ? "" : "none";
    });
  });

  function rows(items) {
    return items.map(([k, v]) => `<div class="usage-item"><strong>${k}</strong><p>${v}</p></div>`).join("");
  }

  function openDrawer(name, desc, html) {
    if (!layer) return;
    const spec = DETAILS[name] || FALLBACK;
    document.getElementById("drawerName").textContent = name;
    document.getElementById("drawerDesc").textContent = desc;
    document.getElementById("livePreview").innerHTML = html || "<p>见页面主画布。</p>";
    document.getElementById("tokenDetail").innerHTML = spec.tokens.map((t) => `<code>${t}</code>`).join("");
    document.getElementById("usageDetail").innerHTML = rows(spec.usage);
    document.getElementById("guidelineDetail").innerHTML = rows(spec.guidelines);
    document.getElementById("sourceDetail").textContent = spec.source;
    document.querySelectorAll("#detailTabs button").forEach((b) => b.classList.toggle("active", b.dataset.tab === "preview"));
    document.querySelectorAll(".detail-pane").forEach((p) => p.classList.toggle("active", p.dataset.pane === "preview"));
    layer.classList.add("open");
    layer.setAttribute("aria-hidden", "false");
  }

  function closeDrawer() {
    layer?.classList.remove("open");
    layer?.setAttribute("aria-hidden", "true");
  }
})();
