(function () {
  const mount = document.getElementById("jc-nav");
  if (!mount) return;

  const path = (location.pathname || "").replace(/\\/g, "/");
  function infer() {
    if (/\/design-system\//.test(path) || /tokens\.html/.test(path)) return "ds";
    if (/mentor/.test(path)) return "mentor";
    if (/grounding|resume-adapt/.test(path)) return "grounding";
    if (/flywheel|tracker/.test(path)) return "flywheel";
    if (/insights/.test(path)) return "flywheel";
    if (/dashboard/.test(path)) return "dashboard";
    return "dashboard";
  }
  const active = mount.getAttribute("data-active") || infer();

  let proto = "";
  let ds = "../design-system/";
  let mentor = "../mentor/";
  let brand = "../brand/";
  if (active === "hub" || /\/v3\/(index\.html)?$/.test(path)) {
    proto = "prototype/";
    ds = "design-system/";
    mentor = "mentor/";
    brand = "brand/";
  } else if (/\/design-system\//.test(path)) {
    proto = "../prototype/";
    ds = "./";
    mentor = "../mentor/";
    brand = "../brand/";
  } else if (/\/mentor(\/|$)/.test(path) && !/prototype/.test(path)) {
    proto = "../prototype/";
    ds = "../design-system/";
    mentor = "./";
    brand = "../brand/";
  } else if (/\/jiancareer\/(index\.html)?$/.test(path) || /\/jiancareer\/index\.html$/.test(path)) {
    proto = "prototype/";
    ds = "design-system/";
    mentor = "mentor/";
    brand = "brand/";
  }

  const brandHtml =
    '<img class="jc-logo" src="' + brand + 'logo-brand.png?v=lockup2" alt="简职 JianCareer">';

  const productHome = (window.JCSession && JCSession.home)
    ? JCSession.home()
    : "../../../jiancareer/完整网页原型逐页实现/index.html";
  const settingsHref = proto + "settings.html";
  const logoutHref = productHome;
  const resumesHref = proto + "resumes.html";

  const links = [
    ["dashboard", "工作台", proto + "dashboard.html"],
    ["grounding", "简历修改", proto + "grounding-lab.html"],
    ["mentor", "AI职场导师", mentor + "index.html"],
    ["flywheel", "求职跟踪", proto + "flywheel-lab.html"],
    ["ds", "组件库系统", ds + "index.html"]
  ];

  function pngIco(name, size) {
    size = size || 20;
    return '<img src="' + brand + name + '.png?v=ico1" alt="" width="' + size + '" height="' + size + '">';
  }
  const ico = {
    search: pngIco("icon-search"),
    mail: pngIco("icon-mail"),
    bell: pngIco("icon-bell"),
    menu: pngIco("icon-menu", 22)
  };

  function linkHtml(extraClass) {
    return links.map(([id, label, href]) =>
      '<a class="' + (id === active ? "is-on" : "") + (extraClass ? " " + extraClass : "") + '" href="' + href + '">' + label + "</a>"
    ).join("");
  }

  mount.className = "jc-header";
  mount.innerHTML =
    '<nav class="jc-nav" aria-label="主导航">' +
      '<a class="jc-brand" href="' + proto + "dashboard.html" + '" aria-label="简职 JianCareer">' +
        brandHtml +
      "</a>" +
      '<div class="jc-links">' + linkHtml() + "</div>" +
      '<div class="jc-tools">' +
        '<button class="jc-icon" type="button" aria-label="搜索">' + ico.search + "</button>" +
        '<button class="jc-icon" type="button" aria-label="消息">' + ico.mail + "</button>" +
        '<button class="jc-icon" type="button" aria-label="通知">' + ico.bell + '<span class="jc-dot"></span></button>' +
        '<div class="jc-user-wrap">' +
          '<button class="jc-user" type="button" data-jc-user aria-haspopup="menu" aria-expanded="false" aria-controls="jc-account-menu" aria-label="账户菜单">' +
            '<span class="jc-avatar">L</span>' +
          "</button>" +
          '<div class="jc-menu" id="jc-account-menu" role="menu">' +
            '<a role="menuitem" href="' + settingsHref + '">设定</a>' +
            '<a role="menuitem" href="' + logoutHref + '" data-jc-logout>退出登录</a>' +
          "</div>" +
        "</div>" +
        '<button class="jc-icon jc-menu-btn" type="button" aria-label="打开菜单" aria-expanded="false">' + ico.menu + "</button>" +
      "</div>" +
    "</nav>" +
    '<div class="jc-drawer" id="jc-drawer">' +
      linkHtml() +
      '<a href="' + resumesHref + '">我的简历</a>' +
      '<a href="' + settingsHref + '">设定</a>' +
      '<a href="' + logoutHref + '" data-jc-logout>退出登录</a>' +
    "</div>";

  const drawer = document.getElementById("jc-drawer");
  const menuBtn = mount.querySelector(".jc-menu-btn");
  menuBtn?.addEventListener("click", () => {
    const open = drawer?.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
  });

  const userWrap = mount.querySelector(".jc-user-wrap");
  const userBtn = mount.querySelector("[data-jc-user]");
  function closeUser() {
    userWrap?.classList.remove("open");
    userBtn?.setAttribute("aria-expanded", "false");
  }
  if (userWrap && userBtn) {
    userBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const open = userWrap.classList.toggle("open");
      userBtn.setAttribute("aria-expanded", open ? "true" : "false");
    });
    userWrap.querySelector(".jc-menu")?.addEventListener("click", (e) => e.stopPropagation());
    document.addEventListener("click", closeUser);
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeUser();
    });
  }

  const onScroll = () => mount.classList.toggle("is-scrolled", window.scrollY > 8);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (window.JCSession) {
    JCSession.bindLogout(document);
    if (/\/(dashboard|settings|resumes)\.html/i.test(path)) JCSession.require();
  }
})();
