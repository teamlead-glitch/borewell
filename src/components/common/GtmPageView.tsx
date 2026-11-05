"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { pushToDataLayer } from "@/lib/gtm";

/** Tells GTM about client-side page changes (the first view is counted by GTM itself) */
export default function GtmPageView() {
  const pathname = usePathname();
  const first = useRef(true);
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    pushToDataLayer({ event: "page_path_change", page_path: pathname, page_location: window.location.href, page_title: document.title });
  }, [pathname]);
  return null;
}
