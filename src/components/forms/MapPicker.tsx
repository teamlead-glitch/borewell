"use client";

import { useEffect, useRef, useState } from "react";
import { Crosshair } from "lucide-react";
import { MAPS_CONFIG } from "@/constants/config";
import { DEFAULT_COORDS } from "@/constants/forms";
import { loadGoogleMaps, onMapsAuthFailure } from "@/lib/google-maps";
import { cn } from "@/utils/cn";
import { MapArt, MapPin } from "@/components/common/MapArt";

/** Where the pin sits in the placeholder box (0-1) and the coordinates sent to the API */
export type Pin = { x: number; y: number; lat: number; lng: number; set: boolean };

export const EMPTY_PIN: Pin = { x: 0.5, y: 0.5, ...DEFAULT_COORDS, set: false };

type Props = { value: Pin; onChange: (p: Pin) => void; hint: string };

const round = (n: number) => +n.toFixed(6);
const pinAt = (lat: number, lng: number): Pin => ({ x: 0.5, y: 0.5, lat: round(lat), lng: round(lng), set: true });

/*
  Google Maps when NEXT_PUBLIC_GOOGLE_MAPS_API_KEY is set: tap to drop the pin, drag to adjust.
  Without a key, or if Google refuses it, the placeholder art from the approved design is shown.
  The API measures road distance to providers from these coordinates.
*/
export default function MapPicker(props: Props) {
  const [google, setGoogle] = useState(Boolean(MAPS_CONFIG.API_KEY));
  return google ? <GoogleMapPicker {...props} onFail={() => setGoogle(false)} /> : <PlaceholderMapPicker {...props} />;
}

/* ---------- "Use my location" (both maps) ---------- */
function useMyLocation(onFound: (p: Pin) => void) {
  const [locating, setLocating] = useState(false);
  const [geoError, setGeoError] = useState("");

  function locate() {
    if (!navigator.geolocation) return setGeoError("Location is not available on this device. Tap the map instead.");
    setGeoError("");
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocating(false);
        onFound(pinAt(pos.coords.latitude, pos.coords.longitude));
      },
      () => {
        setLocating(false);
        setGeoError("We couldn't get your location. Allow location access, or tap the map instead.");
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }
  return { locate, locating, geoError };
}

function LocateButton({ onClick, locating }: { onClick: () => void; locating: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={locating}
      className="inline-flex h-[46px] items-center gap-2 rounded-[var(--radius-field)] border-[1.5px] border-line bg-paper px-4 text-[15px] font-semibold shadow-sm hover:border-basalt disabled:cursor-wait"
    >
      <Crosshair size={16} aria-hidden="true" /> {locating ? "Finding you…" : "Use my location"}
    </button>
  );
}

function GeoError({ message }: { message: string }) {
  if (!message) return null;
  return (
    <p role="alert" className="text-[13px] font-medium text-laterite">
      {message}
    </p>
  );
}

/* ---------- Google Maps ---------- */
function GoogleMapPicker({ value, onChange, hint, onFail }: Props & { onFail: () => void }) {
  const box = useRef<HTMLDivElement>(null);
  const map = useRef<google.maps.Map | null>(null);
  const marker = useRef<google.maps.marker.AdvancedMarkerElement | null>(null);
  const [ready, setReady] = useState(false);
  // Latest callbacks for the map listeners (set up once)
  const latest = useRef({ onChange, onFail, value });
  useEffect(() => {
    latest.current = { onChange, onFail, value };
  });

  const geo = useMyLocation((p) => {
    onChange(p);
    map.current?.panTo({ lat: p.lat, lng: p.lng });
    map.current?.setZoom(18);
  });

  // Create the map once
  useEffect(() => {
    let cancelled = false;
    const stopAuth = onMapsAuthFailure(() => latest.current.onFail());

    loadGoogleMaps()
      .then(async () => {
        const { Map } = (await google.maps.importLibrary("maps")) as google.maps.MapsLibrary;
        const { AdvancedMarkerElement } = (await google.maps.importLibrary("marker")) as google.maps.MarkerLibrary;
        if (cancelled || !box.current) return;

        const start = latest.current.value;
        map.current = new Map(box.current, {
          center: { lat: start.lat, lng: start.lng },
          zoom: start.set ? 17 : 12,
          mapId: MAPS_CONFIG.MAP_ID,
          gestureHandling: "cooperative", // page still scrolls on phones; two fingers move the map
          clickableIcons: false,
          streetViewControl: false,
          fullscreenControl: false,
          mapTypeControl: true,
          mapTypeControlOptions: { mapTypeIds: ["roadmap", "hybrid"] }, // satellite helps find the exact spot
        });
        marker.current = new AdvancedMarkerElement({
          map: start.set ? map.current : null,
          position: { lat: start.lat, lng: start.lng },
          gmpDraggable: true,
          title: "Drag to adjust the pin",
        });

        map.current.addListener("click", (e: google.maps.MapMouseEvent) => {
          if (e.latLng) latest.current.onChange(pinAt(e.latLng.lat(), e.latLng.lng()));
        });
        marker.current.addEventListener("gmp-dragend", () => {
          const pos = marker.current?.position;
          if (!pos) return;
          const { lat, lng } = pos instanceof google.maps.LatLng ? pos.toJSON() : (pos as google.maps.LatLngLiteral);
          latest.current.onChange(pinAt(lat, lng));
        });
        setReady(true);
      })
      .catch(() => {
        if (!cancelled) latest.current.onFail();
      });

    return () => {
      cancelled = true;
      stopAuth();
    };
  }, []);

  // Keep the marker on the chosen spot
  useEffect(() => {
    if (!ready || !marker.current || !map.current) return;
    marker.current.position = { lat: value.lat, lng: value.lng };
    marker.current.map = value.set ? map.current : null;
  }, [ready, value.lat, value.lng, value.set]);

  return (
    <div className="flex flex-col gap-2">
      <div className="relative h-[300px] overflow-hidden rounded-[var(--radius-card)] border border-line bg-mist sm:h-[340px]">
        <div ref={box} className="absolute inset-0" aria-label="Map: tap to drop the pin" />
        {!ready && <span className="absolute inset-0 grid place-items-center text-[14px] text-stone">Loading map…</span>}
        <div className="absolute right-3 top-3">
          <LocateButton onClick={geo.locate} locating={geo.locating} />
        </div>
      </div>
      <p className="text-[13px] font-medium tabular-nums text-basalt" aria-live="polite">
        {value.set ? `Pinned at ${value.lat.toFixed(5)}, ${value.lng.toFixed(5)}. Drag the pin to adjust.` : "Tap the map to drop the pin."}
      </p>
      <GeoError message={geo.geoError} />
      <p className="text-[13px] text-stone">{hint}</p>
    </div>
  );
}

/* ---------- Placeholder (no key): approved-design art ---------- */

// Span of the placeholder art in degrees, centred on DEFAULT_COORDS
const SPAN = { lat: 0.08, lng: 0.12 };

function PlaceholderMapPicker({ value, onChange, hint }: Props) {
  const box = useRef<HTMLDivElement>(null);
  const geo = useMyLocation(onChange);

  function placeAt(e: React.MouseEvent) {
    const r = box.current!.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    onChange({ ...pinAt(DEFAULT_COORDS.lat + (0.5 - y) * SPAN.lat, DEFAULT_COORDS.lng + (x - 0.5) * SPAN.lng), x, y });
  }

  return (
    <div className="flex flex-col gap-2">
      <div ref={box} className="relative h-[300px] cursor-crosshair overflow-hidden rounded-[var(--radius-card)] border border-line sm:h-[340px]" onClick={placeAt}>
        <MapArt className="absolute inset-0 h-full w-full" />
        <div className="absolute inset-x-3 top-3 flex flex-wrap justify-end gap-2" onClick={(e) => e.stopPropagation()}>
          <LocateButton onClick={geo.locate} locating={geo.locating} />
        </div>
        <MapPin
          className={cn("pointer-events-none absolute -translate-x-1/2 -translate-y-full transition-all duration-300", !value.set && "opacity-60")}
          style={{ left: `${value.x * 100}%`, top: `${value.y * 100}%` }}
        />
        <span className="absolute bottom-3 left-3 rounded-[var(--radius-chip)] bg-paper px-2.5 py-1 text-[13px] font-medium tabular-nums shadow-sm" aria-live="polite">
          {value.set ? `${value.lat.toFixed(5)}, ${value.lng.toFixed(5)}` : "Tap the map to drop the pin"}
        </span>
      </div>
      <GeoError message={geo.geoError} />
      <p className="text-[13px] text-stone">{hint}</p>
    </div>
  );
}
