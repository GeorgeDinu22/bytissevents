"use client";

import { memo, useState } from "react";
import ButtonLink from "../ButtonLink/ButtonLink";
import SectionHeading from "../SectionHeading/SectionHeading";
import Body from "./Body";
import { GUESTS, H, MAX_GUESTS, MAX_STAFF, STAFF, W } from "./spots";
import styles from "./sliderScena.module.css";

const CROWDS = {
  guests: { spots: GUESTS, max: MAX_GUESTS, start: 40 },
  staff: { spots: STAFF, max: MAX_STAFF, start: 9 },
};
const VIEW_TOP = 170;
const BACKDROP = "/images/petrecere/studio.webp";

const PEOPLE_IMAGES = [];

const Room = memo(function Room() {
  return <image href={BACKDROP} x="0" y="0" width={W} height={H} preserveAspectRatio="xMidYMid slice" />;
});

const Guest = memo(function Guest({ spot }) {
  const { look } = spot;
  const photo = PEOPLE_IMAGES.length > 0 ? PEOPLE_IMAGES[spot.id % PEOPLE_IMAGES.length] : null;

  return (
    <g transform={`translate(${spot.px} ${spot.py}) scale(${spot.scale})`}>
      <g className={styles.appear}>
        <ellipse cx="0" cy="-1" rx={look.wide ? 58 : 30} ry={look.wide ? 9 : 6.5} fill="url(#pp-shadow)" />
        {photo ? (
          <image
            href={photo}
            x={-50}
            y={-178 * look.height}
            width={100}
            height={178 * look.height}
            preserveAspectRatio="xMidYMax meet"
          />
        ) : (
          <g transform={`scale(${look.build.toFixed(3)} ${look.height.toFixed(3)})`}>
            <Body look={look} />
          </g>
        )}
      </g>
    </g>
  );
});

// Secțiune cu slider + scenă. `crowd` alege cine apare: "guests"
// (participanți) sau "staff" (hostess, valeți, ospătari).
export default function SliderScena({ id, crowd, title, label }) {
  const { spots, max, start } = CROWDS[crowd];
  const [count, setCount] = useState(start);
  const inputId = `${id}-range`;

  return (
    <section id={id} className={styles.section}>
      <div className={styles.container}>
        <SectionHeading align="center" title={title} />

        <div className={styles.controls}>
          <label htmlFor={inputId} className={styles.label}>
            {label}
          </label>
          <output htmlFor={inputId} className={styles.count}>
            {count}
          </output>
          <input
            id={inputId}
            type="range"
            min="0"
            max={max}
            step="1"
            value={count}
            onChange={(event) => setCount(Number(event.target.value))}
            className={styles.range}
            style={{ "--fill": `${(count / max) * 100}%` }}
          />
        </div>

        <div className={styles.scene}>
          <svg
            viewBox={`0 ${VIEW_TOP} ${W} ${H - VIEW_TOP}`}
            preserveAspectRatio="xMidYMax slice"
            className={styles.svg}
            role="img"
            aria-label={`${label}: ${count}`}
          >
            <defs>
              <linearGradient id="pp-shade" x1="0" y1="0" x2="1" y2="0.25">
                <stop offset="0" stopColor="#ffffff" stopOpacity="0.2" />
                <stop offset="0.42" stopColor="#ffffff" stopOpacity="0" />
                <stop offset="1" stopColor="#000000" stopOpacity="0.3" />
              </linearGradient>
              <radialGradient id="pp-shadow">
                <stop offset="0" stopColor="#1f0a12" stopOpacity="0.45" />
                <stop offset="1" stopColor="#1f0a12" stopOpacity="0" />
              </radialGradient>
            </defs>

            <Room />
            {spots.map((spot) => (spot.rank < count ? <Guest key={spot.id} spot={spot} /> : null))}
          </svg>
        </div>

        <div className={styles.actions}>
          <ButtonLink href="#contact" size="large">
            Cere ofertă personalizată
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
