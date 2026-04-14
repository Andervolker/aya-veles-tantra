"use client";

import { useEffect } from "react";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    let currentY = window.scrollY;
    let targetY = window.scrollY;
    let rafId: number;
    let isRunning = false;

    const ease = (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t));

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    function loop() {
      const diff = targetY - currentY;

      if (Math.abs(diff) < 0.1) {
        currentY = targetY;
        isRunning = false;
        return;
      }

      currentY = lerp(currentY, targetY, 0.085);
      window.scrollTo(0, currentY);
      rafId = requestAnimationFrame(loop);
    }

    function onWheel(e: WheelEvent) {
      e.preventDefault();
      const speed = 1.2;
      targetY = Math.max(
        0,
        Math.min(
          document.documentElement.scrollHeight - window.innerHeight,
          targetY + e.deltaY * speed
        )
      );
      if (!isRunning) {
        isRunning = true;
        rafId = requestAnimationFrame(loop);
      }
    }

    window.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", onWheel);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return <>{children}</>;
}
