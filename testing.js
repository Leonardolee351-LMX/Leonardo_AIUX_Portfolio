(() => {
  const container = document.getElementById("canvas-container");
  const statusEl = document.getElementById("demo-status");
  const motionEl = document.getElementById("demo-motion");
  const webglEl = document.getElementById("demo-webgl");
  const gsapEl = document.getElementById("demo-gsap");

  const setChip = (el, text) => {
    if (!el) return;
    el.textContent = text;
  };

  const setStatus = (text) => {
    if (!statusEl) return;
    statusEl.textContent = text;
  };

  const prefersReducedMotion = !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const hasGsap = typeof window.gsap !== "undefined";
  const hasThree = typeof window.THREE !== "undefined";

  setChip(motionEl, prefersReducedMotion ? "Motion: Reduce" : "Motion: On");
  setChip(gsapEl, hasGsap ? "GSAP: On" : "GSAP: Off");

  if (!container) return;

  const fallback = (reason) => {
    document.body.classList.add("is-fallback");
    setChip(webglEl, "WebGL: Off");
    setStatus(reason || "Fallback");
    runUiMotion();
  };

  if (!hasThree) {
    fallback("THREE missing");
    return;
  }

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, powerPreference: "high-performance" });
  } catch (e) {
    fallback("WebGL init failed");
    return;
  }

  if (!renderer || !renderer.getContext) {
    fallback("WebGL unavailable");
    return;
  }

  setChip(webglEl, "WebGL: On");

  const dprCap = 2;
  const DEFAULTS = {
    level: 0.65,
    trailDecay: 0.96,
    exposure: 1.25,
    bloom: 0.52,
    timeScale: 1.1,
  };
  const params = { ...DEFAULTS };

  if (prefersReducedMotion) {
    params.trailDecay = 0.0;
    params.exposure = 1.0;
    params.bloom = 0.18;
    params.timeScale = 0.18;
  }

  const tween = (to, opts = {}) => {
    if (!hasGsap) {
      Object.assign(params, to);
      return null;
    }
    return window.gsap.to(params, { ...to, ...opts, overwrite: true });
  };

  const engage = (strength = 1) => {
    const next = prefersReducedMotion ? Math.min(strength, 0.25) : strength;
    tween(
      { level: next, exposure: prefersReducedMotion ? 1.0 : 1.0, bloom: prefersReducedMotion ? 0.18 : 0.35 },
      { duration: 0.22, ease: "power2.out" }
    );
  };

  const relax = () => {
    tween({ level: 0, exposure: params.exposure, bloom: params.bloom }, { duration: 1.05, ease: "power2.out" });
  };

  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, dprCap));
  container.appendChild(renderer.domElement);

  const effectScene = new THREE.Scene();
  const copyScene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

  const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;

  const fragmentShader = `
precision highp float;
uniform float uTime;
uniform vec2 uResolution;
uniform vec2 uMouse;
uniform float uLevel;
uniform float uTrailDecay;
uniform float uExposure;
uniform float uBloom;
uniform sampler2D uPrevTex;
varying vec2 vUv;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 345.45));
  p += dot(p, p + 34.345);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p = p * 2.03 + vec2(19.21, 7.17);
    a *= 0.52;
  }
  return v;
}

vec3 tonemap(vec3 c) {
  c = max(c, 0.0);
  c = c / (c + vec3(1.0));
  return pow(c, vec3(0.96));
}

void main() {
  vec2 uv = vUv;
  float aspect = uResolution.x / max(1.0, uResolution.y);
  vec2 p = (uv - 0.5) * vec2(aspect, 1.0);
  vec2 m = (uMouse - 0.5) * vec2(aspect, 1.0);

  float t = uTime * 0.12;
  float d = length(p - m);
  float mouseField = smoothstep(0.52, 0.0, d) * uLevel;

  vec2 q = p;
  q += 0.18 * vec2(fbm(p * 1.8 + t), fbm(p * 1.8 - t));
  q += mouseField * 0.22 * vec2(noise(p * 3.0 + t * 2.0) - 0.5, noise(p * 3.0 - t * 2.0) - 0.5);

  float band = fbm(q * 1.35 + vec2(0.0, t * 2.1));
  band = pow(clamp(band, 0.0, 1.0), 1.65);

  float core = smoothstep(0.34, 0.86, band);
  float edge = smoothstep(0.64, 0.97, band);

  vec3 base = mix(vec3(0.015, 0.02, 0.055), vec3(0.02, 0.012, 0.05), uv.y);

  float hue = fbm(q * 0.8 + vec2(t * 0.6, -t * 0.25));
  vec3 a = mix(vec3(0.12, 0.62, 0.98), vec3(0.95, 0.24, 0.72), hue);
  vec3 b = mix(vec3(0.92, 0.64, 0.42), vec3(0.18, 0.95, 0.78), fbm(q * 0.55 - t * 0.4));
  vec3 aur = mix(a, b, 0.45);

  vec3 col = base;
  col += aur * (core * 0.88);
  col += vec3(1.0) * edge * (0.08 + uBloom * 0.26);

  float vign = uv.x * uv.y * (1.0 - uv.x) * (1.0 - uv.y);
  vign = clamp(pow(16.0 * vign, 0.22), 0.0, 1.0);
  col *= vign;

  vec2 flow = 0.0016 * vec2(noise(q * 2.6 + t * 3.0) - 0.5, noise(q * 2.6 - t * 3.0) - 0.5);
  flow += mouseField * 0.006 * normalize((p - m) + vec2(1e-4));
  vec3 prev = texture2D(uPrevTex, uv + flow).rgb;

  vec3 mixed = max(col, prev * uTrailDecay);
  mixed = mix(mixed, col, 0.26);
  mixed *= uExposure;

  gl_FragColor = vec4(tonemap(mixed), 1.0);
}
`;

  const copyFragmentShader = `
precision highp float;
uniform sampler2D tMap;
varying vec2 vUv;
void main() {
  gl_FragColor = texture2D(tMap, vUv);
}
`;

  const quadGeo = new THREE.PlaneGeometry(2, 2);

  const effectUniforms = {
    uTime: { value: 0 },
    uResolution: { value: new THREE.Vector2(1, 1) },
    uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    uLevel: { value: 0 },
    uTrailDecay: { value: 0.9 },
    uExposure: { value: 1.0 },
    uBloom: { value: 0.35 },
    uPrevTex: { value: null },
  };

  const effectMat = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: effectUniforms,
    depthWrite: false,
    depthTest: false,
  });

  const effectMesh = new THREE.Mesh(quadGeo, effectMat);
  effectScene.add(effectMesh);

  const copyMat = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader: copyFragmentShader,
    uniforms: { tMap: { value: null } },
    depthWrite: false,
    depthTest: false,
  });

  const copyMesh = new THREE.Mesh(quadGeo, copyMat);
  copyScene.add(copyMesh);

  let rtA;
  let rtB;
  let w = 1;
  let h = 1;
  let rtW = 1;
  let rtH = 1;

  const allocTargets = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, dprCap);
    w = Math.max(1, window.innerWidth);
    h = Math.max(1, window.innerHeight);
    rtW = Math.max(1, Math.floor(w * dpr));
    rtH = Math.max(1, Math.floor(h * dpr));

    renderer.setPixelRatio(dpr);
    renderer.setSize(w, h, false);

    if (rtA) rtA.dispose();
    if (rtB) rtB.dispose();

    rtA = new THREE.WebGLRenderTarget(rtW, rtH, {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      depthBuffer: false,
      stencilBuffer: false,
    });

    rtB = new THREE.WebGLRenderTarget(rtW, rtH, {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      depthBuffer: false,
      stencilBuffer: false,
    });

    effectUniforms.uResolution.value.set(rtW, rtH);

    renderer.setRenderTarget(rtA);
    renderer.clear(true, true, true);
    renderer.setRenderTarget(rtB);
    renderer.clear(true, true, true);
    renderer.setRenderTarget(null);
  };

  allocTargets();

  const pointerTarget = { x: 0.5, y: 0.5 };
  const pointer = { x: 0.5, y: 0.5 };
  let lastMoveAt = performance.now();

  const onMove = (e) => {
    pointerTarget.x = e.clientX / Math.max(1, w);
    pointerTarget.y = 1 - e.clientY / Math.max(1, h);
    lastMoveAt = performance.now();
    engage(1);
  };

  window.addEventListener("mousemove", onMove, { passive: true });
  window.addEventListener("resize", () => allocTargets(), { passive: true });

  const bindActions = () => {
    document.querySelectorAll("[data-action]").forEach((el) => {
      el.addEventListener("click", () => {
        const action = el.getAttribute("data-action");
        if (action === "engage") {
          engage(1);
        } else if (action === "idle") {
          relax();
        } else if (action === "pulse") {
          if (hasGsap) {
            const tl = window.gsap.timeline({ defaults: { ease: "power2.out" } });
            tl.to(params, { level: prefersReducedMotion ? 0.2 : 1, duration: 0.2 }, 0);
            tl.to(params, { bloom: prefersReducedMotion ? 0.18 : 0.48, duration: 0.25 }, 0);
            tl.to(params, { level: 0, duration: 0.9 }, 0.35);
          } else {
            engage(prefersReducedMotion ? 0.2 : 1);
            setTimeout(() => relax(), 260);
          }
        }
      });
    });
  };

  bindActions();

  const runUiMotion = () => {
    if (!hasGsap) return;
    const mm = window.gsap.matchMedia();
    mm.add(
      {
        reduce: "(prefers-reduced-motion: reduce)",
        ok: "(prefers-reduced-motion: no-preference)",
      },
      (ctx) => {
        const isReduce = ctx.conditions && ctx.conditions.reduce;
        const tl = window.gsap.timeline();
        tl.set(".ui-layer", { opacity: 1 });
        tl.from(".logo", { y: -10, opacity: 0, duration: isReduce ? 0 : 0.36 }, 0);
        tl.from(".glass-nav", { y: -10, opacity: 0, duration: isReduce ? 0 : 0.42 }, 0.02);
        tl.from(".hero", { y: 12, opacity: 0, duration: isReduce ? 0 : 0.55 }, 0.08);
        tl.from(".glass-card", { y: 10, opacity: 0, duration: isReduce ? 0 : 0.55, stagger: isReduce ? 0 : 0.07 }, 0.18);
        tl.from("footer", { y: 10, opacity: 0, duration: isReduce ? 0 : 0.45 }, 0.22);
        return () => tl.kill();
      }
    );
  };

  runUiMotion();
  setStatus("OK");

  let time = 0;
  let last = performance.now();

  const tick = () => {
    const now = performance.now();
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;

    if (now - lastMoveAt > 160 && params.level > 0.001) relax();

    const follow = prefersReducedMotion ? 0.045 : 0.12;
    pointer.x += (pointerTarget.x - pointer.x) * follow;
    pointer.y += (pointerTarget.y - pointer.y) * follow;

    time += dt * params.timeScale;

    effectUniforms.uTime.value = time;
    effectUniforms.uMouse.value.set(pointer.x, pointer.y);
    effectUniforms.uLevel.value = params.level;
    effectUniforms.uTrailDecay.value = params.trailDecay;
    effectUniforms.uExposure.value = params.exposure;
    effectUniforms.uBloom.value = params.bloom;

    effectUniforms.uPrevTex.value = rtA.texture;
    renderer.setRenderTarget(rtB);
    renderer.render(effectScene, camera);

    copyMat.uniforms.tMap.value = rtB.texture;
    renderer.setRenderTarget(null);
    renderer.render(copyScene, camera);

    const tmp = rtA;
    rtA = rtB;
    rtB = tmp;

    requestAnimationFrame(tick);
  };

  requestAnimationFrame(tick);
})();
