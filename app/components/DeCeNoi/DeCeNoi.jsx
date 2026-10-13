"use client";

import Image from "next/image";
import { useState } from "react";
import SectionHeading from "../SectionHeading/SectionHeading";
import styles from "./deCeNoi.module.css";

// TODO: texte și imagini demo — de verificat că descriu corect cum lucrați.
const audiences = [
  {
    id: "firme",
    label: "Pentru firme",
    image: "/images/joburi/targuri-si-expozitii.jpg",
    steps: [
      {
        title: "Ne spui ce ai de făcut",
        text: "Evenimentul, perioada, câți oameni și ce au de făcut. Atât ne trebuie ca să pornim.",
      },
      {
        title: "Alegem oamenii, nu doar numărul",
        text: "Pentru fiecare proiect căutăm persoane care se potrivesc cu brandul tău și cu publicul lui.",
      },
      {
        title: "Rămânem lângă echipă",
        text: "Instructajul, coordonarea și înlocuirile sunt treaba noastră. Tu vorbești cu un singur om.",
      },
    ],
  },
  {
    id: "oameni",
    label: "Pentru cei care vor să lucreze",
    image: "/images/joburi/brand-ambassadors.jpg",
    steps: [
      {
        title: "Ne scrii în câteva minute",
        text: "Ne spui cine ești, din ce oraș și când ești disponibil. Fără CV-uri de trei pagini.",
      },
      {
        title: "Alegi ce ți se potrivește",
        text: "Joburi de câteva zile, la evenimente și campanii. Spui da doar la cele care îți convin.",
      },
      {
        title: "Știi din start ce ai de făcut",
        text: "Primești programul, locul și instructajul înainte de prima zi, nu la fața locului.",
      },
    ],
  },
];

function Pill({ src }) {
  return (
    <span aria-hidden="true" className={styles.pill}>
      <Image src={src} alt="" fill sizes="120px" className={styles.cover} />
    </span>
  );
}

export default function DeCeNoi() {
  const [activeId, setActiveId] = useState(audiences[0].id);
  const active = audiences.find((audience) => audience.id === activeId);

  return (
    <section id="de-ce-noi" className={styles.section}>
      <div className={styles.container}>
        <SectionHeading
          title={
            <>
              De ce <span>noi</span>
            </>
          }
        />

        <p className={styles.statement}>
          Suntem oamenii <Pill src="/images/joburi/sampling.jpg" /> din spatele
          campaniilor <em>care se țin minte</em>. Găsim echipa potrivită pentru
          brandul tău <Pill src="/images/joburi/festivaluri.jpg" /> și jobul
          potrivit pentru tine.
        </p>

        <div className={styles.columns}>
          <div className={styles.photoCard}>
            <div className={styles.photo}>
              {audiences.map((audience) => (
                <Image
                  key={audience.id}
                  src={audience.image}
                  alt=""
                  fill
                  sizes="(min-width: 900px) 440px, 100vw"
                  className={`${styles.cover} ${styles.fade} ${
                    audience.id === activeId ? styles.visible : ""
                  }`}
                />
              ))}
            </div>

            {/* Ștampilă rotundă, cu text care se învârte încet. */}
            <svg aria-hidden="true" viewBox="0 0 120 120" className={styles.stamp}>
              <circle cx="60" cy="60" r="60" />
              <path id="stamp-cerc" d="M60 60m-44 0a44 44 0 1 1 88 0a44 44 0 1 1-88 0" fill="none" />
              <text>
                <textPath href="#stamp-cerc" textLength="270">
                  OAMENI POTRIVIȚI ✦ CAMPANII MEMORABILE ✦
                </textPath>
              </text>
            </svg>
          </div>

          <div>
            <div role="tablist" aria-label="Pentru cine" className={styles.tabs}>
              {audiences.map((audience) => (
                <button
                  key={audience.id}
                  type="button"
                  role="tab"
                  id={`tab-${audience.id}`}
                  aria-selected={audience.id === activeId}
                  aria-controls="de-ce-noi-pasi"
                  onClick={() => setActiveId(audience.id)}
                  className={`${styles.tab} ${
                    audience.id === activeId ? styles.tabActive : ""
                  }`}
                >
                  {audience.label}
                </button>
              ))}
            </div>

            {/* `key` repornește animația de intrare la schimbarea tabului. */}
            <ol
              key={active.id}
              id="de-ce-noi-pasi"
              role="tabpanel"
              aria-labelledby={`tab-${active.id}`}
              className={styles.steps}
            >
              {active.steps.map((step, index) => (
                <li key={step.title} className={styles.step}>
                  <span aria-hidden="true" className={styles.number}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className={styles.stepTitle}>{step.title}</h3>
                    <p className={styles.stepText}>{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
