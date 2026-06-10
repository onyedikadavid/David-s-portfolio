"use client";
import { useState } from "react";
import { usePortfolioStore } from "@/lib/store";
import styles from "./Experience.module.css";

export default function Experience() {
  const { experience, sections } = usePortfolioStore();
  const [tab, setTab] = useState<"exp" | "edu">("exp");
  if (!sections.experience) return null;

  const items = experience.filter((e) => e.type === tab);

  return (
    <section className={styles.section} id="experience">
      <p className={styles.label}>Background</p>
      <h2 className={styles.title}>Experience &amp; Education</h2>
      <p className={styles.sub}>Where I&apos;ve worked and what I&apos;ve studied.</p>

      <div className={styles.tabs}>
        <button
          className={`${styles.tab} ${tab === "exp" ? styles.active : ""}`}
          onClick={() => setTab("exp")}
        >
          Experience
        </button>
        <button
          className={`${styles.tab} ${tab === "edu" ? styles.active : ""}`}
          onClick={() => setTab("edu")}
        >
          Education
        </button>
      </div>

      <div className={styles.timeline}>
        {items.map((e) => (
          <div key={e.id} className={styles.item}>
            <div className={styles.year}>{e.years}</div>
            <div className={styles.content}>
              <div className={styles.role}>{e.role}</div>
              <div className={styles.company}>{e.company}</div>
              <ul className={styles.bullets}>
                {e.bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
