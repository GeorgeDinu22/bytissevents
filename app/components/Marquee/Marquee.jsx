import { jobs } from "../../data/jobs";
import styles from "./marquee.module.css";

// Inima din lucide, umplută cu alb.
function Heart() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="#ffffff"
      stroke="#ffffff"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5" />
    </svg>
  );
}

function Group({ hidden = false }) {
  return (
    <ul className={styles.group} aria-hidden={hidden || undefined}>
      {jobs.map((job) => (
        <li key={job.title} className={styles.item}>
          {job.title}
          <span aria-hidden="true" className={styles.star}>
            <Heart />
          </span>
        </li>
      ))}
    </ul>
  );
}

export default function Marquee() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.band}>
        {/* Două grupuri identice: când primul iese din cadru, al doilea îi ia locul. */}
        <div className={styles.track}>
          <Group />
          <Group hidden />
        </div>
      </div>
    </div>
  );
}
