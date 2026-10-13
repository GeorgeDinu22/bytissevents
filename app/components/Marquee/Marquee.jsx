import { jobs } from "../../data/jobs";
import styles from "./marquee.module.css";

function Group({ hidden = false }) {
  return (
    <ul className={styles.group} aria-hidden={hidden || undefined}>
      {jobs.map((job) => (
        <li key={job.title} className={styles.item}>
          {job.title}
          <span aria-hidden="true" className={styles.star}>
            ✦
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
