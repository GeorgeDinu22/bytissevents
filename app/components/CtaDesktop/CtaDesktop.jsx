"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import ContactForm from "../ContactForm/ContactForm";
import Seal from "../CtaFinal/Seal";
import { DESKTOP_MIN_WIDTH } from "../CtaFinal/breakpoint";
import shared from "../CtaFinal/ctaFinal.module.css";
import envelope from "../CtaFinal/envelope.module.css";
import SectionHeading from "../SectionHeading/SectionHeading";
import styles from "./ctaDesktop.module.css";

const smooth = [0.22, 1, 0.36, 1];

// Cât din formular rămâne băgat în plic când e deschis (px) și distanța
// lui față de marginea de jos a plicului când e închis (ca în CSS).
const TUCK = 28;
const LETTER_BOTTOM = 8;

// Fazele animației. Pe desktop nimic nu zboară separat: plicul întreg vine
// în centrul ecranului, iar formularul doar alunecă în sus din el.
// closed → opening (plicul se centrează, clapa se ridică, formularul urcă)
// → open → closing (formularul coboară în plic)
// → settling (clapa se închide, plicul se întoarce la loc) → closed.
const flapVariants = {
  closed: { rotateX: 0, transition: { duration: 0.5, ease: "easeInOut" } },
  open: { rotateX: 180, transition: { duration: 0.5, ease: "easeInOut" } },
};

export default function CtaDesktop() {
  const [active, setActive] = useState(false);
  const [phase, setPhase] = useState("closed");
  // Scara formularului în plic și afară din el, plus cât urcă.
  const [fit, setFit] = useState({ closedScale: 0.8, openScale: 1, rise: -300 });
  // Deplasarea plicului până în centrul ecranului, calculată la click.
  const [target, setTarget] = useState({ x: 0, y: 0 });
  const envelopeRef = useRef(null);
  const letterRef = useRef(null);
  const sealRef = useRef(null);

  const isClosed = phase === "closed";
  const isOpen = phase === "open";
  const isResting = isClosed || phase === "settling";
  const letterUp = phase === "opening" || isOpen;

  function measureFit() {
    const env = envelopeRef.current;
    const letter = letterRef.current;
    if (!env || !letter) return null;

    const openScale = Math.min(1, (0.95 * env.offsetWidth) / letter.offsetWidth);
    const closedScale = Math.min(
      openScale,
      (0.86 * env.offsetWidth) / letter.offsetWidth,
      (env.offsetHeight - 24) / letter.offsetHeight,
    );
    const next = {
      closedScale,
      openScale,
      rise: -(env.offsetHeight - LETTER_BOTTOM - TUCK),
    };
    setFit(next);
    return next;
  }

  // Varianta de desktop se afișează doar de la 800px în sus.
  useEffect(() => {
    function onResize() {
      setActive(window.innerWidth >= DESKTOP_MIN_WIDTH);
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
      if (event.key === "Escape") setPhase("closing");
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  if (!active) return null;

  function open() {
    const { openScale } = measureFit();
    const rect = envelopeRef.current.getBoundingClientRect();
    // Formular + plic, ca un singur ansamblu centrat pe ecran.
    const letterVisible = letterRef.current.offsetHeight * openScale - TUCK;
    const totalHeight = letterVisible + rect.height;
    const envelopeTop =
      Math.max(16, (window.innerHeight - totalHeight) / 2) + letterVisible;

    setTarget({
      x: document.documentElement.clientWidth / 2 - (rect.left + rect.width / 2),
      y: envelopeTop - rect.top,
    });
    setPhase("opening");
  }

  function handleLetterDone() {
    if (phase === "opening") setPhase("open");
    if (phase === "closing") setPhase("settling");
  }

  function handleFlapDone() {
    if (phase !== "settling") return;
    setPhase("closed");
    sealRef.current?.focus({ preventScroll: true });
  }

  const letterAnimate = letterUp
    ? {
        y: fit.rise,
        scale: fit.openScale,
        transition: { delay: isOpen ? 0 : 0.35, duration: 0.7, ease: smooth },
      }
    : {
        y: 0,
        scale: fit.closedScale,
        transition: { duration: phase === "closing" ? 0.5 : 0, ease: smooth },
      };

  return (
    <div className={styles.layout}>
      <SectionHeading
        className={styles.heading}
        title={
          <>
            Ai nevoie de ajutor pentru următorul tău <span>eveniment</span>?
          </>
        }
      />

      <motion.div
        ref={envelopeRef}
        className={`${styles.envelope} ${isClosed ? "" : styles.envelopeOnTop}`}
        initial={false}
        animate={isResting ? { x: 0, y: 0 } : target}
        transition={{ type: "spring", duration: 0.8, bounce: 0.1 }}
      >
        <div aria-hidden="true" className={envelope.back} />

        <motion.div
          ref={letterRef}
          role="dialog"
          aria-modal={isOpen}
          aria-labelledby="contact-titlu"
          inert={!isOpen}
          className={`${styles.letter} ${letterUp ? styles.letterUp : ""}`}
          initial={false}
          animate={letterAnimate}
          onAnimationComplete={handleLetterDone}
        >
          <ContactForm
            wide
            onClose={() => setPhase("closing")}
            onSent={() => setPhase("closing")}
          />
        </motion.div>

        <div aria-hidden="true" className={envelope.front} />

        <motion.div
          aria-hidden="true"
          className={`${envelope.flapShadow} ${isResting ? "" : envelope.flapOpen}`}
          style={{ transformPerspective: 1400 }}
          initial={false}
          animate={isResting ? "closed" : "open"}
          variants={flapVariants}
          onAnimationComplete={handleFlapDone}
        >
          <div className={envelope.flap} />
        </motion.div>

        <Seal ref={sealRef} hidden={!isClosed} onClick={open} />
      </motion.div>

      <AnimatePresence>
        {!isResting && (
          <motion.div
            className={shared.backdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={() => isOpen && setPhase("closing")}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
