"use client";
import { usePortfolioStore } from "@/lib/store";
import type { SectionVisibility } from "@/types";
import styles from "./sections.module.css";

const SECTIONS: { key: keyof SectionVisibility; label: string; sub: string }[] = [
  { key: "hero",       label: "Hero",       sub: "Name, tagline, and CTA buttons" },
  { key: "skills",     label: "Skills",     sub: "Your tech toolkit grid" },
  { key: "projects",   label: "Projects",   sub: "Portfolio work grid" },
  { key: "experience", label: "Experience", sub: "Work & education timeline" },
  { key: "contact",    label: "Contact",    sub: "Contact form and info" },
];

export default function SectionsDash() {
  const { sections, toggleSection } = usePortfolioStore();

  return (
    <div>
      <div className={styles.header}>
        <h1 className={styles.title}>Sections</h1>
        <p className={styles.sub}>Show or hide sections on your public portfolio.</p>
      </div>
      <div className={styles.card}>
        {SECTIONS.map((s) => (
          <div key={s.key} className={styles.row}>
            <div>
              <div className={styles.label}>{s.label}</div>
              <div className={styles.rowSub}>{s.sub}</div>
            </div>
            <div
              className={`${styles.toggle} ${sections[s.key] ? styles.on : ""}`}
              onClick={() => toggleSection(s.key)}
              role="switch"
              aria-checked={sections[s.key]}
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && toggleSection(s.key)}
            >
              <span className={styles.thumb} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
