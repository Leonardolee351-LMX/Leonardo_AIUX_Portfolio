import { Reveal } from "@/components/Reveal";

export function HeroSection3() {
  return (
    <section
      id="home"
      data-video-stage="hero"
      className="relative flex min-h-[100dvh] w-full flex-col items-center justify-center px-[5vw] pb-24 pt-28 text-center md:pt-32"
    >
      <div className="mx-auto flex w-full max-w-[1200px] flex-1 flex-col items-center justify-center py-10">
        <Reveal delay={0.05} className="mb-5">
          <span className="brand-mark block h-[38px] w-[156px]" aria-hidden="true" />
        </Reveal>

        <Reveal delay={0.12} className="section-label mb-6">
          Home
        </Reveal>

        <Reveal delay={0.18}>
          <h1
            className="text-balance text-white font-semibold leading-[1.08] tracking-[-0.03em]"
            style={{ fontSize: "clamp(42px, 6.5vw, 84px)" }}
          >
            Hi I'm{" "}
            <span className="font-serif italic font-normal text-white">LeonardoLi黎铭晞</span>
            <br />
            <span
              className="bg-gradient-to-r from-[var(--page-accent-a)] to-[var(--page-accent-b)] bg-clip-text font-sans font-semibold text-transparent"
              style={{ paddingBottom: 2 }}
            >
              Design Manager
            </span>
            <span className="mt-3 block text-[0.24em] uppercase tracking-[0.28em] text-white/42">
              Design Engineer
            </span>
          </h1>
        </Reveal>

        <Reveal delay={0.26}>
          <p className="mt-7 max-w-[680px] text-pretty text-[15px] leading-[1.85] text-white/66">
            以产品目标和用户需求为起点，完成洞察、拆解、PRD 与指标闭环。
            <br />
            需要时我也会把方案写进前端，保证体验落地。
          </p>
        </Reveal>

        <Reveal delay={0.34} className="mt-9 flex w-full flex-col items-center justify-center gap-3 lg:flex-row lg:gap-4">
          <a href="#works" className="glass-button-shell w-full sm:w-[min(520px,100%)] lg:flex-1 lg:min-w-0">
            <span className="glass-button-sheen" aria-hidden="true" />
            <span className="glass-button-core text-[12px] tracking-[0.08em]">
              <strong className="font-sans font-semibold tracking-normal">查看项目</strong>
              <span aria-hidden="true">→</span>
            </span>
          </a>
          <a href="/docs/resume.html" className="glass-button-shell w-full sm:w-[min(520px,100%)] lg:flex-1 lg:min-w-0">
            <span className="glass-button-sheen" aria-hidden="true" />
            <span className="glass-button-core text-[12px] tracking-[0.08em]">
              <strong className="font-sans font-semibold tracking-normal">查阅简历</strong>
              <span aria-hidden="true">→</span>
            </span>
          </a>
          <a href="/docs/art/index.html" className="glass-button-shell w-full sm:w-[min(520px,100%)] lg:flex-1 lg:min-w-0">
            <span className="glass-button-sheen" aria-hidden="true" />
            <span className="glass-button-core text-[12px] tracking-[0.08em]">
              <strong className="font-sans font-semibold tracking-normal">艺术创想</strong>
              <span aria-hidden="true">→</span>
            </span>
          </a>
        </Reveal>
      </div>

      <div className="pointer-events-none absolute bottom-9 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-white/40">
        <span>Scroll</span>
        <span className="h-10 w-px bg-gradient-to-b from-white/50 to-transparent" aria-hidden="true" />
      </div>
    </section>
  );
}
