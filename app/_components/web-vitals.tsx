"use client";

import { useReportWebVitals } from "next/web-vitals";

export default function WebVitals() {
  useReportWebVitals((metric) => {
    const isPoor = metric.rating === "poor";
    const log = isPoor ? console.warn : console.log;
    log(`[web-vitals] ${metric.name}`, {
      value: metric.value,
      rating: metric.rating,
      id: metric.id,
    });
  });

  return null;
}
