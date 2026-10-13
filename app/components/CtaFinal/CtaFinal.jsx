import CtaDesktop from "../CtaDesktop/CtaDesktop";
import CtaMobile from "../CtaMobile/CtaMobile";
import styles from "./ctaFinal.module.css";

// Fiecare variantă ascultă redimensionarea ferestrei și se afișează doar
// pe lățimea ei: CtaMobile sub 800px, CtaDesktop de la 800px în sus
// (pragul e în breakpoint.js).

export default function CtaFinal() {
  return (
    <section id="contact" className={styles.section}>
      <CtaMobile />
      <CtaDesktop />
    </section>
  );
}
