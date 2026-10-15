"use client";

import { useEffect, useRef } from "react";
import { mountDissolve } from "./dissolve";
import styles from "./hero.module.css";

// Ține conținutul hero-ului pe loc cât derulezi și îl acoperă treptat,
// de jos în sus, cu culoarea fundalului (vezi dissolve.js).
export default function HeroDissolve({ children }) {
  const heroRef = useRef(null);
  const sceneRef = useRef(null);
  const canvasRef = useRef(null);
  const curtainRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    return mountDissolve({
      hero: heroRef.current,
      scene: sceneRef.current,
      canvas: canvasRef.current,
      curtain: curtainRef.current,
    });
  }, []);

  return (
    <section ref={heroRef} className={styles.hero}>
      <div ref={sceneRef} className={styles.scene}>
        {children}
        <canvas ref={canvasRef} aria-hidden="true" className={styles.dissolve} />
        <div ref={curtainRef} aria-hidden="true" hidden className={styles.curtain} />
      </div>
    </section>
  );
}
