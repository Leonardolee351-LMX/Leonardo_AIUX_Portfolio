import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * ScrollRevealText: Each character's opacity transitions based on scroll position
 * Creates a progressive text reveal effect as user scrolls
 * Reference: Prisma About section body text
 */
export function ScrollRevealText({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "end 0.2"],
  });

  const chars = text.split("");

  return (
    <div ref={containerRef} className={className}>
      {chars.map((char, i) => (
        <AnimatedChar
          key={i}
          char={char}
          index={i}
          total={chars.length}
          scrollYProgress={scrollYProgress}
        />
      ))}
    </div>
  );
}

function AnimatedChar({
  char,
  index,
  total,
  scrollYProgress,
}: {
  char: string;
  index: number;
  total: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const charProgress = index / total;
  const opacity = useTransform(
    scrollYProgress,
    [Math.max(0, charProgress - 0.1), Math.min(1, charProgress + 0.05)],
    [0.15, 1]
  );

  return (
    <motion.span style={{ opacity }} className="inline">
      {char === " " ? "\u00A0" : char}
    </motion.span>
  );
}

/**
 * FadeInWhenVisible: Simple fade + slide up when element enters viewport
 */
export function FadeInWhenVisible({
  children,
  className = "",
  delay = 0,
  y = 30,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * StaggerContainer: Children fade in with staggered delay
 */
export function StaggerContainer({
  children,
  className = "",
  staggerDelay = 0.1,
}: {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={{
        visible: {
          transition: { staggerChildren: staggerDelay },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30, scale: 0.95 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: {
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
