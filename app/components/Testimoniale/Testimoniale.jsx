import SectionHeading from "../SectionHeading/SectionHeading";
import VideoPlayer from "../VideoPlayer/VideoPlayer";
import styles from "./testimoniale.module.css";

// TODO: date provizorii. Clipurile sunt video-uri stock de pe mixkit.co,
// puse doar ca să se vadă cum arată secțiunea: NU sunt recomandări reale și
// trebuie înlocuite, împreună cu numele, înainte de publicare.
// `video` și `poster` sunt căi din /public; cât timp `video` e null, cardul
// afișează un placeholder.
const testimonials = [
  {
    title: "Cei mai buni",
    name: "Nume Prenume",
    role: "Funcție, Companie",
    video: "/videos/testimoniale/recomandare-1.mp4",
    poster: "/videos/testimoniale/recomandare-1.jpg",
  },
  {
    title: "Recomand cu căldură",
    name: "Nume Prenume",
    role: "Funcție, Companie",
    video: "/videos/testimoniale/recomandare-2.mp4",
    poster: "/videos/testimoniale/recomandare-2.jpg",
  },
  {
    title: "Seriozitate maximă",
    name: "Nume Prenume",
    role: "Hostess / Promoter",
    video: "/videos/testimoniale/recomandare-3.mp4",
    poster: "/videos/testimoniale/recomandare-3.jpg",
  },
];

export default function Testimoniale() {
  return (
    <section id="testimoniale" className={styles.section}>
      <div className={styles.container}>
        <SectionHeading
          title={
            <>
              Recomandari cât <span>1000 de pliante</span>
            </>
          }
          description="Cel mai bine vorbesc despre noi cei cu care am lucrat: firme care ne-au cerut oameni și oameni care au lucrat prin noi."
        />

        <ul className={styles.grid}>
          {testimonials.map((item, index) => (
            <li key={index} className={styles.card}>
              <div className={styles.sheet}>
                <p className={styles.kicker}>
                  „{item.title}”
                  <span role="img" aria-label="5 stele din 5" className={styles.stars}>
                    ★★★★★
                  </span>
                </p>
                <div className={styles.media}>
                  {item.video ? (
                    <VideoPlayer
                      src={item.video}
                      poster={item.poster}
                      label={`Redă recomandarea: ${item.title}`}
                    />
                  ) : (
                    <div className={styles.placeholder}>
                      <span aria-hidden="true" className={styles.play}>
                        <svg viewBox="0 0 24 24" fill="currentColor">
                          <path d="M8 5.5v13l11-6.5-11-6.5Z" />
                        </svg>
                      </span>
                      <span className={styles.soon}>Video în curând</span>
                    </div>
                  )}
                </div>
              </div>
              <div className={styles.stub}>
                <p className={styles.name}>{item.name}</p>
                <p className={styles.role}>{item.role}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
