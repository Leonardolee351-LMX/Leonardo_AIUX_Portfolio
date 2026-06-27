import { Reveal } from "@/components/Reveal";

const portfolioFigmaBase =
  "https://www.figma.com/design/rwHLputL2eIpqr91OtV1EF/LMX%E4%B8%AA%E4%BA%BA%E4%BD%9C%E5%93%81%E9%9B%86%E5%88%B6%E4%BD%9C--?t=lV4KMbHcHR63JHFF-1";

const portfolioNodeLink = (nodeId: string) =>
  `${portfolioFigmaBase}&node-id=${encodeURIComponent(nodeId).replace(/%3A/g, "-")}`;

const projects = [
  {
    year: "2025",
    title: "JianCareer · AI 求职助手",
    summary: "体验设计 · Vibe Coding · 设计系统",
    image: "./project_cover/jiancareer.jpg",
    href: "./cases/Jiancareer.html",
    figmaHref:
      "https://www.figma.com/design/PuEJoNAkxRowAizlmc5VtN/%E7%AE%80%E8%81%8C%E7%83%82%E5%B0%BE%E6%A5%BC?node-id=0-1&t=0TkLYv2ivkakbyUG-1",
  },
  {
    year: "2025",
    title: "Anxious Kit",
    summary: "可穿戴情绪辅助系统 · 生理信号监测",
    image: "./project_cover/anxious.jpg",
    href: "./cases/Anxious-Kit.html",
    figmaHref: portfolioNodeLink("438:34"),
  },
  {
    year: "2025",
    title: "StoryVibe",
    summary: "AI 视频叙事中间层 · 创意工作流",
    image: "./project_cover/storyvibe.jpg",
    href: "./cases/StoryVibe.html",
    figmaHref:
      "https://www.figma.com/design/W3hR0cyqjajMyKIcNMExTe/GenAI-Video?node-id=0-1&t=Q6eDkj0oiaODBjGm-1",
  },
  {
    year: "2024",
    title: "MemoryLens",
    summary: "VisionPro · 多模态交互 · 黑客松",
    image: "./project_cover/memorylens.jpg",
    href: "./cases/MemoryLens.html",
    figmaHref: portfolioNodeLink("436:5"),
  },
  {
    year: "2024",
    title: "AI 启蒙代练屋",
    summary: "AI 教育玩具 · 用户研究 · 交互定义",
    image: "./project_cover/toys.png",
    href: "./cases/Toys.html",
    figmaHref: portfolioNodeLink("438:46"),
  },
  {
    year: "2024",
    title: "Twin City Tale",
    summary: "深港双城数据叙事 · 前端开发",
    image: "./project_cover/twincity.jpg",
    href: "./cases/Twin-City-Tale.html",
    figmaHref: portfolioNodeLink("689:28"),
  },
];

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  return (
    <Reveal delay={0.06 + index * 0.04}>
      <a href={project.href} className="group block">
        <article className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.02]">
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            className="aspect-[16/10] w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 [@media(hover:none)]:opacity-100" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 p-5 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 [@media(hover:none)]:opacity-100 [@media(hover:none)]:translate-y-0 translate-y-2">
            <div className="glass-panel rounded-[22px] px-5 py-4">
              <span className="block text-[10px] uppercase tracking-[0.22em] text-white/55">
                {project.year}
              </span>
              <h3 className="mt-2 text-pretty text-[18px] font-semibold leading-[1.2] tracking-[-0.02em] text-white">
                {project.title}
              </h3>
              <p className="mt-2 text-[12px] leading-[1.75] text-white/60">
                {project.summary}
              </p>
            </div>
          </div>
        </article>
      </a>
    </Reveal>
  );
}

export function WorkSection3() {
  return (
    <section id="works" data-video-stage="work" className="relative w-full px-[5vw] py-[12vh]">
      <div className="mx-auto w-full max-w-[1400px]">
        <Reveal delay={0.05} className="mb-12 md:mb-16">
          <p className="section-label mb-4">Selected Projects</p>
          <h2 className="text-white font-semibold leading-[1.12] tracking-[-0.03em]" style={{ fontSize: "clamp(28px, 4vw, 52px)" }}>
            Recent Works
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-7 lg:grid-cols-3">
          {projects.map((project, index) => (
            <ProjectCard key={project.href} project={project} index={index} />
          ))}
        </div>

        <div className="mt-12 flex justify-center md:mt-14">
          <Reveal delay={0.08} className="w-full">
            <a
              href="./works.html"
              className="accent-ring glass-panel mx-auto inline-flex min-h-[52px] items-center justify-between rounded-full px-6 text-[12px] tracking-[0.08em] text-white/85 transition-transform duration-300 hover:scale-[1.02] hover:text-white"
              style={{ width: "min(520px, 100%)" }}
            >
              <strong className="font-sans font-semibold tracking-normal">查看所有 9 个作品</strong>
              <span aria-hidden="true">→</span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
