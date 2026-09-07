import { Reveal } from "@/components/Reveal";

export function HeroSection3() {
  const brandMaskStyle = {
    WebkitMaskImage: 'url("./img/icon/Vector.svg")',
    maskImage: 'url("./img/icon/Vector.svg")',
  } as const;

  return (
    <section
      id="home"
      data-video-stage="hero"
      className="relative flex min-h-[100dvh] w-full flex-col justify-end px-[6vw] pb-28 pt-28 md:justify-center md:pb-24 md:pt-32"
    >
      {/* soft vignette so type sits on aurora without fighting it */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_20%_45%,rgba(6,8,12,0.15),transparent_65%),linear-gradient(180deg,rgba(6,8,12,0.2)_0%,transparent_28%,transparent_62%,rgba(6,8,12,0.55)_100%)]"
        aria-hidden="true"
      />

      <div className="relative z-[1] mx-auto flex w-full max-w-[1180px] flex-col items-start text-left">
        <Reveal delay={0.06}>
          <span
            className="brand-mark mb-10 block h-[44px] w-[180px] md:mb-14 md:h-[52px] md:w-[214px]"
            style={brandMaskStyle}
            aria-label="Leonardo"
          />
        </Reveal>

        <Reveal delay={0.14}>
          <p className="mb-5 text-[13px] font-normal tracking-[0.02em] text-white/55 md:mb-6 md:text-[15px]">
            Hi, I&apos;m{" "}
            <span className="font-serif italic text-white/88">Leonardo Li</span>
          </p>
        </Reveal>

        <Reveal delay={0.2}>
          <h1 className="font-semibold leading-[1.02] tracking-[-0.045em] text-white">
            <span
              className="block whitespace-nowrap bg-gradient-to-br from-[#e8f7f4] via-[#a8c8e8] to-[#c4b5dc] bg-clip-text text-transparent"
              style={{ fontSize: "clamp(28px, 6.5vw, 96px)" }}
            >
              AI Product
            </span>
            <span
              className="mt-1 block whitespace-nowrap bg-gradient-to-br from-[#dceef8] via-[#9bb8e0] to-[#b5a6d4] bg-clip-text text-transparent"
              style={{ fontSize: "clamp(28px, 6.5vw, 96px)" }}
            >
              Developer
            </span>
            <span
              className="mt-5 block font-sans font-medium uppercase tracking-[0.36em] text-white/35"
              style={{ fontSize: "clamp(10px, 1.1vw, 13px)" }}
            >
              &amp; UX Researcher
            </span>
          </h1>
        </Reveal>

        <Reveal delay={0.28}>
          <p
            className="mt-8 max-w-[34rem] text-pretty text-white/58 md:mt-10"
            style={{ fontSize: "clamp(14px, 1.35vw, 17px)", lineHeight: 1.85 }}
          >
            面向 AI Agent 与多模态产品——从研究、交互架构到可验证原型，
            把洞察写成可交付的体验。
          </p>
        </Reveal>

        <Reveal delay={0.36} className="mt-10 md:mt-12">
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
            <a
              href="./works.html"
              className="group inline-flex items-center gap-3 text-[14px] font-medium tracking-[0.04em] text-white transition-opacity hover:opacity-90"
            >
              <span className="relative">
                查看项目
                <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-100 bg-gradient-to-r from-white/80 to-white/20 transition-transform duration-300 group-hover:scale-x-110" />
              </span>
              <span
                className="translate-x-0 text-white/50 transition-transform duration-300 group-hover:translate-x-1"
                aria-hidden="true"
              >
                →
              </span>
            </a>
            <a
              href="./resume.html"
              className="text-[13px] tracking-[0.06em] text-white/42 transition-colors hover:text-white/75"
            >
              简历
            </a>
            <a
              href="./works.html"
              className="text-[13px] tracking-[0.06em] text-white/42 transition-colors hover:text-white/75"
            >
              More
            </a>
          </div>
        </Reveal>
      </div>

      <div className="pointer-events-none absolute bottom-8 left-1/2 z-[1] flex -translate-x-1/2 flex-col items-center gap-2 text-[10px] uppercase tracking-[0.28em] text-white/28">
        <span>Scroll</span>
        <span className="h-12 w-px bg-gradient-to-b from-white/40 to-transparent" aria-hidden="true" />
      </div>
    </section>
  );
}
