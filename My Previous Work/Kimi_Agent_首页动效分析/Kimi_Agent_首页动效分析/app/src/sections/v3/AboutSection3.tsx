import { Reveal } from "@/components/Reveal";

export function AboutSection3() {
  return (
    <section
      id="about"
      data-video-stage="about"
      className="relative w-full px-[5vw] pb-16 pt-20 md:pb-20 md:pt-24"
    >
      <div className="mx-auto w-full max-w-[980px] border-t border-white/10 pt-12 md:pt-14">
        <Reveal delay={0.05}>
          <p className="section-label">About</p>
        </Reveal>

        <Reveal delay={0.12}>
          <h2 className="mt-6 text-white font-semibold leading-[1.1] tracking-[-0.03em]" style={{ fontSize: "clamp(28px, 4vw, 46px)" }}>
            Design Manager{" "}
            <span className="font-serif italic font-normal text-white/85">
              · Design Engineer
            </span>
          </h2>
        </Reveal>

        <Reveal delay={0.18}>
          <div className="mt-7 space-y-4 text-[15px] leading-[1.9] text-white/62">
            <p>我关注产品价值与用户体验之间的可验证闭环，从洞察到上线后的指标复盘。</p>
            <p>我也会用设计系统与前端实现把细节做到可交付，让方案更接近真实上线的质量。</p>
          </div>
        </Reveal>

        <Reveal delay={0.22}>
          <div className="mt-8 flex flex-wrap gap-2">
            {[
              "Product Strategy",
              "User Research",
              "PRD",
              "Interaction Design",
              "Design Systems",
              "Frontend",
            ].map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/10 bg-white/0 px-4 py-2 text-[11px] tracking-[0.16em] text-white/52"
              >
                {tag}
              </span>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.26} className="mt-10 flex">
          <a
            href="/docs/about.html"
            className="accent-ring glass-panel inline-flex w-full items-center justify-between rounded-full px-6 py-3 text-[12px] tracking-[0.08em] text-white/80 transition-transform duration-300 hover:scale-[1.02] hover:text-white sm:w-auto"
          >
            <strong className="font-sans font-semibold tracking-normal">了解更多</strong>
            <span aria-hidden="true">→</span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
