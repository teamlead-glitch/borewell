"use client";

import { useEffect, useState } from "react";
import { fetchDistricts, fetchServices } from "@/services/catalog-api";
import type { District } from "@/types/location";
import type { Service } from "@/types/service";

/**
 * Services and districts for the forms. The server page passes them in (in the HTML, no
 * extra request); when the server could not reach the API they are null and are fetched
 * here in the browser instead.
 */
export function useMasters(initialServices: Service[] | null, initialDistricts: District[] | null) {
  const [services, setServices] = useState(initialServices);
  const [districts, setDistricts] = useState(initialDistricts);

  useEffect(() => {
    if (initialServices) return;
    let cancelled = false;
    fetchServices().then((list) => !cancelled && list && setServices(list));
    return () => {
      cancelled = true;
    };
  }, [initialServices]);

  useEffect(() => {
    if (initialDistricts) return;
    let cancelled = false;
    fetchDistricts().then((list) => !cancelled && list && setDistricts(list));
    return () => {
      cancelled = true;
    };
  }, [initialDistricts]);

  return { services, districts };
}
