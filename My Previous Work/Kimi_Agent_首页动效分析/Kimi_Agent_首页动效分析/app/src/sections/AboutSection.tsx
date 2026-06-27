import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { WordsPullUpMultiStyle } from "@/components/WordsPullUp";
import { ScrollRevealText, FadeInWhenVisible } from "@/components/ScrollRevealText";

const fadeUp = {
  hidden: { y: 30, opacity: 0 },
  visible: (delay: number) => ({
    y: 0,
    opacity: 1,
    transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-50px" });

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full px-[5vw] py-[18vh]"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 1 }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(180deg, rgba(2,6,10,0.6) 0%, rgba(2,6,10,0.25) 20%, rgba(2,6,10,0.25) 80%, rgba(2,6,10,0.6) 100%)",
          }}
        />
      </div>

      <div className="relative" style={{ zIndex: 2 }}>
        <div className="mx-auto max-w-[1180px]">
          <motion.p
            custom={0}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeUp}
            className="section-label mb-8"
          >
            About
          </motion.p>

          <div className="mb-16 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <WordsPullUpMultiStyle
              segments={[
                { text: "把研究、产品与前端", className: "font-sans font-light text-white" },
                { text: "缝合成同一条体验链路。", className: "font-serif italic text-white/84" },
              ]}
              className="max-w-[13ch] text-[30px] leading-[1.04] tracking-[-0.03em] sm:text-[38px] md:text-[50px] lg:text-[62px]"
              delay={0.1}
              staggerDelay={0.06}
            />
            <div className="max-w-md">
              <ScrollRevealText
                text="我融合人机交互专业背景与 AI Native 全链路设计能力，从建筑空间叙事到数字产品设计，从用户洞察到 Vibe Coding 前端实现，持续打磨能够被真实使用、真实感知的智能体验。"
                className="text-[14px] leading-[1.95] text-white/58"
              />
            </div>
          </div>

          <div
            ref={statsRef}
            className="mb-20 grid grid-cols-1 gap-4 md:grid-cols-3"
          >
            {[
              { number: "9+", label: "项目实践", detail: "覆盖 AI 产品、交互装置、数据叙事与品牌界面" },
              { number: "2+", label: "设计岗位经历", detail: "持续参与从研究、定义到交付的完整流程" },
              { number: "500+", label: "研究样本", detail: "长期使用问卷、访谈和竞品拆解校准方向" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ y: 30, opacity: 0 }}
                animate={statsInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.15,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="soft-card rounded-[28px] p-6 md:p-7"
              >
                <p className="mb-3 text-[clamp(36px,5vw,64px)] leading-none tracking-[-0.04em] text-white">
                  {stat.number}
                </p>
                <p className="mb-3 text-[10px] uppercase tracking-[0.22em] text-white/35">
                  {stat.label}
                </p>
                <p className="max-w-[24ch] text-[13px] leading-[1.8] text-white/48">
                  {stat.detail}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[0.95fr_1.05fr]">
            <FadeInWhenVisible delay={0} y={30}>
              <div className="soft-card rounded-[32px] p-7 md:p-8">
                <div className="mb-8 flex items-center gap-4">
                  <div className="editorial-line" />
                  <p className="section-label">Education</p>
                </div>
                <div className="space-y-7">
                  {[
                    { school: "香港城市大学", detail: "创意媒体学院 MFACM · 人机交互方向硕士", year: "2025 – 2027" },
                    { school: "广州美术学院", detail: "信息与交互设计 硕士 · GPA 3.5/4.0", year: "2023 – 2025" },
                    { school: "广州美术学院", detail: "建筑学 学士 · 荣誉毕业设计奖", year: "2018 – 2023" },
                  ].map((edu) => (
                    <div key={edu.school + edu.year} className="border-l border-white/[0.1] pl-5">
                      <p className="text-[18px] leading-tight text-white">{edu.school}</p>
                      <p className="mt-2 text-[13px] leading-[1.8] text-white/48">{edu.detail}</p>
                      <p className="mt-2 text-[10px] uppercase tracking-[0.18em] text-white/26">{edu.year}</p>
                    </div>
                  ))}
                </div>
              </div>
            </FadeInWhenVisible>

            <FadeInWhenVisible delay={0.1} y={30}>
              <div className="soft-card rounded-[32px] p-7 md:p-8">
                <div className="mb-8 flex items-center gap-4">
                  <div className="editorial-line" />
                  <p className="section-label">Experience</p>
                </div>
                <div className="space-y-7">
                  {[
                    {
                      role: "简职 · 体验设计师",
                      desc: "独立负责 AI Mentor 界面系统设计与前端实现，从 0 搭建设计规范体系，完成 40+ 页 Figma 高保真原型，项目进入 toC 软件榜单 Top 10%。",
                      year: "2025.08 – 2026.01",
                    },
                    {
                      role: "将心注入 · AI 产品体验设计实习生",
                      desc: "独立 owner 用户研究模块，完成 500+ 份家长问卷与 20+ 款竞品分析，助力团队获 Xbot 科创夏令营最佳用户洞察奖。",
                      year: "2024.07 – 2024.10",
                    },
                  ].map((exp) => (
                    <div key={exp.role} className="border-l border-white/[0.1] pl-5">
                      <p className="text-[18px] leading-tight text-white">{exp.role}</p>
                      <p className="mt-2 text-[13px] leading-[1.85] text-white/48">{exp.desc}</p>
                      <p className="mt-2 text-[10px] uppercase tracking-[0.18em] text-white/26">{exp.year}</p>
                    </div>
                  ))}
                </div>
              </div>
            </FadeInWhenVisible>
          </div>
        </div>
      </div>
    </section>
  );
}
