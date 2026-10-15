"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import useHideOnScroll from "../../hooks/useHideOnScroll";
import ButtonLink from "../ButtonLink/ButtonLink";
import MobileMenu from "../MobileMenu/MobileMenu";
import styles from "./navbar.module.css";

const links = [
  { href: "/#de-ce-noi", label: "De ce noi" },
  { href: "/#joburi", label: "Joburi" },
  { href: "/#testimoniale", label: "Testimoniale" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  // Cu meniul de mobil deschis, navbarul rămâne pe loc.
  const hidden = useHideOnScroll() && !open;

  return (
    <header className={`${styles.header} ${hidden ? styles.hidden : ""}`}>
      <nav aria-label="Navigare principală" className={styles.nav}>
        <div className={styles.bar}>
          <Link href="/" className={styles.logo}>
            <Image
              src="/logo/bytissevents-logo-simplu.svg"
              alt="ByTissEvents"
              width={649}
              height={118}
              preload
              className={styles.logoImage}
            />
          </Link>

          <ul className={styles.links}>
            {links.map((link) => (
              <li key={link.href}>
                <a href={link.href} className={styles.link}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className={styles.actions}>
            <ButtonLink href="#contact" className={styles.cta}>
              Contact
            </ButtonLink>
            <button
              type="button"
              aria-expanded={open}
              aria-controls="meniu-mobil"
              aria-label={open ? "Închide meniul" : "Deschide meniul"}
              onClick={() => setOpen(!open)}
              className={styles.toggle}
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                {open ? (
                  <path d="M6 6l12 12M18 6L6 18" />
                ) : (
                  <path d="M4 7h16M4 12h16M4 17h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        <MobileMenu
          id="meniu-mobil"
          open={open}
          links={links}
          onClose={() => setOpen(false)}
        />
      </nav>
    </header>
  );
}
