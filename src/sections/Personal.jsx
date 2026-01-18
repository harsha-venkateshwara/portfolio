import React, { useEffect, useMemo, useRef, useState } from "react";
import Globe from "react-globe.gl";

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
        desc: "Driven by curiosity, I explore new possibilities across the globe embracing fresh experiences and learning from diverse perspectives.",
      },
      {
        key: "photo",
        icon: "📸",
        title: "Photography",
        desc: "I love wandering new cities on foot and uncovering hidden spots. Here are a few shots I captured during my time in New York.",
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

    const t = setInterval(() => {
      setIdx((p) => (p + 1) % total);
    }, 3500);

    return () => clearInterval(t);
  }, [active, playing, total]);

  useEffect(() => {
    setIdx((p) => Math.min(p, Math.max(0, total - 1)));
  }, [total]);

  useEffect(() => {
    if (active !== "photo") return;

    const onKey = (e) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
      if (e.key === " ") setPlaying((s) => !s);
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, total]);

  const isActive = (k) => active === k;

  const globeWrapRef = useRef(null);
  const globeRef = useRef(null);
  const [globeSize, setGlobeSize] = useState({ w: 0, h: 0 });
  const [globeReady, setGlobeReady] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const update = () => setIsDark(document.documentElement.classList.contains("dark"));
    update();

    const mo = new MutationObserver(update);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    return () => mo.disconnect();
  }, []);

  useEffect(() => {
    if (active !== "travel") return;
    if (!globeWrapRef.current) return;

    const el = globeWrapRef.current;

    const ro = new ResizeObserver(() => {
      const rect = el.getBoundingClientRect();
      const w = Math.max(0, Math.floor(rect.width));
      const h = Math.max(0, Math.floor(rect.height));
      setGlobeSize({ w, h });
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
      { label: "New York, USA", lat: 40.7128, lng: -74.006, group: "USA", color: "#3b82f6" },
      { label: "Buffalo, USA", lat: 42.8864, lng: -78.8784, group: "USA", color: "#3b82f6" },
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
    setGlobeReady(true);
  }, [active]);

  const globeImageUrl = "//unpkg.com/three-globe/example/img/earth-blue-marble.jpg";
  const bgImageUrl = isDark
    ? "//unpkg.com/three-globe/example/img/night-sky.png"
    : "//unpkg.com/three-globe/example/img/sky.png";

  return (
    <section id="personal" className="py-24 bg-[color:var(--bg)]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="text-4xl sm:text-5xl font-bold text-[color:var(--text)] mb-4">
            Personal
          </h2>
          <p className="text-lg text-[color:var(--muted)] max-w-2xl mx-auto">
            Beyond the professional realm — my interests and personal pursuits
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-semibold text-[color:var(--text)] text-center mb-8">
              Interests &amp; Hobbies
            </h3>

            <div className="max-w-sm mx-auto w-full flex flex-col space-y-5">
              {interests.map((it) => {
                const selected = isActive(it.key);
                return (
                  <button
                    key={it.key}
                    type="button"
                    onClick={() => setActive(it.key)}
                    className={[
                      "w-full text-left p-5 rounded-2xl border",
                      "transition-all duration-300 hover:-translate-y-1 hover:shadow-xl",
                      selected
                        ? "border-blue-500/40 bg-blue-500/10 shadow-lg shadow-black/10"
                        : "border-[color:var(--border)] bg-[color:var(--card)] hover:brightness-105",
                    ].join(" ")}
                  >
                    <div className="flex items-start gap-4">
                      <div className="text-2xl shrink-0 mt-0.5">{it.icon}</div>
                      <div>
                        <h4
                          className={[
                            "text-lg font-semibold mb-2",
                            selected ? "text-blue-600 dark:text-blue-200" : "text-[color:var(--text)]",
                          ].join(" ")}
                        >
                          {it.title}
                        </h4>
                        <p
                          className={[
                            "text-sm leading-relaxed",
                            selected ? "text-blue-700/80 dark:text-blue-100/80" : "text-[color:var(--muted)]",
                          ].join(" ")}
                        >
                          {it.desc}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-2">
            {active === "travel" ? (
              <>
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-semibold text-[color:var(--text)]">
                    Places I've traveled to
                  </h3>
                  <p className="mt-2 text-[color:var(--muted)]">
                    Explore the amazing destinations I've visited around the globe
                  </p>
                </div>

                <div className="relative">
                  <div
                    ref={globeWrapRef}
                    className="w-full h-72 sm:h-96 md:h-[500px] rounded-2xl overflow-hidden bg-[color:var(--card)] border border-[color:var(--border)] shadow-lg shadow-black/10"
                  >
                    <div className="w-full h-full flex items-center justify-center">
                      {globeSize.w > 0 && globeSize.h > 0 ? (
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
                        />
                      ) : null}
                    </div>

                    <div className="absolute bottom-4 right-4 rounded-xl border border-[color:var(--border)] bg-[color:var(--card)]/90 backdrop-blur p-3 text-xs text-[color:var(--text)] max-w-xs">
                      <p className="mb-2">🌍 Drag to explore • Click pins for details</p>
                      <div className="flex flex-wrap gap-3">
                        <span className="inline-flex items-center gap-2">
                          <span className="h-2 w-2 rounded-full bg-blue-500" /> USA
                        </span>
                        <span className="inline-flex items-center gap-2">
                          <span className="h-2 w-2 rounded-full bg-purple-500" /> Asia
                        </span>
                      </div>
                    </div>
                  </div>

                  {!globeReady ? (
                    <div className="mt-3 text-center text-xs text-[color:var(--muted)]">
                      Loading globe…
                    </div>
                  ) : null}
                </div>
              </>
            ) : null}

            {active === "photo" ? (
              <>
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-semibold text-[color:var(--text)]">Photography</h3>
                  <p className="mt-2 text-[color:var(--muted)]">
                    A collection of moments and landscapes captured through my lens
                  </p>
                </div>

                <div className="relative">
                  <div className="w-full h-72 sm:h-96 md:h-[500px] rounded-2xl overflow-hidden bg-[color:var(--card)] border border-[color:var(--border)] shadow-lg shadow-black/10">
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
                      className="absolute top-4 right-4 h-10 w-10 rounded-full bg-black/45 hover:bg-black/60 border border-white/10 grid place-items-center text-white/90 transition"
                      aria-label={playing ? "Pause slideshow" : "Play slideshow"}
                      title={playing ? "Pause" : "Play"}
                    >
                      {playing ? <span className="text-sm font-semibold">II</span> : <span className="text-sm font-semibold">▶</span>}
                    </button>

                    <button
                      type="button"
                      onClick={prev}
                      className="absolute left-4 top-1/2 -translate-y-1/2 h-11 w-11 rounded-full bg-black/45 hover:bg-black/60 border border-white/10 grid place-items-center text-white/90 transition"
                      aria-label="Previous image"
                    >
                      <span className="text-2xl leading-none">‹</span>
                    </button>

                    <button
                      type="button"
                      onClick={next}
                      className="absolute right-4 top-1/2 -translate-y-1/2 h-11 w-11 rounded-full bg-black/45 hover:bg-black/60 border border-white/10 grid place-items-center text-white/90 transition"
                      aria-label="Next image"
                    >
                      <span className="text-2xl leading-none">›</span>
                    </button>

                    <div className="absolute left-4 bottom-4 rounded-full bg-black/45 border border-white/10 px-3 py-1 text-xs text-white/90">
                      {idx + 1}/{total}
                    </div>
                  </div>

                  <div className="mt-5 flex justify-center gap-3 flex-wrap">
                    {photos.map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setIdx(i)}
                        className={[
                          "h-3 w-3 rounded-full transition",
                          i === idx ? "bg-blue-500" : "bg-black/15 dark:bg-white/15 hover:bg-black/25 dark:hover:bg-white/30",
                        ].join(" ")}
                        aria-label={`Go to image ${i + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
