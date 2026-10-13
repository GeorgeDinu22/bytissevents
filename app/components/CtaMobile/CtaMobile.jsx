"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import ContactForm from "../ContactForm/ContactForm";
import Seal from "../CtaFinal/Seal";
import { DESKTOP_MIN_WIDTH } from "../CtaFinal/breakpoint";
import shared from "../CtaFinal/ctaFinal.module.css";
import envelope from "../CtaFinal/envelope.module.css";
import SectionHeading from "../SectionHeading/SectionHeading";
import styles from "./ctaMobile.module.css";

const smooth = [0.22, 1, 0.36, 1];

// Fazele animației. Formularul e un singur element pe tot parcursul:
// closed (stă micșorat în plic) → opening (clapa se ridică, formularul iese
// din plic) → open (zboară în centrul ecranului și crește la mărimea reală)
// → returning (se întoarce deasupra plicului) → closing (coboară în plic)
// → closed (clapa se închide).
const NEXT_PHASE = { opening: "open", returning: "closing", closing: "closed" };

// Unde stă formularul în plic, ca fracțiuni din dimensiunile plicului.
const SLOT_TOP = 0.12;
const SLOT_WIDTH = 0.84;
const SLOT_HEIGHT = 0.8;

const flapVariants = {
  closed: { rotateX: 0, transition: { duration: 0.5, ease: "easeInOut" } },
  open: { rotateX: 180, transition: { duration: 0.5, ease: "easeInOut" } },
};

export default function CtaMobile() {
  const [active, setActive] = useState(false);
  const [phase, setPhase] = useState("closed");
  // Cât e micșorat formularul ca să încapă în plic și cât urcă până iese de tot.
  const [fit, setFit] = useState({ scale: 0.5, rise: -400 });
  // Deplasarea de la plic până în centrul ecranului, calculată la click.
  const [target, setTarget] = useState({ x: 0, y: 0 });
  const envelopeRef = useRef(null);
  const letterRef = useRef(null);
  const firstFieldRef = useRef(null);
  const sealRef = useRef(null);

  const isClosed = phase === "closed";
  const isOpen = phase === "open";

  function measureFit() {
    const env = envelopeRef.current;
    const letter = letterRef.current;
    if (!env || !letter) return;

    const scale = Math.min(
      (SLOT_WIDTH * env.offsetWidth) / letter.offsetWidth,
      (SLOT_HEIGHT * env.offsetHeight) / letter.offsetHeight,
    );
    const rise = -(SLOT_TOP * env.offsetHeight + letter.offsetHeight * scale + 12);
    setFit({ scale, rise });
  }

  // Varianta de mobil se afișează doar sub 800px.
  useEffect(() => {
    function onResize() {
      setActive(window.innerWidth < DESKTOP_MIN_WIDTH);
      measureFit();
    }

    const frame = requestAnimationFrame(onResize);
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  // Imediat ce varianta apare pe ecran, potrivim formularul în plic.
  useEffect(() => {
    if (!active) return;
    const frame = requestAnimationFrame(measureFit);
    return () => cancelAnimationFrame(frame);
  }, [active]);

  // Pagina nu derulează cât timp plicul e deschis.
  useEffect(() => {
    if (isClosed || !active) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isClosed, active]);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event) => {
      if (event.key === "Escape") setPhase("returning");
    };
    document.addEventListener("keydown", onKeyDown);
    firstFieldRef.current?.focus({ preventScroll: true });
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  if (!active) return null;

  function open() {
    measureFit();

    const rect = envelopeRef.current.getBoundingClientRect();
    const letterTop = rect.top + SLOT_TOP * rect.height;
    const centeredTop = Math.max(
      16,
      (window.innerHeight - letterRef.current.offsetHeight) / 2,
    );

    setTarget({
      x: document.documentElement.clientWidth / 2 - (rect.left + rect.width / 2),
      y: centeredTop - letterTop,
    });
    setPhase("opening");
  }

  function handlePhaseDone() {
    const next = NEXT_PHASE[phase];
    if (!next) return;
    setPhase(next);
    if (next === "closed") sealRef.current?.focus({ preventScroll: true });
  }

  const inEnvelope = { x: 0, y: 0, scale: fit.scale };
  const aboveEnvelope = { x: 0, y: fit.rise, scale: fit.scale };
  const letterAnimate = {
    closed: { ...inEnvelope, transition: { duration: 0 } },
    opening: {
      ...aboveEnvelope,
      transition: { delay: 0.25, duration: 0.55, ease: smooth },
    },
    open: {
      ...target,
      scale: 1,
      transition: { type: "spring", duration: 0.7, bounce: 0.12 },
    },
    returning: {
      ...aboveEnvelope,
      transition: { duration: 0.45, ease: smooth },
    },
    closing: { ...inEnvelope, transition: { duration: 0.4, ease: smooth } },
  }[phase];

  // În centrul ecranului formularul stă peste fundalul întunecat; în rest
  // stă în spatele feței plicului, ca să pară că iese din el.
  const letterOnTop = phase === "open" || phase === "returning";

  return (
    <>
      <SectionHeading
        align="center"
        className={`${styles.heading} ${isClosed ? "" : styles.headingHidden}`}
        title={
          <>
            Ai nevoie de ajutor pentru următorul tău <span>eveniment</span>?
          </>
        }
      />

      <div ref={envelopeRef} className={styles.envelope}>
        <div aria-hidden="true" className={envelope.back} />

        <motion.div
          ref={letterRef}
          role="dialog"
          aria-modal={isOpen}
          aria-labelledby="contact-titlu"
          inert={!isOpen}
          className={`${styles.letter} ${letterOnTop ? styles.letterOnTop : ""}`}
          initial={false}
          animate={letterAnimate}
          onAnimationComplete={handlePhaseDone}
        >
          <ContactForm
            firstFieldRef={firstFieldRef}
            onClose={() => setPhase("returning")}
            onSent={() => setPhase("returning")}
          />
        </motion.div>

        <div aria-hidden="true" className={envelope.front} />

        <motion.div
          aria-hidden="true"
          className={`${envelope.flapShadow} ${isClosed ? "" : envelope.flapOpen}`}
          style={{ transformPerspective: 1400 }}
          initial={false}
          animate={isClosed ? "closed" : "open"}
          variants={flapVariants}
        >
          <div className={envelope.flap} />
        </motion.div>

        <Seal ref={sealRef} hidden={!isClosed} onClick={open} />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={shared.backdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setPhase("returning")}
          />
        )}
      </AnimatePresence>
    </>
  );
}
