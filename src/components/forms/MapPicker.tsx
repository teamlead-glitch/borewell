"use client";

import { useRef, useState } from "react";
import { Crosshair } from "lucide-react";
import { DEFAULT_COORDS } from "@/constants/forms";
import { cn } from "@/utils/cn";
import { MapArt, MapPin } from "@/components/common/MapArt";

/** Where the pin sits in the box (0-1) and the coordinates sent to the API */
export type Pin = { x: number; y: number; lat: number; lng: number; set: boolean };

export const EMPTY_PIN: Pin = { x: 0.5, y: 0.5, ...DEFAULT_COORDS, set: false };

// Span of the placeholder art in degrees, centred on DEFAULT_COORDS
const SPAN = { lat: 0.08, lng: 0.12 };

/*
  PLACEHOLDER (approved design, phase 1): the map is static art and a tap gives coordinates
  around DEFAULT_COORDS. "Use my location" gives the device's real position.
  Replace with Google Maps before launch: the API measures road distance to providers from
  these coordinates.
*/
export default function MapPicker({ value, onChange, hint }: { value: Pin; onChange: (p: Pin) => void; hint: string }) {
  const box = useRef<HTMLDivElement>(null);
  const [locating, setLocating] = useState(false);
  const [geoError, setGeoError] = useState("");

  function placeAt(e: React.MouseEvent) {
    const r = box.current!.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    onChange({
      x,
      y,
      lat: +(DEFAULT_COORDS.lat + (0.5 - y) * SPAN.lat).toFixed(6),
      lng: +(DEFAULT_COORDS.lng + (x - 0.5) * SPAN.lng).toFixed(6),
      set: true,
    });
  }

  function useMyLocation() {
    if (!navigator.geolocation) return setGeoError("Location is not available on this device. Tap the map instead.");
    setGeoError("");
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocating(false);
        onChange({ x: 0.5, y: 0.5, lat: +pos.coords.latitude.toFixed(6), lng: +pos.coords.longitude.toFixed(6), set: true });
      },
      () => {
        setLocating(false);
        setGeoError("We couldn't get your location. Allow location access, or tap the map instead.");
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <div ref={box} className="relative h-[300px] cursor-crosshair overflow-hidden rounded-[var(--radius-card)] border border-line sm:h-[340px]" onClick={placeAt}>
        <MapArt className="absolute inset-0 h-full w-full" />
        <div className="absolute inset-x-3 top-3 flex flex-wrap justify-end gap-2" onClick={(e) => e.stopPropagation()}>
          <button
            type="button"
            onClick={useMyLocation}
            disabled={locating}
            className="inline-flex h-[46px] items-center gap-2 rounded-[var(--radius-field)] border-[1.5px] border-line bg-paper px-4 text-[15px] font-semibold shadow-sm hover:border-basalt disabled:cursor-wait"
          >
            <Crosshair size={16} aria-hidden="true" /> {locating ? "Finding you…" : "Use my location"}
          </button>
        </div>
        <MapPin
          className={cn("pointer-events-none absolute -translate-x-1/2 -translate-y-full transition-all duration-300", !value.set && "opacity-60")}
          style={{ left: `${value.x * 100}%`, top: `${value.y * 100}%` }}
        />
        <span className="absolute bottom-3 left-3 rounded-[var(--radius-chip)] bg-paper px-2.5 py-1 text-[13px] font-medium tabular-nums shadow-sm" aria-live="polite">
          {value.set ? `${value.lat.toFixed(5)}, ${value.lng.toFixed(5)}` : "Tap the map to drop the pin"}
        </span>
      </div>
      {geoError && (
        <p role="alert" className="text-[13px] font-medium text-laterite">
          {geoError}
        </p>
      )}
      <p className="text-[13px] text-stone">{hint}</p>
    </div>
  );
}
