import Image from "next/image";
import Link from "next/link";
import styles from "./jobCard.module.css";

export default function JobCard({ job, sizes, className = "" }) {
  return (
    <li className={`${styles.card} ${className}`}>
      {job.image && (
        <Image
          src={job.image}
          alt=""
          fill
          sizes={sizes}
          className={styles.image}
        />
      )}
      <div className={styles.content}>
        <h3 className={styles.cardTitle}>
          <Link href={`/joburi/${job.slug}`} className={styles.cardLink}>
            {job.title}
          </Link>
          <span aria-hidden="true" className={styles.arrow}>
            <svg
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </span>
        </h3>
        <div className={styles.reveal}>
          <p className={styles.cardText}>{job.text}</p>
        </div>
      </div>
    </li>
  );
}
