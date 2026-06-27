import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export function ScrollVideoBackground3() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const darkOverlayRef = useRef<HTMLDivElement>(null);
  const vignetteRef = useRef<HTMLDivElement>(null);
  const auroraRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [needsKick, setNeedsKick] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const heroToWorkProgressRef = useRef(0);
  const workToContactProgressRef = useRef(0);

  useEffect(() => {
    const updateViewportMode = () => {
      setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    };

    updateViewportMode();
    window.addEventListener("resize", updateViewportMode);
    return () => window.removeEventListener("resize", updateViewportMode);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onReady = () => {
      video.currentTime = 0;
      setReady(true);
      const playPromise = video.play();
      if (playPromise) {
        playPromise.catch(() => setNeedsKick(true));
      }
    };

    if (video.readyState >= 2) {
      onReady();
      return;
    }

    video.addEventListener("loadeddata", onReady, { once: true });
    return () => video.removeEventListener("loadeddata", onReady);
  }, []);

  useEffect(() => {
    if (!needsKick) return;

    const kick = () => {
      const video = videoRef.current;
      if (!video) return;
      const playPromise = video.play();
      if (playPromise) {
        playPromise.then(() => setNeedsKick(false)).catch(() => {});
      }
    };

    window.addEventListener("pointerdown", kick, { once: true });
    window.addEventListener("touchstart", kick, { once: true });
    return () => {
      window.removeEventListener("pointerdown", kick);
      window.removeEventListener("touchstart", kick);
    };
  }, [needsKick]);

  useEffect(() => {
    if (!ready) return;

    const work = document.querySelector('[data-video-stage="work"]');
    const footer = document.querySelector('[data-video-stage="footer"]');
    if (!work || !footer) return;

    const applyScene = () => {
      const heroToMid = heroToWorkProgressRef.current;
      const midToFooter = workToContactProgressRef.current;

      const opacity = gsap.utils.interpolate(
        gsap.utils.interpolate(0.98, 0.08, heroToMid),
        0.94,
        midToFooter,
      );
      const scale = gsap.utils.interpolate(
        gsap.utils.interpolate(1.01, 1.08, heroToMid),
        1.015,
        midToFooter,
      );
      const saturation = gsap.utils.interpolate(
        gsap.utils.interpolate(0.95, 0.62, heroToMid),
        0.9,
        midToFooter,
      );
      const brightness = gsap.utils.interpolate(
        gsap.utils.interpolate(0.88, 0.34, heroToMid),
        0.82,
        midToFooter,
      );
      const darkOverlayOpacity = gsap.utils.interpolate(
        gsap.utils.interpolate(0.18, 0.92, heroToMid),
        0.28,
        midToFooter,
      );
      const vignetteOpacity = gsap.utils.interpolate(
        gsap.utils.interpolate(0.24, 0.56, heroToMid),
        0.28,
        midToFooter,
      );
      const auroraOpacity = gsap.utils.interpolate(
        gsap.utils.interpolate(0.05, 0.42, heroToMid),
        0.1,
        midToFooter,
      );

      if (videoRef.current) {
        gsap.set(videoRef.current, {
          opacity,
          scale,
          filter: `saturate(${saturation}) brightness(${brightness})`,
        });
      }

      if (darkOverlayRef.current) {
        gsap.set(darkOverlayRef.current, { opacity: darkOverlayOpacity });
      }

      if (vignetteRef.current) {
        gsap.set(vignetteRef.current, { opacity: vignetteOpacity });
      }

      if (auroraRef.current) {
        gsap.set(auroraRef.current, { opacity: auroraOpacity });
      }
    };

    const triggers = [
      ScrollTrigger.create({
        trigger: work,
        start: "top bottom",
        end: "top 20%",
        scrub: true,
        onUpdate: (self) => {
          heroToWorkProgressRef.current = self.progress;
          applyScene();
        },
        onLeave: () => {
          heroToWorkProgressRef.current = 1;
          applyScene();
        },
        onLeaveBack: () => {
          heroToWorkProgressRef.current = 0;
          workToContactProgressRef.current = 0;
          applyScene();
        },
      }),
      ScrollTrigger.create({
        trigger: footer,
        start: "top bottom",
        end: "top 28%",
        scrub: true,
        onUpdate: (self) => {
          workToContactProgressRef.current = self.progress;
          applyScene();
        },
        onLeave: () => {
          workToContactProgressRef.current = 1;
          applyScene();
        },
        onLeaveBack: () => {
          workToContactProgressRef.current = 0;
          applyScene();
        },
      }),
    ];

    applyScene();

    return () => {
      triggers.forEach((trigger) => trigger.kill());
    };
  }, [ready]);

  return (
    <>
      <div className="fixed inset-0 overflow-hidden" style={{ zIndex: 0 }}>
        <video
          ref={videoRef}
          src="./video_333217361261360.mp4"
          autoPlay
          muted
          playsInline
          preload="auto"
          loop
          className="absolute"
          style={{
            top: 0,
            left: 0,
            width: "100vw",
            height: "100dvh",
            objectFit: "cover",
            objectPosition: isMobile ? "72% center" : "center center",
            opacity: ready ? 0.98 : 0,
            transform: isMobile ? "scale(1.08)" : "scale(1.01)",
            filter: "saturate(0.95) brightness(0.88)",
            transition: "opacity 0.8s ease",
          }}
        />
      </div>

      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: 1,
          background: [
            "radial-gradient(circle at top right, rgba(137,170,204,0.18), transparent 24%)",
            "linear-gradient(180deg, rgba(5,5,5,0.34) 0%, rgba(5,5,5,0.12) 28%, rgba(5,5,5,0.12) 72%, rgba(5,5,5,0.48) 100%)",
          ].join(", "),
        }}
      />

      <div
        ref={darkOverlayRef}
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: 2,
          opacity: 0.18,
          background:
            "linear-gradient(180deg, rgba(3,3,3,0.3) 0%, rgba(3,3,3,0.56) 32%, rgba(3,3,3,0.68) 68%, rgba(3,3,3,0.88) 100%)",
        }}
      />

      <div
        ref={auroraRef}
        className="aurora-flow fixed inset-0 pointer-events-none"
        style={{
          zIndex: 3,
          opacity: 0.05,
        }}
      />

      <div
        ref={vignetteRef}
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: 4,
          opacity: 0.24,
          background: "radial-gradient(circle at center, transparent 40%, rgba(3,3,3,0.3) 100%)",
        }}
      />

      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: 5,
          opacity: 0.028,
          mixBlendMode: "overlay",
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "256px 256px",
        }}
      />
    </>
  );
}
