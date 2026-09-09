/* 登录态：退出回正式首页。登录 / 建档完成后进入林晓舟工作台。
   布局 A（作品集本地）：完整网页原型逐页实现/ + v3/prototype/
   布局 B（GitHub Pages）：site/ + prototype/ ，仓库根即实验室根 */
(function (w) {
  var KEY = "jc_auth_v1";
  var PRODUCT_CN = "完整网页原型逐页实现";
  var PRODUCT_EN = "site";

  function pathOf() {
    return decodeURIComponent(w.location.pathname || "").replace(/\\/g, "/");
  }

  function inOfficial() {
    var p = pathOf();
    return p.indexOf(PRODUCT_CN) !== -1 || p.indexOf("/" + PRODUCT_EN + "/") !== -1 || /\/site$/.test(p);
  }

  function productName() {
    var p = pathOf();
    if (p.indexOf(PRODUCT_CN) !== -1 || p.indexOf("/v3/") !== -1 || p.indexOf("/docs/jiancareer/") !== -1) {
      return PRODUCT_CN;
    }
    return PRODUCT_EN;
  }

  function official(page) {
    page = page || "index.html";
    if (inOfficial()) return page;

    var path = pathOf();
    var href = w.location.href;
    var prod = productName();

    if (path.indexOf("/v3/") !== -1) {
      var rest = path.split("/v3/")[1] || "index.html";
      var depth = rest.split("/").filter(Boolean).length || 1;
      return new URL(new Array(depth + 1).join("../") + prod + "/" + page, href).href;
    }

    var docs = path.match(/\/docs\/jiancareer\/(.*)$/);
    if (docs) {
      var dirDepth = (docs[1] || "index.html").split("/").filter(Boolean).length;
      return new URL(new Array(dirDepth + 2).join("../") + "jiancareer/" + prod + "/" + page, href).href;
    }

    if (/\/(prototype|mentor|design-system)\//.test(path)) {
      return new URL("../" + prod + "/" + page, href).href;
    }

    return prod + "/" + page;
  }

  function lab(page) {
    page = page || "prototype/dashboard.html";
    var path = pathOf();

    if (inOfficial()) {
      if (path.indexOf(PRODUCT_CN) !== -1) return "../v3/" + page;
      return "../" + page;
    }

    function fromLabRoot(rest) {
      var parts = (rest || "index.html").split("/").filter(Boolean);
      if (parts.length <= 1) return page;
      var folder = parts[0];
      var targetFolder = page.split("/")[0];
      var targetFile = page.slice(targetFolder.length + 1);
      if (folder === targetFolder) return targetFile;
      return "../" + page;
    }

    if (path.indexOf("/v3/") !== -1) return fromLabRoot(path.split("/v3/")[1] || "");
    var docs = path.match(/\/docs\/jiancareer\/(.*)$/);
    if (docs) return fromLabRoot(docs[1]);
    var nested = path.match(/\/(prototype|mentor|design-system)\/(.*)$/);
    if (nested) return fromLabRoot(nested[1] + "/" + nested[2]);
    return page;
  }

  w.JCSession = {
    in: function () {
      try { return !!localStorage.getItem(KEY); } catch (err) { return false; }
    },
    set: function () {
      try { localStorage.setItem(KEY, String(Date.now())); } catch (err) {}
    },
    clear: function () {
      try { localStorage.removeItem(KEY); } catch (err) {}
    },
    home: function () { return official("index.html"); },
    loginPage: function () { return official("login.html"); },
    dash: function () { return lab("prototype/dashboard.html"); },
    page: official,
    lab: lab,
    logout: function () {
      this.clear();
      w.location.href = this.home();
    },
    require: function () {
      if (this.in()) return;
      var file = (w.location.pathname || "").split("/").pop() || "dashboard.html";
      var login = this.loginPage();
      if (inOfficial() && /^[A-Za-z0-9._-]+\.html$/.test(file) && file !== "dashboard.html") {
        w.location.replace("login.html?next=" + encodeURIComponent(file));
        return;
      }
      w.location.replace(login);
    },
    afterLogin: function () {
      this.set();
      var next = "";
      try { next = new URLSearchParams(w.location.search).get("next") || ""; } catch (err) {}
      if (next && next !== "dashboard.html" && /^[A-Za-z0-9._-]+\.html$/.test(next) && inOfficial()) {
        w.location.href = next;
        return;
      }
      w.location.href = this.dash();
    },
    afterRegister: function () {
      this.set();
      try { localStorage.setItem("jc_new_user", "1"); } catch (err) {}
      w.location.href = official("upload.html");
    },
    bindLogout: function (root) {
      var self = this;
      (root || document).querySelectorAll("[data-jc-logout]").forEach(function (a) {
        try { a.setAttribute("href", self.home()); } catch (err) {}
        a.addEventListener("click", function (e) {
          e.preventDefault();
          self.logout();
        });
      });
    }
  };
})(window);
