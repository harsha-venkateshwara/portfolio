import { useEffect, useRef } from "react";

/**
 * Aurora hero background — flowing indigo/violet/blue gradient blobs that
 * drift on their own (CSS keyframes) and gently parallax toward the cursor,
 * with a soft violet glow that follows the pointer.
 *
 * Pure CSS blobs + a tiny rAF-smoothed pointer handler. Pointer is tracked on
 * window so the layer can stay pointer-events:none and never block the hero's
 * buttons. Honors prefers-reduced-motion (no parallax/glow; the drift keyframes
 * are neutralized by the global reduced-motion rule, leaving a static aurora).
 */
export default function AuroraBackground({ className = "" }) {
  const rootRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    const glow = glowRef.current;
    if (!root) return;

    const reduce =
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
    if (reduce) return;

    let raf = 0;
    let tx = 0;
    let ty = 0;
    let gx = 0;
    let gy = 0;
    let targetTx = 0;
    let targetTy = 0;
    let targetGx = 0;
    let targetGy = 0;
    let hovering = false;

    const onMove = (e) => {
      const rect = root.getBoundingClientRect();
      const inside =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;
      if (!inside) {
        if (hovering) {
          hovering = false;
          root.classList.remove("is-hover");
        }
        return;
      }
      if (!hovering) {
        hovering = true;
        root.classList.add("is-hover");
      }
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      targetTx = nx * 28;
      targetTy = ny * 28;
      targetGx = e.clientX - rect.left;
      targetGy = e.clientY - rect.top;
    };

    const tick = () => {
      raf = requestAnimationFrame(tick);
      tx += (targetTx - tx) * 0.06;
      ty += (targetTy - ty) * 0.06;
      gx += (targetGx - gx) * 0.12;
      gy += (targetGy - gy) * 0.12;
      root.style.transform = `translate3d(${tx.toFixed(2)}px, ${ty.toFixed(2)}px, 0)`;
      if (glow) {
        glow.style.transform = `translate3d(${gx.toFixed(2)}px, ${gy.toFixed(2)}px, 0)`;
      }
    };

    raf = requestAnimationFrame(tick);
    window.addEventListener("mousemove", onMove, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <div ref={rootRef} className={`aurora ${className}`} aria-hidden="true">
      <div className="aurora__blob aurora__b1" />
      <div className="aurora__blob aurora__b2" />
      <div className="aurora__blob aurora__b3" />
      <div className="aurora__blob aurora__b4" />
      <div ref={glowRef} className="aurora__cursor" />
    </div>
  );
}
