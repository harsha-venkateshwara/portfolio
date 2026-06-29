import React, { lazy, Suspense, useEffect, useMemo, useRef, useState } from "react";
import SectionHeader from "../components/SectionHeader";

// Heavy (pulls in three.js). Code-split so it never blocks first paint, and is
// only fetched/mounted once the Personal section is near the viewport.
const Globe = lazy(() => import("react-globe.gl"));

export default function Personal() {
  const photos = useMemo(
    () => [
      "/images/photography/01.jpeg",
      "/images/photography/02.jpeg",
      "/images/photography/03.jpeg",
      "/images/photography/04.jpeg",
      "/images/photography/05.jpeg",
      "/images/photography/06.jpeg",
      "/images/photography/07.jpeg",
      "/images/photography/08.jpeg",
      "/images/photography/pic.jpeg",
      "/images/photography/pic2.jpeg",
    ],
    []
  );

  const interests = useMemo(
    () => [
      {
        key: "travel",
        icon: "✈️",
        title: "Traveling",
        desc: "Driven by curiosity, I explore new possibilities across the globe, embracing fresh experiences and learning from diverse perspectives.",
      },
      {
        key: "photo",
        icon: "📸",
        title: "Photography",
        desc: "Wandering new cities on foot and uncovering hidden spots. A few shots from my time in New York.",
      },
    ],
    []
  );

  const [active, setActive] = useState("travel");
  const [idx, setIdx] = useState(0);
  const [playing, setPlaying] = useState(true);
  const total = photos.length;

  const prev = () => setIdx((p) => (p - 1 + total) % total);
  const next = () => setIdx((p) => (p + 1) % total);

  useEffect(() => {
    if (active !== "photo") return;
    if (!playing) return;
    if (total <= 1) return;
    const t = setInterval(() => setIdx((p) => (p + 1) % total), 3500);
    return () => clearInterval(t);
  }, [active, playing, total]);

  useEffect(() => {
    if (active !== "photo") return;
    const onKey = (e) => {
      if (e.key === "ArrowLeft") setIdx((p) => (p - 1 + total) % total);
      if (e.key === "ArrowRight") setIdx((p) => (p + 1) % total);
      if (e.key === " ") setPlaying((s) => !s);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, total]);

  const isActive = (k) => active === k;

  const globeWrapRef = useRef(null);
  const globeRef = useRef(null);
  const sectionRef = useRef(null);
  const [globeSize, setGlobeSize] = useState({ w: 0, h: 0 });
  const [globeReady, setGlobeReady] = useState(false);
  const [inView, setInView] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const update = () => setIsDark(document.documentElement.classList.contains("dark"));
    update();
    const mo = new MutationObserver(update);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => mo.disconnect();
  }, []);

  // Defer mounting the globe (and fetching the three.js chunk) until the
  // section is approaching the viewport.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin: "300px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (active !== "travel") return;
    if (!globeWrapRef.current) return;
    const el = globeWrapRef.current;
    const ro = new ResizeObserver(() => {
      const rect = el.getBoundingClientRect();
      setGlobeSize({
        w: Math.max(0, Math.floor(rect.width)),
        h: Math.max(0, Math.floor(rect.height)),
      });
    });
    ro.observe(el);
    const rect = el.getBoundingClientRect();
    setGlobeSize({
      w: Math.max(0, Math.floor(rect.width)),
      h: Math.max(0, Math.floor(rect.height)),
    });
    return () => ro.disconnect();
  }, [active]);

  const travelPins = useMemo(
    () => [
      { label: "New York, USA", lat: 40.7128, lng: -74.006, group: "USA", color: "#60a5fa" },
      { label: "Buffalo, USA", lat: 42.8864, lng: -78.8784, group: "USA", color: "#60a5fa" },
      { label: "Bengaluru, India", lat: 12.9716, lng: 77.5946, group: "Asia", color: "#a855f7" },
      { label: "Goa, India", lat: 15.2993, lng: 74.124, group: "Asia", color: "#a855f7" },
    ],
    []
  );

  useEffect(() => {
    if (active !== "travel") return;
    if (!globeRef.current) return;
    const controls = globeRef.current.controls?.();
    if (controls) {
      controls.enableDamping = true;
      controls.dampingFactor = 0.08;
      controls.rotateSpeed = 0.4;
      controls.zoomSpeed = 0.7;
    }
    globeRef.current.pointOfView({ lat: 20, lng: -40, altitude: 2.2 }, 0);
  }, [active]);

  const globeImageUrl = "//unpkg.com/three-globe/example/img/earth-blue-marble.jpg";
  const bgImageUrl = isDark
    ? "//unpkg.com/three-globe/example/img/night-sky.png"
    : "//unpkg.com/three-globe/example/img/sky.png";

  return (
    <section ref={sectionRef} id="personal" className="py-24 lg:py-32 bg-[color:var(--bg)]">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeader
          index="06"
          label="personal"
          title="Beyond the work: places I've been, things I've seen."
          subtitle="The human layer. Travel maps and a small photo set from streets I've walked."
        />

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4">
            <div className="font-mono text-[12px] uppercase tracking-[0.18em] text-[color:var(--subtle)] mb-5">
              / interests &amp; hobbies
            </div>
            <div className="flex flex-col gap-3">
              {interests.map((it) => {
                const selected = isActive(it.key);
                return (
                  <button
                    key={it.key}
                    type="button"
                    onClick={() => setActive(it.key)}
                    aria-pressed={selected}
                    className={[
                      "w-full text-left p-6 rounded-2xl border transition-all duration-300",
                      selected
                        ? "border-[color:var(--accent)]/40 bg-[color:var(--accent-soft)] shadow-lg shadow-black/10"
                        : "border-[color:var(--border)] bg-[color:var(--surface)] hover:border-[color:var(--border-strong)] hover:-translate-y-0.5",
                    ].join(" ")}
                  >
                    <div className="flex items-start gap-4">
                      <div className="text-3xl shrink-0 mt-0.5">{it.icon}</div>
                      <div>
                        <h4
                          className={[
                            "font-display text-xl font-semibold mb-2",
                            selected ? "text-[color:var(--accent-text)]" : "text-[color:var(--text)]",
                          ].join(" ")}
                        >
                          {it.title}
                        </h4>
                        <p className="text-[15px] leading-relaxed text-[color:var(--muted)]">{it.desc}</p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-8">
            {active === "travel" ? (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="font-display text-2xl sm:text-3xl font-bold text-[color:var(--text)] tracking-tight">
                      Places I&apos;ve been
                    </h3>
                    <p className="mt-2 text-base text-[color:var(--muted)]">
                      Drag to explore · click pins for details.
                    </p>
                  </div>
                  <span className="font-mono text-[12px] uppercase tracking-[0.18em] text-[color:var(--subtle)]">
                    {travelPins.length} pins
                  </span>
                </div>

                <div className="relative">
                  <div
                    ref={globeWrapRef}
                    className="w-full h-80 sm:h-96 md:h-[520px] rounded-2xl overflow-hidden bg-[color:var(--surface)] border border-[color:var(--border)] shadow-xl shadow-black/20"
                  >
                    <div className="w-full h-full flex items-center justify-center">
                      {inView && globeSize.w > 0 && globeSize.h > 0 ? (
                        <Suspense fallback={null}>
                          <Globe
                            ref={globeRef}
                            width={globeSize.w}
                            height={globeSize.h}
                            backgroundColor="rgba(0,0,0,0)"
                            globeImageUrl={globeImageUrl}
                            backgroundImageUrl={bgImageUrl}
                            pointsData={travelPins}
                            pointLat="lat"
                            pointLng="lng"
                            pointColor="color"
                            pointAltitude={0.02}
                            pointRadius={0.35}
                            pointLabel={(d) => d.label}
                            onGlobeReady={() => setGlobeReady(true)}
                          />
                        </Suspense>
                      ) : null}
                    </div>

                    <div className="absolute bottom-4 right-4 rounded-xl border border-[color:var(--border)] bg-[color:var(--surface)]/90 backdrop-blur p-3 text-xs text-[color:var(--text)] max-w-xs">
                      <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--subtle)] mb-2">
                        Legend
                      </div>
                      <div className="flex flex-wrap gap-3">
                        <span className="inline-flex items-center gap-2">
                          <span className="h-2 w-2 rounded-full bg-blue-400" /> USA
                        </span>
                        <span className="inline-flex items-center gap-2">
                          <span className="h-2 w-2 rounded-full bg-purple-400" /> Asia
                        </span>
                      </div>
                    </div>
                  </div>
                  {!globeReady ? (
                    <div className="mt-3 text-center font-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--subtle)]">
                      Loading globe…
                    </div>
                  ) : null}
                </div>
              </div>
            ) : null}

            {active === "photo" ? (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="font-display text-2xl sm:text-3xl font-bold text-[color:var(--text)] tracking-tight">
                      Photography
                    </h3>
                    <p className="mt-2 text-base text-[color:var(--muted)]">
                      Moments and landscapes captured through my lens.
                    </p>
                  </div>
                  <span className="font-mono text-[12px] uppercase tracking-[0.18em] text-[color:var(--subtle)]">
                    {String(idx + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                  </span>
                </div>

                <div className="relative">
                  <div className="w-full h-80 sm:h-96 md:h-[520px] rounded-2xl overflow-hidden bg-[color:var(--surface)] border border-[color:var(--border)] shadow-xl shadow-black/20">
                    <img
                      src={photos[idx]}
                      alt={`Photo ${idx + 1}`}
                      className="h-full w-full object-cover"
                      draggable="false"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />

                    <button
                      type="button"
                      onClick={() => setPlaying((s) => !s)}
                      className="absolute top-4 right-4 grid h-10 w-10 place-items-center rounded-full bg-black/45 hover:bg-black/65 border border-white/15 text-white transition"
                      aria-label={playing ? "Pause slideshow" : "Play slideshow"}
                    >
                      {playing ? (
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" /></svg>
                      ) : (
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7L8 5z" /></svg>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={prev}
                      className="absolute left-4 top-1/2 -translate-y-1/2 grid h-10 w-10 place-items-center rounded-full bg-black/45 hover:bg-black/65 border border-white/15 text-white transition"
                      aria-label="Previous image"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                    </button>

                    <button
                      type="button"
                      onClick={next}
                      className="absolute right-4 top-1/2 -translate-y-1/2 grid h-10 w-10 place-items-center rounded-full bg-black/45 hover:bg-black/65 border border-white/15 text-white transition"
                      aria-label="Next image"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                    </button>

                    <div className="absolute left-4 bottom-4 rounded-full bg-black/45 border border-white/10 px-3 py-1 font-mono text-[11px] text-white/90">
                      {String(idx + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                    </div>
                  </div>

                  <div className="mt-5 flex justify-center items-center gap-1.5 flex-wrap">
                    {photos.map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setIdx(i)}
                        className="p-1.5"
                        aria-label={`Go to image ${i + 1}`}
                      >
                        <span
                          className={[
                            "block h-1.5 rounded-full transition-all duration-300",
                            i === idx
                              ? "w-6 bg-[color:var(--text)]"
                              : "w-2 bg-[color:var(--border-strong)]",
                          ].join(" ")}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
