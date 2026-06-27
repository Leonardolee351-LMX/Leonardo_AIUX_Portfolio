import { useRef, useEffect, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

gsap.registerPlugin(ScrollTrigger);

export function VideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [videoReady, setVideoReady] = useState(false);

  // Video metadata loaded
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoaded = () => {
      video.pause();
      video.currentTime = 0;
      setVideoReady(true);
    };

    if (video.readyState >= 2) {
      handleLoaded();
    } else {
      video.addEventListener("loadeddata", handleLoaded);
      return () => video.removeEventListener("loadeddata", handleLoaded);
    }
  }, []);

  // GSAP ScrollTrigger drives video playback
  useGSAP(() => {
    if (!videoReady || !videoRef.current || !containerRef.current) return;

    const video = videoRef.current;

    // Create ScrollTrigger that maps scroll to video time
    const st = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.8, // Smooth scrub with 0.8s lag
      onUpdate: (self) => {
        const progress = self.progress;
        // Map scroll progress (0-1) to video time
        const targetTime = progress * video.duration;
        // Direct assignment for frame-accurate scrubbing
        if (Math.abs(video.currentTime - targetTime) > 0.1) {
          video.currentTime = targetTime;
        }
      },
    });

    return () => {
      st.kill();
    };
  }, [videoReady]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden"
      style={{ height: "100%" }}
    >
      <video
        ref={videoRef}
        src="./background.mp4"
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: videoReady ? 1 : 0, transition: "opacity 0.5s" }}
      />
      {/* Dark overlay for text readability */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(180deg, rgba(2,6,10,0.2) 0%, rgba(2,6,10,0.1) 40%, rgba(2,6,10,0.25) 100%)",
        }}
      />
    </div>
  );
}
