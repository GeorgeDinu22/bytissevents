"use client";

import { useEffect, useState } from "react";

// Întoarce true când utilizatorul derulează în jos și false când derulează
// în sus. Mișcările mai mici decât `threshold` (px) sunt ignorate.
export default function useHideOnScroll(threshold = 4) {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;

    function onScroll() {
      const y = window.scrollY;
      const delta = y - lastY;

      if (y <= 0) {
        setHidden(false);
        lastY = y;
        return;
      }

      if (Math.abs(delta) < threshold) return;

      setHidden(delta > 0);
      lastY = y;
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return hidden;
}
