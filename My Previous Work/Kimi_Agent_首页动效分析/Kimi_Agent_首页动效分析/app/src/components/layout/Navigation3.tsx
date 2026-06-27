import { useEffect, useId, useRef, useState } from "react";
import gsap from "gsap";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "Work", href: "/docs/works.html" },
  { label: "Art", href: "/docs/art/index.html" },
  { label: "Resume", href: "/docs/resume.html" },
  { label: "About", href: "/docs/about.html" },
] as const;

export function Navigation3() {
  const navRef = useRef<HTMLElement>(null);
  const menuId = useId();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!navRef.current) return;
    gsap.to(navRef.current, {
      opacity: 1,
      duration: 0.7,
      delay: 0.2,
      ease: "power2.out",
    });
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <>
      <header
        ref={navRef}
        className="fixed left-0 right-0 top-0 z-[9999] flex h-16 items-center justify-between px-5 opacity-0 md:px-8"
      >
        <div className="topbar-frost absolute inset-0" aria-hidden="true" />

        <a
          href="#home"
          className="brand-hitbox relative inline-flex items-center justify-center rounded-xl"
          aria-label="Leonardo Li"
        >
          <span className="brand-mark" aria-hidden="true" />
        </a>

        <nav className="relative hidden items-center gap-8 text-[13px] tracking-[0.08em] text-white/62 md:flex">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} className="transition-colors hover:text-white/88">
              {item.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          className="nav-toggle-button relative inline-flex min-h-[44px] items-center justify-center rounded-lg px-3 py-2 text-[11px] uppercase tracking-[0.18em] text-white/70 transition-colors hover:text-white md:hidden"
          aria-controls={menuId}
          aria-expanded={open}
          aria-label="打开菜单"
          onClick={() => setOpen((prev) => !prev)}
        >
          Menu
        </button>
      </header>

      <div
        id={menuId}
        hidden={!open}
        className="fixed inset-0 z-[9998] bg-black/65 backdrop-blur-md md:hidden"
        onClick={() => setOpen(false)}
      >
        <div
          className="glass-panel accent-ring absolute right-4 top-20 w-[min(320px,calc(100%-2rem))] rounded-[28px] p-4"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="flex items-center justify-between px-2 pb-2">
            <span className="text-[10px] uppercase tracking-[0.24em] text-white/40">Navigate</span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-full px-3 py-2 text-[11px] uppercase tracking-[0.18em] text-white/60 transition-colors hover:text-white"
            >
              Close
            </button>
          </div>
          <div className="flex flex-col">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-2xl px-4 py-3 text-[12px] uppercase tracking-[0.2em] text-white/72 transition-colors hover:bg-white/5 hover:text-white"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
