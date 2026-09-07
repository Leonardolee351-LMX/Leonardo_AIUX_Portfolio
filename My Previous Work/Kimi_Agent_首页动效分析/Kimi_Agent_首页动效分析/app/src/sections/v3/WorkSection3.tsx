const selected = [
  {
    year: "2025",
    title: "JianCareer · AI 求职助手",
    summary: "0→1 产品搭建 · AI 对话界面 · 设计系统",
    image: "./project_cover/jiancareer.jpg",
    href: "./cases/Jiancareer.html",
    index: "01",
  },
  {
    year: "ON GOING",
    title: "StoryVibe",
    summary: "AIGC 视频叙事中间层 · 生成可控的故事节奏",
    image: "./project_cover/storyvibe.jpg",
    href: "./cases/StoryVibe.html",
    index: "02",
  },
  {
    year: "2025–26",
    title: "Twin City Tales",
    summary: "深港双城数据叙事 · PacificVis Shortlist",
    image: "./project_cover/twincity.jpg",
    href: "./cases/Twin-City-Tale.html",
    index: "03",
  },
  {
    year: "2026",
    title: "Attunia",
    summary: "AI Agent · Soft Healthcare · WLB 调节",
    image: "./project_cover/attunia.jpg",
    href: "./cases/Attunia.html",
    index: "04",
  },
];

export function WorkSection3() {
  return (
    <section id="works" data-video-stage="work" className="relative w-full">
      <div className="px-[5vw] py-[10vh]">
        <div className="mx-auto w-full max-w-[1400px]">
          <p className="section-label mb-4">Selected Case Studies</p>
          <h2
            className="font-semibold leading-[1.12] tracking-[-0.03em] text-white"
            style={{ fontSize: "clamp(28px, 4vw, 52px)" }}
          >
            Four deep dives
          </h2>
          <p className="mt-4 max-w-[560px] text-[14px] leading-[1.8] text-white/55">
            向下滚动，一屏一个封面；点进案例看完整讲述。其余小品在 Work · More。
          </p>
        </div>
      </div>

      <div className="relative">
        {selected.map((project, i) => (
          <a
            key={project.href}
            href={project.href}
            className="group relative block h-[100svh] w-full sticky top-0 overflow-hidden"
            style={{ zIndex: i + 1 }}
            aria-label={`${project.title} — 查看案例`}
          >
            <img
              src={project.image}
              alt=""
              loading={i === 0 ? "eager" : "lazy"}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.03]"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/20" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.35)_100%)]" />

            <div className="absolute inset-x-0 bottom-0 px-[5vw] pb-[min(10vh,72px)] pt-24">
              <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-6 md:flex-row md:items-end md:justify-between">
                <div className="max-w-[720px]">
                  <div className="mb-4 flex flex-wrap items-center gap-3">
                    <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-white/80 backdrop-blur-md">
                      Selected {project.index}
                    </span>
                    <span className="text-[11px] uppercase tracking-[0.18em] text-white/50">
                      {project.year}
                    </span>
                  </div>
                  <h3
                    className="text-pretty font-semibold leading-[1.08] tracking-[-0.03em] text-white"
                    style={{ fontSize: "clamp(28px, 4.5vw, 56px)" }}
                  >
                    {project.title}
                  </h3>
                  <p className="mt-3 max-w-[520px] text-[14px] leading-[1.75] text-white/65 md:text-[15px]">
                    {project.summary}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-3 self-start md:self-end">
                  <span className="inline-flex min-h-[48px] items-center gap-3 rounded-full border border-white/25 bg-white/10 px-5 text-[12px] tracking-[0.08em] text-white backdrop-blur-md transition-colors duration-300 group-hover:border-white/50 group-hover:bg-white/18">
                    View case
                    <span aria-hidden="true">→</span>
                  </span>
                </div>
              </div>
            </div>

            {i < selected.length - 1 && (
              <div className="pointer-events-none absolute bottom-5 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.22em] text-white/35">
                Scroll
              </div>
            )}
          </a>
        ))}
      </div>

      <div className="relative z-[5] bg-[var(--bg,#0a0a0f)] px-[5vw] py-16">
        <div className="mx-auto flex w-full max-w-[1400px] justify-center">
          <a
            href="./works.html"
            className="accent-ring glass-panel inline-flex min-h-[52px] w-full max-w-[520px] items-center justify-between rounded-full px-6 text-[12px] tracking-[0.08em] text-white/85 transition-transform duration-300 hover:scale-[1.02] hover:text-white"
          >
            <strong className="font-sans font-semibold tracking-normal">查看 Work 全部作品</strong>
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
