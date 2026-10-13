import ButtonLink from "../ButtonLink/ButtonLink";
import JobCard from "../JobCard/JobCard";
import SectionHeading from "../SectionHeading/SectionHeading";
import { jobs } from "../../data/jobs";
import styles from "./joburi.module.css";

// Pe prima pagină apar doar primele joburi; restul sunt pe /joburi.
const featured = jobs.slice(0, 6);

export default function Joburi() {
  return (
    <section id="joburi" className={styles.section}>
      <div className={styles.container}>
        <SectionHeading
          align="center"
          title={
            <>
              Joburi cu care ne <span>ocupăm</span>
            </>
          }
          description="Pentru fiecare tip de proiect avem oameni pregătiți. Dacă ești firmă, îți formăm echipa; dacă vrei să lucrezi, aici vezi ce poți face."
        />
      </div>

      <ul className={styles.track}>
        {featured.map((job) => (
          <JobCard
            key={job.slug}
            job={job}
            sizes="(min-width: 1100px) 33vw, (min-width: 768px) 50vw, 90vw"
            className={styles.slide}
          />
        ))}
      </ul>

      <div className={styles.more}>
        <ButtonLink href="/joburi">Descoperă joburi disponibile</ButtonLink>
      </div>
    </section>
  );
}
