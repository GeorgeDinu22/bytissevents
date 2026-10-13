"use client";

import useHideOnScroll from "../../hooks/useHideOnScroll";
import { whatsapp } from "../../data/contact";
import WhatsAppIcon from "../WhatsAppIcon/WhatsAppIcon";
import styles from "./whatsAppButton.module.css";

export default function WhatsAppButton() {
  const hidden = useHideOnScroll();

  return (
    <a
      href={whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Scrie-ne pe WhatsApp"
      className={`${styles.button} ${hidden ? styles.hidden : ""}`}
    >
      <WhatsAppIcon />
    </a>
  );
}
