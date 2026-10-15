import Link from "next/link";
import styles from "./buttonLink.module.css";

export default function ButtonLink({
  variant = "primary",
  size = "normal",
  className = "",
  children,
  ...props
}) {
  // Linkurile interne (/pagina) navighează fără reîncărcarea paginii.
  const Tag = props.href?.startsWith("/") ? Link : "a";
  // Butonul mare rămâne simplu, doar cu text.
  const large = size === "large";

  return (
    <Tag
      className={`${styles.button} ${styles[variant]} ${
        large ? styles.large : ""
      } ${className}`}
      {...props}
    >
      {children}
      {!large && (
        <svg
          aria-hidden="true"
          viewBox="0 0 16 16"
          className={styles.arrow}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 8h10M9 4l4 4-4 4" />
        </svg>
      )}
    </Tag>
  );
}
