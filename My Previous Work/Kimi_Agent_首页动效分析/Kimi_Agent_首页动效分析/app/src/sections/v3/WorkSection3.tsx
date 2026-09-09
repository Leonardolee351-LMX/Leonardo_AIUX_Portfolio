import { useState, type MouseEvent, type ReactNode } from "react";

const attuniaFrames = [
  { src: "./img/projects/attunia/pitch/purpose.png", cap: "P2 · 开屏" },
  { src: "./img/projects/attunia/pitch/p3-sell.png", cap: "P3 · Soft Healthcare" },
  { src: "./img/projects/attunia/07-home-rec.png", cap: "Home · 此刻脑状态" },
  { src: "./img/projects/attunia/11-scene-path.png", cap: "Explore · 场景路径" },
  { src: "./img/projects/attunia/13-chat-tuno.png", cap: "Tuno · 对话" },
  { src: "./img/projects/attunia/14-consult.png", cap: "Friends · 会诊" },
];

const attuniaAgents = [
  { src: "./img/projects/attunia/friends/tuno.png", name: "Tuno" },
  { src: "./img/projects/attunia/friends/mira.png", name: "Mira" },
  { src: "./img/projects/attunia/friends/chen.png", name: "Chen" },
  { src: "./img/projects/attunia/friends/kai.png", name: "Kai" },
  { src: "./img/projects/attunia/friends/vega.png", name: "Vega" },
  { src: "./img/projects/attunia/friends/sona.png", name: "Sona" },
];

const twinShots = [
  { src: "./img/projects/twincity/cover-shots/p3-isochrone.jpg", cap: "Isochrone · 等时圈" },
  { src: "./img/projects/twincity/cover-shots/p4-dashboard.png", cap: "Traffic · 客流波形" },
  { src: "./img/projects/twincity/cover-shots/p5-chapter2.jpg", cap: "Chapter 2 · 折叠城市" },
  { src: "./img/projects/twincity/cover-shots/p6-persona.jpg", cap: "Personas · 通勤者" },
];

const TWINCITY_LIVE = "https://leonardolee351-lmx.github.io/Visstory_Twincitytides/";
const STORYVIBE_LIVE = "https://xyk4vninj5wnq.ok.kimi.link/";
const STORYVIBE_GITHUB = "https://github.com/murphlu19-png/StoryVibe-demo";
const JIANCAREER_LIVE = "https://jiancareer.com/";
const JIANCAREER_DEMO = "https://leonardolee351-lmx.github.io/JianCareer_JobAppAgent/?v=ee8a5a8";

const jianShots = [
  { src: "./img/projects/jiancareer/cover-shots/p2-landing-16x9.jpg", cap: "P2 · 官网落地" },
  { src: "./img/projects/jiancareer/cover-shots/ui-workbench-16x9.jpg", cap: "工作台 · 林晓舟" },
  { src: "./img/projects/jiancareer/cover-shots/ui-alignment-16x9.jpg", cap: "Alignment · 先对齐事实" },
  { src: "./img/projects/jiancareer/cover-shots/ui-tracker-16x9.jpg", cap: "Tracker · 投递飞轮" },
  { src: "./img/projects/jiancareer/cover-shots/p4-register-16x9.jpg", cap: "P4 · 一份档案" },
];

const storyShots = [
  { src: "./img/projects/storyvibe/cover-shots/home.jpg", cap: "Home · 灵感入口" },
  { src: "./img/projects/storyvibe/cover-shots/guided-chat.png", cap: "Guided · 引导对话" },
  { src: "./img/projects/storyvibe/cover-shots/script-workspace.png", cap: "Script · 镜头工作区" },
];

const selected = [
  {
    id: "jiancareer",
    year: "2025",
    title: "JianCareer · AI 求职助手",
    summary: "0→1 产品搭建 · AI 对话界面 · 设计系统",
    image: "./project_cover/jiancareer.jpg",
    href: "./cases/Jiancareer_ver2.html",
    index: "01",
  },
  {
    id: "storyvibe",
    year: "ON GOING",
    title: "StoryVibe",
    summary: "AIGC 视频叙事中间层 · 生成可控的故事节奏",
    image: "./project_cover/storyvibe.jpg",
    href: "./cases/StoryVibe.html",
    index: "02",
  },
  {
    id: "twincity",
    year: "2025–26",
    title: "Twin City Tales",
    summary: "深港双城数据叙事 · PacificVis Shortlist",
    image: "./project_cover/twincity-bg.jpg",
    href: "./cases/Twin-City-Tale.html",
    index: "03",
  },
  {
    id: "attunia",
    year: "2026",
    title: "Attunia",
    summary: "AI Agent · Soft Healthcare · WLB 调节",
    image: "./project_cover/attunia.jpg",
    href: "./cases/Attunia.html",
    index: "04",
  },
];

function BottomShade() {
  return (
    <div
      className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-[26%] bg-gradient-to-t from-black/72 via-black/22 to-transparent"
      aria-hidden="true"
    />
  );
}

function CoverMeta({
  project,
  extra,
  hideCopy,
}: {
  project: (typeof selected)[number];
  extra?: ReactNode;
  hideCopy?: boolean;
}) {
  return (
    <div className="absolute inset-x-0 bottom-0 z-[2] px-[5vw] pb-[min(10vh,72px)] pt-24">
      <div
        className={`mx-auto flex w-full max-w-[1400px] ${
          hideCopy
            ? "justify-end"
            : "flex-col gap-6 md:flex-row md:items-end md:justify-between"
        }`}
      >
        {!hideCopy && (
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
        )}
        <div className="flex shrink-0 flex-wrap items-center gap-3 self-start md:self-end">
          {hideCopy && (
            <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-white/80 backdrop-blur-md">
              Selected {project.index}
            </span>
          )}
          {extra}
          <a
            href={project.href}
            className="inline-flex min-h-[48px] items-center gap-3 rounded-full border border-white/25 bg-white/10 px-5 text-[12px] tracking-[0.08em] text-white backdrop-blur-md transition-colors duration-300 hover:border-white/50 hover:bg-white/18"
          >
            View case
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </div>
  );
}

function ScreenCarousel({
  shots,
  ariaLabel,
  anchor = "center",
}: {
  shots: { src: string; cap: string }[];
  ariaLabel: string;
  anchor?: "center" | "bottom";
}) {
  const [idx, setIdx] = useState(0);
  const frame = shots[idx];

  const advance = (event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setIdx((current) => (current + 1) % shots.length);
  };

  const shell =
    anchor === "bottom"
      ? "absolute right-[5vw] bottom-[min(20vh,152px)] z-[2] hidden w-[min(38vw,560px)] flex-col items-center gap-2 md:flex"
      : "absolute right-[5vw] top-1/2 z-[2] hidden w-[min(46vw,680px)] -translate-y-[52%] flex-col items-center gap-3 md:flex";
  const frameClass =
    anchor === "bottom"
      ? "relative aspect-video w-full max-h-[min(30vh,260px)] overflow-hidden rounded-[16px] border border-white/14 bg-black shadow-[0_18px_40px_rgba(0,0,0,0.45)]"
      : "relative aspect-video w-full max-h-[min(52vh,420px)] overflow-hidden rounded-[18px] border border-white/14 bg-black shadow-[0_22px_48px_rgba(0,0,0,0.45)]";

  return (
    <div className={shell}>
      <button
        type="button"
        onClick={advance}
        className={frameClass}
        aria-label={ariaLabel}
      >
        {shots.map((item, i) => (
          <img
            key={item.src}
            src={item.src}
            alt=""
            className={`absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-300 ${
              i === idx ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        <span className="absolute bottom-3 left-3 rounded-full bg-black/45 px-2.5 py-1 text-[11px] uppercase tracking-[0.1em] text-white">
          {frame.cap}
        </span>
      </button>
      <div className="flex gap-1.5" aria-hidden="true">
        {shots.map((item, i) => (
          <span
            key={item.src}
            className={`h-1.5 rounded-full transition-all ${
              i === idx ? "w-4 bg-white" : "w-1.5 bg-white/30"
            }`}
          />
        ))}
      </div>
      <p className="text-[11px] uppercase tracking-[0.14em] text-white/45">
        点击画面切换 · {frame.cap.split("·")[0].trim()} →
      </p>
    </div>
  );
}

function JianCareerStage() {
  const [idx, setIdx] = useState(0);
  const frame = jianShots[idx];
  const behindA = jianShots[(idx + 1) % jianShots.length];
  const behindB = jianShots[(idx + 2) % jianShots.length];

  const advance = (event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setIdx((current) => (current + 1) % jianShots.length);
  };

  return (
    <div className="absolute left-1/2 top-[46%] z-[2] hidden w-[min(84vw,1280px)] -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-3 md:flex">
      <div className="relative flex w-full items-center justify-center" style={{ perspective: "1600px" }}>
        <div className="pointer-events-none absolute left-[-2%] top-[8%] z-[1] w-[min(24vw,300px)] origin-right overflow-hidden rounded-[14px] border border-white/12 bg-white shadow-[0_18px_40px_rgba(0,0,0,0.35)] [transform:rotateY(16deg)_rotateZ(-8deg)]">
          <img src={behindB.src} alt="" className="aspect-video w-full object-cover object-top" />
        </div>
        <div className="pointer-events-none absolute right-[-2%] top-[18%] z-[1] w-[min(20vw,240px)] origin-left overflow-hidden rounded-[14px] border border-white/12 bg-white shadow-[0_18px_40px_rgba(0,0,0,0.32)] [transform:rotateY(-16deg)_rotateZ(7deg)]">
          <img src={behindA.src} alt="" className="aspect-video w-full object-cover object-top" />
        </div>

        <button
          type="button"
          onClick={advance}
          className="relative z-[2] mx-auto w-[min(68vw,1080px)]"
          aria-label="点击切换产品画面"
        >
          <div className="rounded-[16px] shadow-[0_28px_64px_rgba(0,0,0,0.45)]">
            <div className="relative aspect-[16/10] overflow-hidden rounded-[16px] border border-white/16 bg-black">
              {jianShots.map((item, i) => (
                <img
                  key={item.src}
                  src={item.src}
                  alt=""
                  className={`absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-300 ${
                    i === idx ? "opacity-100" : "opacity-0"
                  }`}
                />
              ))}
              <span className="absolute bottom-3 left-3 rounded-full bg-black/45 px-2.5 py-1 text-[11px] uppercase tracking-[0.1em] text-white">
                {frame.cap}
              </span>
            </div>
          </div>
        </button>
      </div>
      <div className="flex gap-1.5" aria-hidden="true">
        {jianShots.map((item, i) => (
          <span
            key={item.src}
            className={`h-1.5 rounded-full transition-all ${
              i === idx ? "w-4 bg-white" : "w-1.5 bg-white/30"
            }`}
          />
        ))}
      </div>
      <p className="text-[11px] uppercase tracking-[0.14em] text-white/45">
        点击画面切换 · {frame.cap.split("·")[0].trim()} →
      </p>
    </div>
  );
}

function AttuniaCarousel() {
  const [idx, setIdx] = useState(0);
  const frame = attuniaFrames[idx];

  const advance = (event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setIdx((current) => (current + 1) % attuniaFrames.length);
  };

  return (
    <div className="absolute right-[5vw] top-1/2 z-[2] hidden w-[min(32vw,320px)] -translate-y-[58%] flex-col items-center gap-3 md:flex">
      <button
        type="button"
        onClick={advance}
        className="relative aspect-[9/16] w-full max-h-[min(62vh,560px)] overflow-hidden rounded-[22px] border border-white/14 bg-black shadow-[0_22px_48px_rgba(0,0,0,0.45)]"
        aria-label="点击切换产品画面"
      >
        {attuniaFrames.map((item, i) => (
          <img
            key={item.src}
            src={item.src}
            alt=""
            className={`absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-300 ${
              i === idx ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        <span className="absolute bottom-3 left-3 rounded-full bg-black/40 px-2.5 py-1 text-[11px] uppercase tracking-[0.1em] text-white">
          {frame.cap}
        </span>
      </button>
      <div className="flex gap-1.5" aria-hidden="true">
        {attuniaFrames.map((item, i) => (
          <span
            key={item.src}
            className={`h-1.5 rounded-full transition-all ${
              i === idx ? "w-4 bg-white" : "w-1.5 bg-white/30"
            }`}
          />
        ))}
      </div>
      <p className="text-[11px] uppercase tracking-[0.14em] text-white/45">
        点击画面切换 · {frame.cap.split("·")[0].trim()} →
      </p>
    </div>
  );
}

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
        {selected.map((project, i) => {
          const isLast = i === selected.length - 1;

          if (project.id === "jiancareer") {
            return (
              <article
                key={project.href}
                className="relative block h-[100svh] w-full overflow-hidden sticky top-0"
                style={{ zIndex: i + 1 }}
                aria-label={project.title}
              >
                <img
                  src={project.image}
                  alt=""
                  loading="eager"
                  className="absolute inset-0 h-full w-full object-cover object-[center_30%]"
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/55 via-black/18 to-black/28"
                  aria-hidden="true"
                />
                <JianCareerStage />
                <BottomShade />
                <CoverMeta
                  project={project}
                  extra={
                    <>
                      <a
                        href={JIANCAREER_DEMO}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-[52px] items-center gap-2.5 rounded-full bg-[#12c4a2] px-6 text-[13px] font-semibold tracking-[0.06em] text-[#06241d] shadow-[0_10px_28px_rgba(18,196,162,0.4)] transition-transform duration-300 hover:scale-[1.04] hover:bg-[#1ee0ba]"
                      >
                        <span aria-hidden="true" className="flex h-6 w-6 items-center justify-center rounded-full bg-[#06241d] text-[#12c4a2]">
                          ▶
                        </span>
                        在线演示 · 亲手点
                      </a>
                      <a
                        href={JIANCAREER_LIVE}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-[48px] items-center gap-3 rounded-full border border-white/20 bg-white/8 px-5 text-[12px] tracking-[0.08em] text-white/85 backdrop-blur-md transition-colors hover:border-white/45 hover:text-white"
                      >
                        打开官网
                      </a>
                    </>
                  }
                />
                <div className="pointer-events-none absolute bottom-5 left-1/2 z-[2] -translate-x-1/2 text-[10px] uppercase tracking-[0.22em] text-white/35">
                  Scroll
                </div>
              </article>
            );
          }

          if (project.id === "attunia") {
            return (
              <article
                key={project.href}
                className="relative block h-[100svh] w-full overflow-hidden sticky top-0"
                style={{ zIndex: i + 1 }}
                aria-label={project.title}
              >
                <img
                  src={project.image}
                  alt=""
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover object-[center_20%]"
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/48 via-black/12 to-transparent"
                  aria-hidden="true"
                />
                <BottomShade />

                <div className="absolute left-[5vw] top-[22%] z-[2] hidden max-w-[36rem] md:block">
                  <div className="mb-5 flex flex-wrap gap-2">
                    {attuniaAgents.map((agent) => (
                      <img
                        key={agent.name}
                        src={agent.src}
                        alt={agent.name}
                        title={agent.name}
                        className="h-11 w-11 rounded-[10px] border border-white/18 object-cover shadow-[0_6px_16px_rgba(0,0,0,0.25)]"
                      />
                    ))}
                  </div>
                  <p className="text-[11px] uppercase tracking-[0.18em] text-white/55">
                    VITAL · Soft Healthcare
                  </p>
                  <p
                    className="mt-2 font-semibold tracking-[-0.045em] text-[#f3f1ea]"
                    style={{ fontSize: "clamp(42px, 6vw, 72px)" }}
                  >
                    Attunia
                  </p>
                  <p className="mt-3 max-w-[32ch] text-[15px] leading-[1.55] text-white/72">
                    帮助用户克服工作脑雾与 WLB 切换中的大脑状态真空期——心理调适 Agent。
                  </p>
                  <p className="mt-5 text-[13px] tracking-[0.04em] text-white/45">
                    Tune out work. Tune in life.
                  </p>
                </div>

                <AttuniaCarousel />
                <CoverMeta project={project} />
              </article>
            );
          }

          if (project.id === "twincity") {
            return (
              <article
                key={project.href}
                className="relative block h-[100svh] w-full overflow-hidden sticky top-0"
                style={{ zIndex: i + 1 }}
                aria-label={project.title}
              >
                <img
                  src={project.image}
                  alt=""
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover object-center"
                />
                <ScreenCarousel
                  shots={twinShots}
                  ariaLabel="点击切换叙事界面"
                  anchor="bottom"
                />
                <BottomShade />
                <CoverMeta
                  project={project}
                  extra={
                    <a
                      href={TWINCITY_LIVE}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-[48px] items-center gap-3 rounded-full border border-white/20 bg-white/8 px-5 text-[12px] tracking-[0.08em] text-white/85 backdrop-blur-md transition-colors hover:border-white/45 hover:text-white"
                    >
                      打开叙事网站
                    </a>
                  }
                />
                <div className="pointer-events-none absolute bottom-5 left-1/2 z-[2] -translate-x-1/2 text-[10px] uppercase tracking-[0.22em] text-white/45">
                  Scroll
                </div>
              </article>
            );
          }

          if (project.id === "storyvibe") {
            return (
              <article
                key={project.href}
                className="relative block h-[100svh] w-full overflow-hidden sticky top-0"
                style={{ zIndex: i + 1 }}
                aria-label={project.title}
              >
                <img
                  src={project.image}
                  alt=""
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/22"
                  aria-hidden="true"
                />
                <ScreenCarousel shots={storyShots} ariaLabel="点击切换产品画面" />
                <BottomShade />
                <CoverMeta
                  project={project}
                  extra={
                    <>
                      <a
                        href={STORYVIBE_LIVE}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-[48px] items-center gap-3 rounded-full border border-white/20 bg-white/8 px-5 text-[12px] tracking-[0.08em] text-white/85 backdrop-blur-md transition-colors hover:border-white/45 hover:text-white"
                      >
                        打开原型
                      </a>
                      <a
                        href={STORYVIBE_GITHUB}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-[48px] items-center gap-3 rounded-full border border-white/20 bg-white/8 px-5 text-[12px] tracking-[0.08em] text-white/85 backdrop-blur-md transition-colors hover:border-white/45 hover:text-white"
                      >
                        GitHub
                      </a>
                    </>
                  }
                />
                <div className="pointer-events-none absolute bottom-5 left-1/2 z-[2] -translate-x-1/2 text-[10px] uppercase tracking-[0.22em] text-white/35">
                  Scroll
                </div>
              </article>
            );
          }

          return (
            <a
              key={project.href}
              href={project.href}
              className="group relative block h-[100svh] w-full overflow-hidden sticky top-0"
              style={{ zIndex: i + 1 }}
              aria-label={`${project.title} — 查看案例`}
            >
              <img
                src={project.image}
                alt=""
                loading={i === 0 ? "eager" : "lazy"}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.03]"
              />
              <BottomShade />
              <div className="absolute inset-x-0 bottom-0 z-[2] px-[5vw] pb-[min(10vh,72px)] pt-24">
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
              {!isLast && (
                <div className="pointer-events-none absolute bottom-5 left-1/2 z-[2] -translate-x-1/2 text-[10px] uppercase tracking-[0.22em] text-white/35">
                  Scroll
                </div>
              )}
            </a>
          );
        })}
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
