"use client";

import { mailto } from "../../data/contact";
import styles from "./contactForm.module.css";

function Required() {
  return (
    <span aria-hidden="true" className={styles.required}>
      *
    </span>
  );
}

// `wide` pune cele trei câmpuri scurte pe un singur rând (varianta de desktop).
export default function ContactForm({
  wide = false,
  onClose,
  onSent,
}) {
  function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const body = [
      `Nume: ${data.get("nume")}`,
      `Telefon: ${data.get("telefon")}`,
      `Email: ${data.get("email")}`,
      "",
      data.get("mesaj"),
    ].join("\n");

    // TODO: demo — deschide clientul de email. De înlocuit cu trimitere reală.
    window.open(
      `${mailto("Cerere de pe site")}&body=${encodeURIComponent(body)}`,
      "_self",
    );
    onSent?.();
  }

  const name = (
    <label className={styles.field}>
      <span>
        Nume <Required />
      </span>
      <input
        name="nume"
        type="text"
        autoComplete="name"
        required
      />
    </label>
  );

  return (
    <form
      onSubmit={handleSubmit}
      className={`${styles.form} ${wide ? styles.wide : ""}`}
    >
      <div className={styles.formHeader}>
        <h3 id="contact-titlu" className={styles.formTitle}>
          Scrie-ne câteva rânduri
        </h3>
        <button
          type="button"
          aria-label="Închide formularul"
          onClick={onClose}
          className={styles.close}
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </div>

      {!wide && name}

      <div className={styles.row}>
        {wide && name}
        <label className={styles.field}>
          <span>
            Telefon <Required />
          </span>
          <input name="telefon" type="tel" autoComplete="tel" required />
        </label>
        <label className={styles.field}>
          <span>
            Email <Required />
          </span>
          <input name="email" type="email" autoComplete="email" required />
        </label>
      </div>

      <label className={styles.field}>
        Mesaj
        <textarea
          name="mesaj"
          rows={wide ? 3 : 4}
          placeholder="Ce eveniment pregătești sau ce job cauți?"
          required
        />
      </label>

      <div className={styles.actions}>
        <button type="submit" className={styles.submit}>
          Trimite mesajul
        </button>
      </div>
    </form>
  );
}
