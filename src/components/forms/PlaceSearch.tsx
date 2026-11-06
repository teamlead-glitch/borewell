"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Loader2, MapPin, Search, X } from "lucide-react";
import { MAPS_CONFIG } from "@/constants/config";
import { cn } from "@/utils/cn";

/* Search box above the Google map: type a place, address, landmark or area, pick a
   suggestion, and the map moves there with the pin dropped. Google Places (New) autocomplete,
   Kerala results first. Only used once the Maps script has loaded. */

export type FoundPlace = { name: string; lat: number; lng: number; viewport: google.maps.LatLngBounds | null };

type Suggestion = { id: string; main: string; secondary: string; prediction: google.maps.places.PlacePrediction };
type Status = "idle" | "loading" | "empty" | "error";

const MESSAGES: Record<"empty" | "error" | "pickFailed", string> = {
  empty: "No places found. Try a nearby town, junction or landmark.",
  error: "Search isn't working right now. Move the map and tap your spot instead.",
  pickFailed: "We couldn't open that place. Pick another, or tap your spot on the map.",
};

export default function PlaceSearch({ onPick }: { onPick: (place: FoundPlace) => void }) {
  const id = useId();
  const listId = `${id}-list`;
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const places = useRef<google.maps.PlacesLibrary | null>(null);
  const token = useRef<google.maps.places.AutocompleteSessionToken | null>(null);
  const request = useRef(0);
  const typed = useRef(false); // only search for text the user typed, not a picked name

  // Suggestions for what was typed, after a short pause
  useEffect(() => {
    const text = query.trim();
    if (!typed.current || text.length < MAPS_CONFIG.SEARCH_MIN_CHARS) {
      setSuggestions([]);
      setStatus("idle");
      return;
    }
    const current = ++request.current;
    setStatus("loading");
    const timer = setTimeout(async () => {
      try {
        places.current ??= (await google.maps.importLibrary("places")) as google.maps.PlacesLibrary;
        token.current ??= new places.current.AutocompleteSessionToken();
        const { suggestions: found } = await places.current.AutocompleteSuggestion.fetchAutocompleteSuggestions({
          input: text,
          includedRegionCodes: [MAPS_CONFIG.SEARCH_REGION],
          locationBias: MAPS_CONFIG.SEARCH_BIAS,
          sessionToken: token.current,
        });
        if (current !== request.current) return;
        const list = found.flatMap((s) =>
          s.placePrediction
            ? [{
                id: s.placePrediction.placeId,
                main: s.placePrediction.mainText?.text ?? s.placePrediction.text.text,
                secondary: s.placePrediction.secondaryText?.text ?? "",
                prediction: s.placePrediction,
              }]
            : []
        );
        setSuggestions(list);
        setActive(list.length ? 0 : -1);
        setStatus(list.length ? "idle" : "empty");
        setOpen(true);
      } catch {
        if (current !== request.current) return;
        setSuggestions([]);
        setStatus("error");
        setOpen(true);
      }
    }, MAPS_CONFIG.SEARCH_DELAY_MS);
    return () => clearTimeout(timer);
  }, [query]);

  async function pick(s: Suggestion) {
    typed.current = false;
    request.current++;
    setQuery(s.main);
    setOpen(false);
    setSuggestions([]);
    setStatus("loading");
    setError("");
    try {
      const { place } = await s.prediction.toPlace().fetchFields({ fields: ["location", "viewport", "displayName"] });
      token.current = null; // the session ends with this lookup
      if (!place.location) throw new Error("No location");
      setStatus("idle");
      onPick({ name: s.main, lat: place.location.lat(), lng: place.location.lng(), viewport: place.viewport ?? null });
    } catch {
      setStatus("idle");
      setError(MESSAGES.pickFailed);
    }
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault(); // never submits the form from the search box
      const s = suggestions[active] ?? suggestions[0];
      if (open && s) pick(s);
    } else if (e.key === "ArrowDown" && suggestions.length) {
      e.preventDefault();
      setOpen(true);
      setActive((i) => (i + 1) % suggestions.length);
    } else if (e.key === "ArrowUp" && suggestions.length) {
      e.preventDefault();
      setActive((i) => (i <= 0 ? suggestions.length - 1 : i - 1));
    } else if (e.key === "Escape" && open) {
      e.preventDefault();
      setOpen(false);
    }
  }

  function clear() {
    typed.current = false;
    request.current++;
    setQuery("");
    setSuggestions([]);
    setStatus("idle");
    setError("");
    setOpen(false);
  }

  const message = status === "empty" ? MESSAGES.empty : status === "error" ? MESSAGES.error : "";
  const showList = open && (suggestions.length > 0 || Boolean(message));

  return (
    <div className="relative">
      <label htmlFor={`${id}-input`} className="sr-only">
        Search for your place
      </label>
      <Search size={18} className="pointer-events-none absolute left-3.5 top-[14px] text-stone" aria-hidden="true" />
      <input
        id={`${id}-input`}
        type="text"
        role="combobox"
        aria-expanded={showList}
        aria-controls={listId}
        aria-autocomplete="list"
        aria-activedescendant={open && active >= 0 ? `${id}-opt-${active}` : undefined}
        autoComplete="off"
        enterKeyHint="search"
        className="field-input"
        style={{ paddingLeft: 40, paddingRight: 40 }} // room for the search icon and clear button (.field-input sets padding)
        placeholder="Search place, address, landmark or area"
        value={query}
        onChange={(e) => {
          typed.current = true;
          setError("");
          setQuery(e.target.value);
        }}
        onFocus={() => suggestions.length && setOpen(true)}
        onBlur={() => setOpen(false)}
        onKeyDown={onKeyDown}
      />
      <span className="absolute right-2 top-1/2 -translate-y-1/2">
        {status === "loading" ? (
          <Loader2 size={18} className="mr-1.5 animate-spin text-stone motion-reduce:animate-none" aria-label="Searching" />
        ) : (
          query && (
            <button type="button" onClick={clear} className="grid size-8 place-items-center rounded-full text-stone hover:bg-mist hover:text-basalt" aria-label="Clear search">
              <X size={16} aria-hidden="true" />
            </button>
          )
        )}
      </span>

      <ul
        id={listId}
        role="listbox"
        aria-label="Places"
        className={cn(
          "absolute inset-x-0 top-[calc(100%+6px)] z-30 max-h-[300px] overflow-auto rounded-[var(--radius-field)] border border-line bg-paper py-1.5 shadow-lg",
          !showList && "hidden"
        )}
      >
        {suggestions.map((s, i) => (
          <li
            key={s.id}
            id={`${id}-opt-${i}`}
            role="option"
            aria-selected={i === active}
            className={cn("flex cursor-pointer items-start gap-3 px-3.5 py-2.5", i === active && "bg-aquifer-soft/70")}
            onMouseDown={(e) => e.preventDefault()} // keep focus in the input
            onMouseEnter={() => setActive(i)}
            onClick={() => pick(s)}
          >
            <MapPin size={17} className="mt-0.5 shrink-0 text-aquifer" aria-hidden="true" />
            <span className="min-w-0">
              <span className="block truncate text-[15px] font-semibold">{s.main}</span>
              {s.secondary && <span className="block truncate text-[13px] text-stone">{s.secondary}</span>}
            </span>
          </li>
        ))}
        {message && !suggestions.length && <li className="px-3.5 py-2.5 text-[14px] text-stone">{message}</li>}
      </ul>

      {error && (
        <p role="alert" className="mt-1.5 text-[13px] font-medium text-laterite">
          {error}
        </p>
      )}
    </div>
  );
}
