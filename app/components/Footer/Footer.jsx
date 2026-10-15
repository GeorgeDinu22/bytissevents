import Image from "next/image";
import Link from "next/link";
import { contact, mailto, tel } from "../../data/contact";
import styles from "./footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.brand}>
          <Link href="/" className={styles.logo}>
            <Image
              src="/logo/bytissevents-logo-simplu.svg"
              alt="ByTissEvents"
              width={649}
              height={118}
              className={styles.logoImage}
            />
          </Link>
          <p className={styles.tagline}>
            Oameni potriviți pentru campanii memorabile.
          </p>
        </div>

        <nav aria-labelledby="footer-navigare">
          <h2 id="footer-navigare" className={styles.heading}>
            Navigare
          </h2>
          <ul className={styles.list}>
            <li>
              <Link href="/" className={styles.link}>
                Acasă
              </Link>
            </li>
            <li>
              <Link href="/joburi" className={styles.link}>
                Joburi
              </Link>
            </li>
            <li>
              {/* Plicul de contact e pe fiecare pagină, deasupra footerului. */}
              <a href="#contact" className={styles.link}>
                Contact
              </a>
            </li>
          </ul>
        </nav>

        <div>
          <h2 className={styles.heading}>Date contact</h2>
          <address className={styles.list}>
            <a href={mailto("Salut, bytissevents")} className={styles.link}>
              {contact.email}
            </a>
            <a href={tel} className={styles.link}>
              {contact.phone}
            </a>
            <span>{contact.city}</span>
          </address>
        </div>
      </div>

      <div className={styles.bottom}>
        <p>© 2026 bytissevents. Toate drepturile rezervate.</p>

        {/* Opacitatea e doar pe text: pe un părinte ar estompa și linkul. */}
        <p>
          <span className={styles.creditText}>Dezvoltat de</span>{" "}
          <a
            href="https://georgeweb-design.ro"
            target="_blank"
            rel="noopener"
            className={`${styles.link} ${styles.creditLink}`}
          >
            George Web Design
          </a>
        </p>
      </div>
    </footer>
  );
}
