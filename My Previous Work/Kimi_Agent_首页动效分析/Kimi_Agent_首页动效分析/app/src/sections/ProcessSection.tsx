import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { WordsPullUpMultiStyle } from "@/components/WordsPullUp";
import { FadeInWhenVisible } from "@/components/ScrollRevealText";

const steps = [
  {
    num: "01",
    title: "洞察 Research",
    desc: "从用户研究中提取真实需求。通过问卷、访谈、竞品分析，定位核心矛盾，构建典型用户画像。",
  },
  {
    num: "02",
    title: "定义 Define",
    desc: "运用Kano模型划分功能优先级，将洞察转化为产品策略。明确「场景化交互+情感反馈」的设计方向。",
  },
  {
    num: "03",
    title: "设计 Design",
    desc: "从信息架构到高保真原型，从交互流程到视觉系统。搭建可复用的设计规范与组件库。",
  },
  {
    num: "04",
    title: "实现 Deliver",
    desc: "通过Vibe Coding快速实现前端交付。从概念到可运行Demo，五天完成一次完整的产品验证闭环。",
  },
];

function ProcessStep({
  step,
  index,
}: {
  step: (typeof steps)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 35 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 35 }}
      transition={{
        duration: 0.7,
        delay: index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <div className="soft-card rounded-[26px] p-6 md:p-7">
        <div className="mb-5 flex items-baseline gap-4">
          <span className="font-mono text-[10px] tracking-[0.14em] text-white/18">
            {step.num}
          </span>
          <div className="h-[1px] flex-1 bg-white/[0.06]" />
        </div>
        <h3 className="mb-3 text-[22px] tracking-[-0.02em] text-white md:text-[28px]">
          {step.title}
        </h3>
        <p className="text-[13px] leading-[1.8] text-white/48">{step.desc}</p>
      </div>
    </motion.div>
  );
}

export function ProcessSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const isHeaderInView = useInView(headerRef, { once: true, margin: "-50px" });

  return (
    <section className="relative w-full py-[15vh] px-[5vw]">
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(180deg, rgba(2,6,10,0.6) 0%, rgba(2,6,10,0.2) 15%, rgba(2,6,10,0.2) 85%, rgba(2,6,10,0.6) 100%)",
          }}
        />
      </div>

      <div className="relative" style={{ zIndex: 2 }}>
        <div ref={headerRef} className="mx-auto mb-16 max-w-[1180px] md:mb-20">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={isHeaderInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="section-label mb-6"
          >
            Process
          </motion.p>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <WordsPullUpMultiStyle
              segments={[
                { text: "从洞察到", className: "font-sans font-light text-white" },
                { text: "Vibe Coding", className: "font-serif italic text-white/70" },
                { text: "实现。", className: "font-sans font-light text-white" },
              ]}
              className="max-w-[14ch] text-[28px] leading-[1.06] tracking-[-0.03em] sm:text-[36px] md:text-[48px] lg:text-[58px]"
              delay={0.1}
              staggerDelay={0.05}
            />
            <p className="max-w-md text-[14px] leading-[1.9] text-white/56">
              不把过程藏在结果后面，而是把研究、定义、设计、交付拆成一段一段可验证的推进链路。
            </p>
          </div>
        </div>

        <div className="mx-auto mb-20 grid max-w-[1180px] grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
          {steps.map((step, i) => (
            <ProcessStep key={step.num} step={step} index={i} />
          ))}
        </div>

        <FadeInWhenVisible delay={0} y={20}>
          <div className="soft-card mx-auto max-w-[860px] rounded-[34px] px-7 py-10 text-center md:px-12 md:py-14">
            <p className="mb-5 text-[10px] uppercase tracking-[0.24em] text-white/28">Design note</p>
            <blockquote
              className="mb-4 text-[20px] font-light leading-[1.5] tracking-[-0.02em] text-white/64 md:text-[28px]"
              style={{ textShadow: "0 2px 15px rgba(0,0,0,0.5)" }}
            >
              <em className="font-serif italic">"好的设计应该是有温度的——</em>
              <br />
              <em className="font-serif italic">它能理解人的需求，回应人的情感。"</em>
            </blockquote>
            <p className="text-[10px] uppercase tracking-[0.18em] text-white/24">
              — Leonardo Li
            </p>
          </div>
        </FadeInWhenVisible>
      </div>
    </section>
  );
}
