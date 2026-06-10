"use client";
import { usePortfolioStore } from "@/lib/store";
import styles from "./Footer.module.css";

export default function Footer() {
  const { profile } = usePortfolioStore();
  return (
    <footer className={styles.footer}>
      <p>
        © 2025 Nwene Onyedika David · Built with Python, React & a lot of curiosity
      </p>
    </footer>
  );
}
