"use client";
import { usePortfolioStore } from "@/lib/store";
import styles from "./Skills.module.css";

export default function Skills() {
  const { skills, sections } = usePortfolioStore();
  if (!sections.skills) return null;

  return (
    <section className={styles.section} id="skills">
      <p className={styles.label}>Toolkit</p>
      <h2 className={styles.title}>Skills</h2>
      <p className={styles.sub}>Technologies and tools I work with every day.</p>
      <div className={styles.grid}>
        {skills.map((s) => (
          <div key={s.id} className={styles.pill}>
            <span className={styles.icon}>{s.icon}</span>
            {s.name}
          </div>
        ))}
      </div>
    </section>
  );
}
