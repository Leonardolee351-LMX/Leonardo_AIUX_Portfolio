import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export function ContactSection3() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      id="contact"
      data-video-stage="contact"
      ref={sectionRef}
      className="relative flex min-h-[100dvh] w-full flex-col justify-center overflow-hidden px-[5vw] py-[15vh]"
    >
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(180deg, rgba(5,5,5,0.52) 0%, rgba(5,5,5,0.18) 18%, rgba(5,5,5,0.18) 82%, rgba(5,5,5,0.62) 100%)",
          }}
        />
      </div>

      <div className="relative" style={{ zIndex: 2 }}>
        <div className="mx-auto max-w-[1180px]">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
            <div>
              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="section-label mb-6"
              >
                Contact
              </motion.p>

              <motion.h2
                initial={{ opacity: 0, y: 22 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="text-white font-light leading-[1.02] tracking-[-0.04em]"
                style={{ fontSize: "clamp(34px, 6vw, 86px)" }}
              >
                一起把想法做成可感知的体验。
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 18 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
                className="mt-6 max-w-[34rem] text-[14px] leading-[1.9] text-white/54"
                style={{ textShadow: "0 1px 8px rgba(0,0,0,0.35)" }}
              >
                你可以从现网案例页继续浏览，也可以直接邮件联系我。更想快速了解经历可以打开简历页。
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.85, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="soft-card rounded-[34px] p-7 md:p-8"
            >
              <p className="mb-5 text-[10px] uppercase tracking-[0.22em] text-white/28">Reach out</p>

              <a
                href="mailto:919452364@qq.com"
                className="group inline-flex items-center gap-3 border-b border-white/18 pb-2 text-[22px] tracking-[-0.02em] text-white transition-colors duration-500 hover:border-white/55 md:text-[30px]"
              >
                919452364@qq.com
                <span className="inline-block text-[16px] text-white/35 transition-all duration-300 group-hover:translate-x-1 group-hover:text-white/75">
                  &#8594;
                </span>
              </a>

              <div className="mt-8 grid grid-cols-1 gap-3 text-[11px] uppercase tracking-[0.16em] text-white/40">
                <a href="/docs/resume.html" target="_blank" rel="noreferrer" className="transition-colors hover:text-white/75">
                  Open resume
                </a>
                <a href="/docs/works.html" target="_blank" rel="noreferrer" className="transition-colors hover:text-white/75">
                  Browse all works
                </a>
                <a href="/docs/about.html" target="_blank" rel="noreferrer" className="transition-colors hover:text-white/75">
                  About
                </a>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-16 flex flex-col gap-5 border-t border-white/8 pt-8 text-[10px] uppercase tracking-[0.18em] text-white/24 md:flex-row md:items-center md:justify-between"
          >
            <span>&#169; 2026 Leonardo Li</span>
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              <span>Index 3.0</span>
              <span className="opacity-30">/</span>
              <span>Video background</span>
              <span className="opacity-30">/</span>
              <span>Works open docs</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

