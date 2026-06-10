"use client";
import Link from "next/link";
import styles from "./Navbar.module.css";

export default function Navbar() {
  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>M·S</div>
      <ul className={styles.links}>
        {["Skills", "Projects", "Experience", "Contact"].map((item) => (
          <li key={item}>
            <a href={`#${item.toLowerCase()}`}>{item}</a>
          </li>
        ))}
      </ul>
      <div className={styles.actions}>
        <Link href="/" className={styles.btnOutline}>Portfolio</Link>
        <Link href="/dashboard" className={styles.btnPrimary}>Dashboard ⚙</Link>
      </div>
    </nav>
  );
}
