"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./Nav.module.css";

// ── Change this to any secret word only you know ──────────────────
const SECRET_KEY = "nod2025";
// ─────────────────────────────────────────────────────────────────

export default function Nav() {
  const [showDash, setShowDash] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("access") === SECRET_KEY) {
      // Remember it for this browser session so you don't need
      // the URL every time you refresh
      sessionStorage.setItem("dash_access", SECRET_KEY);
    }
    if (sessionStorage.getItem("dash_access") === SECRET_KEY) {
      setShowDash(true);
    }
  }, []);

  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>N·O·D</div>
      <ul className={styles.links}>
        <li><a href="#skills">Skills</a></li>
        <li><a href="#projects">Projects</a></li>
        <li><a href="#experience">Experience</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
      {showDash && (
        <div className={styles.actions}>
          <Link href="/dashboard" className={styles.dashBtn}>
            Dashboard ⚙
          </Link>
        </div>
      )}
    </nav>
  );
}