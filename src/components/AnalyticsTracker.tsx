"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { trackPageView } from "@/lib/analytics";
import { gtagSectionView } from "@/lib/gtag";
import { fbqViewContent } from "@/lib/meta-pixel";

const TRACKED_SECTIONS = [
  "services",
  "products",
  "about",
  "podcast",
  "cases",
  "calculator",
  "testimonials",
  "contact",
];

export default function AnalyticsTracker() {
  const pathname = usePathname();
  const viewedSections = useRef(new Set<string>());

  // Page view tracking
  useEffect(() => {
    if (!pathname.startsWith("/admin")) {
      trackPageView(pathname);
    }
  }, [pathname]);

  // Section visibility tracking via IntersectionObserver
  useEffect(() => {
    if (pathname.startsWith("/admin")) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            if (id && !viewedSections.current.has(id)) {
              viewedSections.current.add(id);
              gtagSectionView(id);
              fbqViewContent(id, "section");
            }
          }
        }
      },
      { threshold: 0.3 }
    );

    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      for (const sectionId of TRACKED_SECTIONS) {
        const el = document.getElementById(sectionId);
        if (el) observer.observe(el);
      }
    }, 500);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [pathname]);

  return null;
}
