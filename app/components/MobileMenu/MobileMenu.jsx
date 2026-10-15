import ButtonLink from "../ButtonLink/ButtonLink";
import styles from "./mobileMenu.module.css";

export default function MobileMenu({ id, open, links, onClose }) {
  return (
    // Rămâne în DOM ca să se poată anima; `inert` îl scoate din tab și din cititoarele de ecran cât e închis.
    <div
      id={id}
      inert={!open}
      className={`${styles.menu} ${open ? styles.open : ""}`}
    >
      <ul className={styles.list}>
        {links.map((link) => (
          <li key={link.href}>
            <a href={link.href} onClick={onClose} className={styles.link}>
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
