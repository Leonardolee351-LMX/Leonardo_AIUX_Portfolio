import { useRef } from "react";
import { motion, useInView } from "framer-motion";

/**
 * WordsPullUp: Each word slides up from y:20 with staggered delay
 * Reference: Prisma hero text animation
 */
export function WordsPullUp({
  text,
  className = "",
  delay = 0,
  staggerDelay = 0.08,
  showAsterisk = false,
}: {
  text: string;
  className?: string;
  delay?: number;
  staggerDelay?: number;
  showAsterisk?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const words = text.split(" ");

  return (
    <div ref={ref} className={`inline-flex flex-wrap ${className}`}>
      {words.map((word, i) => {
        const isLastWord = i === words.length - 1;
        const isLastCharA = isLastWord && word.endsWith("a");
        const displayWord = showAsterisk && isLastCharA ? word.slice(0, -1) : word;

        return (
          <span key={i} className="relative inline-flex items-start overflow-hidden mr-[0.25em]">
            <motion.span
              initial={{ y: 40, opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : { y: 40, opacity: 0 }}
              transition={{
                duration: 0.7,
                delay: delay + i * staggerDelay,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="inline-block"
            >
              {displayWord}
            </motion.span>
            {showAsterisk && isLastCharA && (
              <motion.sup
                initial={{ y: 40, opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : { y: 40, opacity: 0 }}
                transition={{
                  duration: 0.7,
                  delay: delay + (i + 0.5) * staggerDelay,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="text-[0.5em] ml-[0.05em] mt-[0.3em]"
              >
                *
              </motion.sup>
            )}
          </span>
        );
      })}
    </div>
  );
}

/**
 * WordsPullUpMultiStyle: Different styles per segment
 * Each segment can have its own className (e.g., serif italic)
 */
export function WordsPullUpMultiStyle({
  segments,
  className = "",
  delay = 0,
  staggerDelay = 0.08,
}: {
  segments: { text: string; className?: string }[];
  className?: string;
  delay?: number;
  staggerDelay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  // Flatten all words with their classNames
  const allWords: { word: string; className: string; index: number }[] = [];
  let wordIndex = 0;

  segments.forEach((segment) => {
    const words = segment.text.split(" ");
    words.forEach((word) => {
      allWords.push({
        word,
        className: segment.className || "",
        index: wordIndex,
      });
      wordIndex++;
    });
  });

  return (
    <div ref={ref} className={`inline-flex flex-wrap justify-center ${className}`}>
      {allWords.map(({ word, className: wordClass, index }) => (
        <span key={index} className="overflow-hidden mr-[0.25em]">
          <motion.span
            initial={{ y: 30, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
            transition={{
              duration: 0.6,
              delay: delay + index * staggerDelay,
              ease: [0.16, 1, 0.3, 1],
            }}
            className={`inline-block ${wordClass}`}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </div>
  );
}
