import { motion, useReducedMotion } from "framer-motion";

/**
 * Scroll-reveal wrapper. Fades + lifts content into view once, the first time
 * it enters the viewport. Honors prefers-reduced-motion (renders statically).
 *
 * Props:
 *  - as:     element/component to render (default "div")
 *  - delay:  stagger offset in seconds
 *  - y:      initial vertical offset in px (default 24)
 *  - className / style / ...rest forwarded to the motion element
 */
export default function Reveal({
  as = "div",
  delay = 0,
  y = 24,
  className = "",
  children,
  ...rest
}) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as] || motion.div;

  if (reduce) {
    const Tag = as;
    return (
      <Tag className={className} {...rest}>
        {children}
      </Tag>
    );
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}
