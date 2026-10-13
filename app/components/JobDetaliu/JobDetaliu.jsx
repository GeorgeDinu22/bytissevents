import Image from "next/image";
import Link from "next/link";
import { getGallery } from "../../data/jobs";
import styles from "./jobDetaliu.module.css";

export default function JobDetaliu({ job }) {
  return (
    <article className={styles.article}>
      <div className={styles.container}>
        <Link href="/#joburi" className={styles.back}>
          <svg
            aria-hidden="true"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M13 8H3m4-4L3 8l4 4" />
          </svg>
          Toate joburile
        </Link>

        <header className={styles.header}>
          <h1 className={styles.title}>{job.title}</h1>
          <p className={styles.lead}>{job.text}</p>
        </header>

        <div className={styles.cover}>
          <Image
            src={job.image}
            alt=""
            fill
            sizes="(min-width: 1184px) 1152px, 100vw"
            loading="eager"
            className={styles.image}
          />
        </div>

        <div className={styles.body}>
          <div className={styles.text}>
            {job.description.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <aside className={styles.card}>
            <h2 className={styles.cardTitle}>Ce include</h2>
            <ul className={styles.list}>
              {job.includes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </aside>
        </div>

        <ul className={styles.gallery}>
          {getGallery(job).map((src) => (
            <li key={src} className={styles.photo}>
              <Image
                src={src}
                alt=""
                fill
                sizes="(min-width: 1184px) 568px, (min-width: 640px) 50vw, 100vw"
                className={styles.image}
              />
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
