import Link from "next/link";
import { contact, mailto, tel } from "../../data/contact";
import styles from "./footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.brand}>
          <Link href="/" className={styles.logo}>
            bytiss<span>events</span>
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

      <p className={styles.copyright}>
        © 2026 bytissevents. Toate drepturile rezervate.
      </p>
    </footer>
  );
}
