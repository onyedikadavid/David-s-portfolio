import Link from "next/link";
import styles from "./DashNav.module.css";

export default function DashNav() {
  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>N·O·D</div>
      <div className={styles.badge}>CMS Dashboard</div>
      <Link href="/" className={styles.previewBtn}>
        ↗ View Portfolio
      </Link>
    </nav>
  );
}
