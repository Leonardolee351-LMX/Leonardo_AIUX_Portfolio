(function (global) {
  const KEY = "jc_cv_files_v2";
  const PRODUCT = (window.JCSession && JCSession.page)
    ? JCSession.page("profile.html").replace(/profile\.html(?:\?.*)?$/, "")
    : "../../../jiancareer/完整网页原型逐页实现/";
  const PERSONA = "林晓舟";
  const DEFAULTS = [
    {
      id: "lx-main",
      name: PERSONA + " · 主简历",
      role: "产品设计师 / AI UX",
      updated: "2026-09-09",
      file: "LinXiaozhou.pdf",
      primary: true,
      analysis: {
        score: 78,
        grade: "良好",
        items: [
          ["基本信息", "ok", "已完成"],
          ["教育经历", "ok", "已完成"],
          ["工作经历", "ok", "已完成"],
          ["项目经历", "ok", "已完成"],
          ["技能标签", "warn", "未完成"],
          ["个人简介", "info", "待完善"]
        ],
        tips: [
          ["补充技能标签", 10],
          ["完善个人简介", 8],
          ["补量化成果证据", 6]
        ]
      }
    },
    {
      id: "lx-startup",
      name: PERSONA + " · 初创投递稿",
      role: "Founding Designer",
      updated: "2026-08-21",
      file: "LinXiaozhou-startup.pdf",
      primary: false,
      analysis: {
        score: 64,
        grade: "待补",
        items: [
          ["基本信息", "ok", "已完成"],
          ["教育经历", "ok", "已完成"],
          ["工作经历", "info", "待完善"],
          ["项目经历", "ok", "已完成"],
          ["技能标签", "warn", "未完成"],
          ["个人简介", "warn", "未完成"]
        ],
        tips: [
          ["补初创向项目边界", 12],
          ["补充技能标签", 10],
          ["写清没有的量化结果", 8]
        ]
      }
    }
  ];

  function toast(msg) {
    let el = document.getElementById("toast");
    if (!el) {
      el = document.createElement("div");
      el.id = "toast";
      el.className = "toast";
      el.setAttribute("role", "status");
      document.body.appendChild(el);
    }
    el.textContent = msg;
    el.classList.add("show");
    setTimeout(function () { el.classList.remove("show"); }, 2400);
  }

  function load() {
    try {
      const raw = JSON.parse(localStorage.getItem(KEY) || "null");
      if (Array.isArray(raw) && raw.length) return raw;
    } catch (e) {}
    return DEFAULTS.map(function (x) { return Object.assign({}, x); });
  }

  function save(list) {
    localStorage.setItem(KEY, JSON.stringify(list));
  }

  function today() {
    const d = new Date();
    const p = function (n) { return String(n).padStart(2, "0"); };
    return d.getFullYear() + "-" + p(d.getMonth() + 1) + "-" + p(d.getDate());
  }

  function addFile(file) {
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      toast("文件大于 2MB，请压缩后再传。");
      return;
    }
    const list = load();
    list.unshift({
      id: "up-" + Date.now(),
      name: PERSONA + " · " + file.name.replace(/\.[^.]+$/, ""),
      role: "刚上传，待核对事实",
      updated: today(),
      file: file.name,
      primary: false
    });
    save(list);
    toast("已加入「" + file.name + "」。接下来可以修改档案，或对着 JD 改写。");
  }

  function setPrimary(id) {
    const list = load().map(function (item) {
      item.primary = item.id === id;
      return item;
    });
    save(list);
    toast("已设为主简历。投递时默认用这一份。");
  }

  function analysisOf(item) {
    if (item && item.analysis) return item.analysis;
    return {
      score: 42,
      grade: "待核对",
      items: [
        ["基本信息", "info", "待核对"],
        ["教育经历", "info", "待核对"],
        ["工作经历", "warn", "未完成"],
        ["项目经历", "warn", "未完成"],
        ["技能标签", "warn", "未完成"],
        ["个人简介", "warn", "未完成"]
      ],
      tips: [
        ["核对姓名与联系方式", 12],
        ["补工作经历证据", 10],
        ["没有的量化结果留空", 8]
      ]
    };
  }

  function get(id) {
    const list = load();
    return list.filter(function (item) { return item.id === id; })[0] || list.filter(function (item) { return item.primary; })[0] || list[0];
  }

  function renderList(root, opts) {
    if (!root) return;
    const manage = !!(opts && opts.manage);
    const compact = !!(opts && opts.compact);
    const pick = !!(opts && opts.pick);
    const selected = (opts && opts.selected) || "";
    const list = load();
    root.innerHTML = list.map(function (item) {
      const mark = (item.name && item.name.charAt(0)) || "林";
      const on = selected === item.id;
      const meta = compact || pick
        ? '<span class="cv-meta"><b>' + item.name + (item.primary ? '<em class="cv-flag">主简历</em>' : "") + "</b>" +
          '<small class="cv-role">' + item.role + "</small>" +
          '<small class="cv-file">' + item.file + " · " + item.updated + "</small></span>"
        : "<span><b>" + item.name + (item.primary ? "<em class=\"cv-flag\">主简历</em>" : "") + "</b>" +
          "<small>" + item.role + " · " + item.file + " · " + item.updated + "</small></span>";
      const ops = pick
        ? ""
        : '<span class="cv-ops">' +
            (manage && !item.primary ? '<button type="button" class="dash-link" data-primary="' + item.id + '">设为主简历</button>' : "") +
            '<a class="dash-link" href="' + PRODUCT + 'profile.html">修改</a>' +
            '<a class="dash-link" href="grounding-lab.html">对着 JD 改写</a>' +
          "</span>";
      return (
        '<li class="cv-item' + (on ? " is-on" : "") + '"' +
          (pick ? ' role="button" tabindex="0" data-pick="' + item.id + '"' : "") + ">" +
          '<span class="co-logo" style="background:#00a9bc">' + mark + "</span>" +
          meta +
          ops +
        "</li>"
      );
    }).join("");
    root.querySelectorAll("[data-primary]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        setPrimary(btn.getAttribute("data-primary"));
        renderList(root, opts);
      });
    });
    if (pick && typeof opts.onPick === "function") {
      root.querySelectorAll("[data-pick]").forEach(function (el) {
        function choose() { opts.onPick(el.getAttribute("data-pick")); }
        el.addEventListener("click", choose);
        el.addEventListener("keydown", function (e) {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            choose();
          }
        });
      });
    }
  }

  global.JCCv = {
    load: load,
    addFile: addFile,
    renderList: renderList,
    get: get,
    analysisOf: analysisOf,
    product: PRODUCT
  };
})(window);
