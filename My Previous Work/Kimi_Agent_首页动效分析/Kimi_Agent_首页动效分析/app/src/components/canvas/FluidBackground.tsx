import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

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

  varying vec2 vUv;

  // --- Simplex noise (standard implementation) ---
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                        -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
                             + i.x + vec3(0.0, i1.x, 1.0 ));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
                            dot(x12.zw,x12.zw)), 0.0);
    m = m*m;
    m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  // --- Smooth FBM (for subtle texture variation) ---
  float fbm(vec2 p) {
    float f = 0.0;
    float w = 0.5;
    for (int i = 0; i < 4; i++) {
      f += w * snoise(p);
      w *= 0.5;
      p *= 2.0;
    }
    return f;
  }

  void main() {
    vec2 uv = vUv;
    float aspect = uResolution.x / uResolution.y;
    vec2 p = uv;

    // Apply aspect correction only to X for the aurora bands
    vec2 ap = (uv - 0.5) * vec2(aspect, 1.0) + 0.5;

    float t = uTime * 0.12; // Slow flowing time

    // === Mouse influence ===
    // Convert mouse to same coordinate space, gentle parallax offset
    vec2 mouseOffset = (uMouse - 0.5) * 0.15;
    vec2 mp = ap - mouseOffset;

    // === Aurora bands: layered sine waves ===
    // Each band: a sine wave flowing diagonally/vertically with noise perturbation

    float band1 = 0.0, band2 = 0.0, band3 = 0.0;

    // Layer 1: Main wide green-cyan sweep (upper area)
    {
      vec2 lp = mp * vec2(1.2, 0.8);
      float flow = t * 0.6;
      float wave = sin(lp.x * 3.0 + flow + sin(lp.y * 4.0 + flow * 0.7) * 0.35);
      wave += snoise(lp * 1.5 + t * 0.2) * 0.25; // subtle noise perturbation
      band1 = smoothstep(0.15, 0.65, wave * 0.5 + 0.5);
      // Fade at bottom
      band1 *= smoothstep(0.0, 0.25, lp.y) * smoothstep(1.0, 0.55, lp.y);
    }

    // Layer 2: Blue-purple ribbon (mid area, offset)
    {
      vec2 lp = mp * vec2(1.5, 1.0) + vec2(0.3, 0.15);
      float flow = t * 0.45 + 1.5;
      float wave = sin(lp.x * 4.5 + flow + sin(lp.y * 3.5 - flow * 0.5) * 0.3);
      wave += snoise(lp * 2.0 - t * 0.15) * 0.2;
      band2 = smoothstep(0.25, 0.75, wave * 0.5 + 0.5);
      band2 *= smoothstep(0.05, 0.3, lp.y) * smoothstep(1.0, 0.5, lp.y);
    }

    // Layer 3: Fine bright highlight streaks
    {
      vec2 lp = mp * vec2(2.0, 1.2) + vec2(-0.2, 0.35);
      float flow = t * 0.7 + 3.0;
      float wave = sin(lp.x * 6.0 + flow + sin(lp.y * 5.0 + flow * 0.4) * 0.25);
      wave += fbm(lp * 2.5 + t * 0.1) * 0.15;
      band3 = smoothstep(0.55, 0.9, wave * 0.5 + 0.5);
      band3 *= smoothstep(0.1, 0.35, lp.y) * smoothstep(1.0, 0.45, lp.y);
    }

    // === Color palette: Aurora blue-green-purple ===
    vec3 bgDark   = vec3(0.01, 0.015, 0.03);   // Deep dark blue-black
    vec3 deepBlue = vec3(0.04, 0.08, 0.18);    // Dark navy
    vec3 teal     = vec3(0.06, 0.25, 0.22);    // Deep teal
    vec3 cyanGrn  = vec3(0.15, 0.55, 0.42);    // Cyan-green (aurora main)
    vec3 brightCy = vec3(0.30, 0.75, 0.65);    // Bright cyan
    vec3 mint     = vec3(0.50, 0.90, 0.75);    // Mint highlight
    vec3 purpBlue = vec3(0.18, 0.20, 0.55);    // Blue-purple
    vec3 softPurp = vec3(0.35, 0.30, 0.70);    // Soft purple

    // === Composite colors ===
    vec3 color = bgDark;

    // Band 1: Green-cyan aurora sweep (dominant)
    float b1 = band1 * 0.65;
    color = mix(color, deepBlue, smoothstep(0.0, 0.3, b1));
    color = mix(color, teal, smoothstep(0.15, 0.5, b1));
    color = mix(color, cyanGrn, smoothstep(0.35, 0.7, b1));
    color = mix(color, brightCy, smoothstep(0.55, 0.9, b1));
    color = mix(color, mint, smoothstep(0.75, 1.0, b1) * 0.5);

    // Band 2: Blue-purple ribbon (secondary)
    float b2 = band2 * 0.45;
    color = mix(color, purpBlue, smoothstep(0.1, 0.5, b2) * 0.6);
    color = mix(color, softPurp, smoothstep(0.4, 0.85, b2) * 0.35);

    // Band 3: Fine bright highlights
    float b3 = band3 * 0.3;
    color += mint * b3 * 0.25;
    color += vec3(0.6, 0.85, 0.9) * b3 * 0.15; // subtle icy blue highlight

    // === Atmospheric touches ===
    // Very subtle vertical glow in upper region (sky feel)
    float skyGlow = smoothstep(0.0, 0.6, ap.y) * smoothstep(1.0, 0.3, ap.y);
    skyGlow *= 0.04;
    color += vec3(0.05, 0.12, 0.22) * skyGlow;

    // === Soft vignette (keep edges dark, focus on aurora) ===
    vec2 vc = (uv - 0.5) * 1.4;
    float vig = 1.0 - dot(vc, vc) * 0.5;
    vig = clamp(vig, 0.0, 1.0);
    color *= vig;

    // === Ultra subtle grain ===
    float grain = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453) - 0.5;
    color += grain * 0.006;

    // Tone map: prevent over-bright
    color = color / (1.0 + color * 0.15);

    gl_FragColor = vec4(color, 1.0);
  }
`;

function FluidPlane() {
  const meshRef = useRef<THREE.Mesh>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    }),
    []
  );

  useFrame((state) => {
    uniforms.uTime.value = state.clock.elapsedTime;

    // Smooth mouse lerp (slow follow for gentle parallax)
    const mx = uniforms.uMouse.value;
    const tx = mouseRef.current.x;
    const ty = mouseRef.current.y;
    mx.x += (tx - mx.x) * 0.04;
    mx.y += (ty - mx.y) * 0.04;
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX / window.innerWidth;
      mouseRef.current.y = 1.0 - e.clientY / window.innerHeight;
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      uniforms.uResolution.value.set(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [uniforms]);

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}

export function FluidBackground() {
  return (
    <div
      className="fixed inset-0 -z-10"
      style={{ width: "100%", height: "100%", background: "#02060a" }}
    >
      <Canvas
        camera={{ position: [0, 0, 1] }}
        dpr={Math.min(window.devicePixelRatio, 2)}
        gl={{
          antialias: false,
          alpha: false,
          powerPreference: "high-performance",
        }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      >
        <FluidPlane />
      </Canvas>
    </div>
  );
}
