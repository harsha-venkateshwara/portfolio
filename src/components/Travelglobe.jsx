import React, { useEffect, useMemo, useRef, useState } from "react";
import Globe from "react-globe.gl";

export default function TravelGlobe() {
  const globeRef = useRef(null);

  const places = useMemo(
    () => [
      { name: "New York, USA", lat: 40.7128, lng: -74.006, region: "USA" },
      { name: "Buffalo, USA", lat: 42.8864, lng: -78.8784, region: "USA" },
      { name: "Bengaluru, India", lat: 12.9716, lng: 77.5946, region: "South America" },
      { name: "Boston, USA", lat: 42.3601, lng: -71.0589, region: "USA" },
      { name: "Cambridge, USA", lat: 42.3736, lng: -71.1097, region: "USA" },
    ],
    []
  );


  const regionColor = useMemo(
    () => ({
      Peru: "#22c55e",
      USA: "#3b82f6",
      Europe: "#a855f7",
      "South America": "#eab308",
      Caribbean: "#ef4444",
    }),
    []
  );

  const [activePlace, setActivePlace] = useState(null);

  const gData = useMemo(
    () =>
      places.map((p) => ({
        ...p,
        size: 0.6,
        color: regionColor[p.region] || "#60a5fa",
      })),
    [places, regionColor]
  );

  useEffect(() => {
    if (!globeRef.current) return;
    globeRef.current.pointOfView({ lat: 20, lng: 0, altitude: 2.2 }, 0);
  }, []);

  return (
    <div className="relative">
      <div className="w-full h-96 md:h-[500px] rounded-2xl overflow-hidden bg-white/5 border border-white/10 shadow-lg shadow-black/30">
        <Globe
          ref={globeRef}
          width={undefined}
          height={undefined}
          backgroundColor="rgba(0,0,0,0)"
          globeImageUrl="https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
          bumpImageUrl="https://unpkg.com/three-globe/example/img/earth-topology.png"
          pointsData={gData}
          pointLat="lat"
          pointLng="lng"
          pointColor="color"
          pointAltitude={() => 0.02}
          pointRadius={() => 0.18}
          pointsMerge={true}
          onPointClick={(p) => {
            setActivePlace(p);
            globeRef.current?.pointOfView(
              { lat: p.lat, lng: p.lng, altitude: 1.6 },
              900
            );
          }}
          enablePointerInteraction={true}
        />
      </div>

      <div className="absolute bottom-4 right-4 bg-black/40 rounded-xl shadow-lg p-3 border border-white/10 z-20 max-w-xs">
        <p className="text-xs text-white/80 mb-2">
          Drag to explore • Click pins for details
        </p>
        <div className="flex flex-wrap gap-2">
          {Object.entries(regionColor).map(([k, c]) => (
            <div key={k} className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: c }} />
              <span className="text-xs text-white/70">{k}</span>
            </div>
          ))}
        </div>
      </div>

      {activePlace ? (
        <div className="absolute top-4 left-4 bg-black/40 rounded-xl shadow-lg p-3 border border-white/10 z-20">
          <div className="text-sm text-white font-semibold">{activePlace.name}</div>
          <div className="text-xs text-white/70 mt-1">{activePlace.region}</div>
        </div>
      ) : null}
    </div>
  );
}
