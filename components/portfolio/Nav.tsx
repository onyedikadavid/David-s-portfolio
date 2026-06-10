"use client";
import Link from "next/link";
import styles from "./Nav.module.css";

export default function Nav() {
  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>N·O·D</div>
      <ul className={styles.links}>
        <li><a href="#skills">Skills</a></li>
        <li><a href="#projects">Projects</a></li>
        <li><a href="#experience">Experience</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
      <div className={styles.actions}>
        <Link href="/dashboard" className={styles.dashBtn}>
          Dashboard ⚙
        </Link>
      </div>
    </nav>
  );
}
