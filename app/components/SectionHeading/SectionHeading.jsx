import styles from "./sectionHeading.module.css";

export default function SectionHeading({
  title,
  description,
  align = "left",
  className = "",
}) {
  return (
    <div
      className={`${styles.heading} ${align === "center" ? styles.center : ""} ${className}`}
    >
      <h2 className={styles.title}>{title}</h2>
      {description && <p className={styles.description}>{description}</p>}
    </div>
  );
}
