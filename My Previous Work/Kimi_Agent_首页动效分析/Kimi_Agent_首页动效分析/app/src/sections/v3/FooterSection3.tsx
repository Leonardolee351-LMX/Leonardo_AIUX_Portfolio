import { Reveal } from "@/components/Reveal";
import { Github, Linkedin } from "lucide-react";

const mailTo = "mailto:leonardolee351@gmail.com";

const socials = [
  {
    label: "GitHub",
    href: "https://github.com/Leonardolee351-LMX",
    icon: Github,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/%E9%93%AD%E6%99%9E-%E9%BB%8E-925845381/",
    icon: Linkedin,
  },
  {
    label: "Rednote",
    href: "https://www.xiaohongshu.com/user/profile/5f16628e000000000100061f",
    accent: "红",
  },
  {
    label: "Gmail",
    href: mailTo,
  },
] as const;

export function FooterSection3() {
  return (
    <footer
      data-video-stage="footer"
      className="relative w-full px-[5vw] pb-10 pt-14 md:pb-12 md:pt-18"
    >
      <div className="mx-auto w-full max-w-[1400px]">
        <div className="border-t border-white/10 pt-8 md:pt-9">
          <Reveal delay={0.12} className="flex items-center justify-center py-8 md:py-10">
            <a
              href={mailTo}
              className="group inline-flex min-h-[56px] w-full max-w-[520px] items-center justify-between rounded-full border border-white/14 bg-white/95 px-7 text-[12px] tracking-[0.08em] text-[#050505] shadow-[0_18px_50px_rgba(0,0,0,0.2)] transition-transform duration-300 hover:scale-[1.02]"
            >
              <span className="inline-flex items-center gap-3">
                <span className="gmail-mark" aria-hidden="true">
                  <span className="gmail-mark__top" />
                  <span className="gmail-mark__left" />
                  <span className="gmail-mark__right" />
                  <span className="gmail-mark__bottom" />
                </span>
                <strong className="font-sans font-semibold tracking-normal">Say Hello</strong>
              </span>
              <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-0.5">
                →
              </span>
            </a>
          </Reveal>

          <div className="border-t border-white/10 pt-7">
            <Reveal delay={0.16}>
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex min-h-[32px] items-center gap-4">
                  <span className="brand-mark block h-[26px] w-[108px] shrink-0" aria-hidden="true" />
                </div>

                <p className="text-[12px] tracking-[0.08em] text-white/46 md:text-center">
                  © 2026 Leonardo Li · All Rights Reserved
                </p>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[12px] tracking-[0.08em] text-white/56 md:justify-end">
                  {socials.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      className="inline-flex min-h-[28px] items-center gap-2 transition-colors hover:text-white"
                      target={item.href.startsWith("mailto:") ? undefined : "_blank"}
                      rel={item.href.startsWith("mailto:") ? undefined : "noreferrer"}
                    >
                      {item.label === "Gmail" ? (
                        <span className="gmail-mark" aria-hidden="true">
                          <span className="gmail-mark__top" />
                          <span className="gmail-mark__left" />
                          <span className="gmail-mark__right" />
                          <span className="gmail-mark__bottom" />
                        </span>
                      ) : "icon" in item ? (
                        <item.icon size={15} strokeWidth={1.8} />
                      ) : (
                        <span className="inline-flex h-[18px] w-[18px] items-center justify-center rounded-full border border-white/18 text-[10px] font-semibold text-white/76">
                          {item.accent}
                        </span>
                      )}
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </footer>
  );
}
