import Image from "next/image";
import ButtonLink from "../ButtonLink/ButtonLink";
import HeroDissolve from "./HeroDissolve";
import styles from "./hero.module.css";

// TODO: imagini demo de pe Unsplash — de înlocuit cu poze proprii.
const photos = [
  "/images/joburi/sampling.jpg",
  "/images/joburi/brand-ambassadors.jpg",
  "/images/joburi/festivaluri.jpg",
  "/images/joburi/hostess-private-vip.jpg",
];

export default function Hero() {
  return (
    <HeroDissolve>
      <div aria-hidden="true" className={styles.glow} />

      <div className={styles.inner}>
        <div className={styles.content}>
          <h1 className={styles.title}>
            <span>Oameni potriviți pentru</span> campanii <br/> <strong>memorabile</strong>
          </h1>

          <p className={styles.description}>
            Găsim hostess, promoteri și brand ambassadors pentru evenimentele
            și activările brandului tău. Iar dacă vrei un job de câteva zile,
            te punem în legătură cu proiectul potrivit.
          </p>

          <ButtonLink href="#contact" className={styles.cta}>
            Contactează-ne
          </ButtonLink>
        </div>

        <div aria-hidden="true" className={styles.collage}>
          {photos.map((src) => (
            <div key={src} className={styles.photo}>
              <Image
                src={src}
                alt=""
                fill
                sizes="(min-width: 1100px) 220px, 25vw"
                loading="eager"
                className={styles.image}
              />
            </div>
          ))}
        </div>
      </div>
    </HeroDissolve>
  );
}
