import { useEffect, useRef } from "react";

/**
 * Living Neural Network — interactive hero background.
 *
 * Nodes drift slowly and link to nearby neighbors. The cursor repels nodes
 * within a radius, links near the cursor ignite indigo -> violet, "signals"
 * periodically fire along edges, and a soft violet halo trails the pointer.
 *
 * Pure 2D canvas (no Three/Vanta). The canvas is pointer-events:none — the
 * pointer is tracked on window so it never blocks the hero's buttons. Honors
 * prefers-reduced-motion (renders a single static frame, no loop) and pauses
 * the animation loop while the hero is scrolled out of view.
 */
export default function NeuralBackground({ className = "" }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    const ctx = canvas.getContext("2d");
    if (!ctx || !parent) return;

    const prefersReduced =
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;

    const isDark = () => document.documentElement.classList.contains("dark");
    const palette = () =>
      isDark()
        ? { line: "255,255,255", base: 0.05, node: "199,210,254", a: "129,140,248", a2: "167,139,250", halo: 0.16 }
        : { line: "10,10,15", base: 0.06, node: "79,70,229", a: "99,102,241", a2: "124,58,237", halo: 0.10 };

    const LINK_DIST = 145;
    const MOUSE_R = 175;
    const mouse = { x: -9999, y: -9999, active: false };

    let width = 0;
    let height = 0;
    let nodes = [];
    let signals = [];
    let lastSignal = 0;
    let raf = 0;
    let prev = 0;
    let running = false;

    function initNodes() {
      const count = Math.max(26, Math.min(92, Math.round((width * height) * 0.00009)));
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.5 + 1,
      }));
      signals = [];
    }

    function resize() {
      const rect = parent.getBoundingClientRect();
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initNodes();
      if (prefersReduced) draw(0);
    }

    function spawnSignal(t) {
      if (prefersReduced || t - lastSignal < 850 || nodes.length < 2) return;
      lastSignal = t;
      const a = nodes[(Math.random() * nodes.length) | 0];
      let b = null;
      let best = Infinity;
      for (const n of nodes) {
        if (n === a) continue;
        const d = Math.hypot(n.x - a.x, n.y - a.y);
        if (d < LINK_DIST && d < best) {
          best = d;
          b = n;
        }
      }
      if (b) signals.push({ a, b, t: 0, dur: 600 + Math.random() * 450 });
    }

    function update(dt) {
      const f = dt / 16;
      for (const n of nodes) {
        n.x += n.vx * f;
        n.y += n.vy * f;
        if (mouse.active) {
          const dx = n.x - mouse.x;
          const dy = n.y - mouse.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < MOUSE_R * MOUSE_R && d2 > 0.01) {
            const d = Math.sqrt(d2);
            const force = (1 - d / MOUSE_R) * 0.9;
            n.x += (dx / d) * force * f;
            n.y += (dy / d) * force * f;
          }
        }
        const m = 40;
        if (n.x < -m) n.x = width + m;
        else if (n.x > width + m) n.x = -m;
        if (n.y < -m) n.y = height + m;
        else if (n.y > height + m) n.y = -m;
      }
      for (const s of signals) s.t += dt;
      signals = signals.filter((s) => s.t < s.dur);
    }

    function proximity(x, y) {
      if (!mouse.active) return 0;
      const d = Math.hypot(x - mouse.x, y - mouse.y);
      return d < MOUSE_R ? 1 - d / MOUSE_R : 0;
    }

    function draw(t) {
      const p = palette();
      ctx.clearRect(0, 0, width, height);

      // Links
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.hypot(dx, dy);
          if (d > LINK_DIST) continue;
          const fade = 1 - d / LINK_DIST;
          const prox = proximity((a.x + b.x) / 2, (a.y + b.y) / 2);
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          if (prox > 0.02) {
            const g = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
            const alpha = (p.base + 0.55 * prox) * fade;
            g.addColorStop(0, `rgba(${p.a}, ${alpha})`);
            g.addColorStop(1, `rgba(${p.a2}, ${alpha})`);
            ctx.strokeStyle = g;
            ctx.lineWidth = 1 + prox;
          } else {
            ctx.strokeStyle = `rgba(${p.line}, ${p.base * fade})`;
            ctx.lineWidth = 1;
          }
          ctx.stroke();
        }
      }

      // Nodes
      for (const n of nodes) {
        const prox = proximity(n.x, n.y);
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r + prox * 1.5, 0, Math.PI * 2);
        ctx.fillStyle =
          prox > 0.02
            ? `rgba(${p.a}, ${0.5 + 0.5 * prox})`
            : `rgba(${p.node}, 0.5)`;
        ctx.fill();
      }

      // Firing signals + pointer halo (additive glow)
      ctx.globalCompositeOperation = "lighter";
      for (const s of signals) {
        const k = s.t / s.dur;
        const x = s.a.x + (s.b.x - s.a.x) * k;
        const y = s.a.y + (s.b.y - s.a.y) * k;
        const alpha = Math.sin(k * Math.PI);
        const g = ctx.createRadialGradient(x, y, 0, x, y, 11);
        g.addColorStop(0, `rgba(${p.a2}, ${0.85 * alpha})`);
        g.addColorStop(1, `rgba(${p.a2}, 0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(x, y, 11, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = `rgba(255,255,255,${0.9 * alpha})`;
        ctx.beginPath();
        ctx.arc(x, y, 2.4, 0, Math.PI * 2);
        ctx.fill();
      }
      if (mouse.active && !prefersReduced) {
        const hr = MOUSE_R * 0.95;
        const g = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, hr);
        g.addColorStop(0, `rgba(${p.a2}, ${p.halo})`);
        g.addColorStop(0.5, `rgba(${p.a}, ${p.halo * 0.45})`);
        g.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, hr, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalCompositeOperation = "source-over";

      spawnSignal(t);
    }

    function frame(t) {
      raf = requestAnimationFrame(frame);
      const dt = Math.min(33, t - prev || 16);
      prev = t;
      update(dt);
      draw(t);
    }

    function start() {
      if (running || prefersReduced) return;
      running = true;
      prev = 0;
      raf = requestAnimationFrame(frame);
    }
    function stop() {
      running = false;
      cancelAnimationFrame(raf);
    }

    function onMove(e) {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    }

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(parent);
    window.addEventListener("mousemove", onMove, { passive: true });

    // Pause when the hero scrolls out of view (perf / battery).
    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? start() : stop()),
      { threshold: 0 }
    );
    io.observe(canvas);

    // Re-render a static frame on theme flip when reduced motion is on.
    const themeObs = new MutationObserver(() => {
      if (prefersReduced) draw(0);
    });
    themeObs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    if (prefersReduced) draw(0);

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      themeObs.disconnect();
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
