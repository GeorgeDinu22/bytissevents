import JobCard from "../JobCard/JobCard";
import SectionHeading from "../SectionHeading/SectionHeading";
import { jobs } from "../../data/jobs";
import styles from "./joburiLista.module.css";

export default function JoburiLista() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <SectionHeading
          align="center"
          title={
            <>
              Joburi <span>disponibile</span>
            </>
          }
          description="Toate tipurile de proiecte pentru care căutăm și pregătim oameni. Alege unul ca să vezi detaliile."
        />

        <ul className={styles.grid}>
          {jobs.map((job) => (
            <JobCard
              key={job.slug}
              job={job}
              sizes="(min-width: 900px) 33vw, (min-width: 560px) 50vw, 100vw"
              className={styles.item}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}
