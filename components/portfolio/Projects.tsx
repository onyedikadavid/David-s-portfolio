"use client";
import { usePortfolioStore } from "@/lib/store";
import styles from "./Projects.module.css";

export default function Projects() {
  const { projects, sections } = usePortfolioStore();
  if (!sections.projects) return null;

  return (
    <section className={styles.section} id="projects">
      <p className={styles.label}>Selected Work</p>
      <h2 className={styles.title}>Projects</h2>
      <p className={styles.sub}>A selection of things I&apos;ve built — from products to experiments.</p>
      <div className={styles.grid}>
        {projects.map((p) => (
          <div
            key={p.id}
            className={styles.card}
            style={{ background: p.bg }}
          >
            <div className={styles.thumb} style={{ background: p.color }}>
              <span className={styles.emoji}>{p.emoji || "🚀"}</span>
              <div className={styles.thumbOverlay} />
            </div>
            {p.badge && <span className={styles.badge}>{p.badge}</span>}
            <div className={styles.body}>
              <h3 className={styles.cardTitle}>{p.title}</h3>
              <p className={styles.desc}>{p.desc}</p>
              <div className={styles.tags}>
                {p.tags.map((t) => (
                  <span key={t} className={styles.tag}>{t}</span>
                ))}
              </div>
              {p.link && (
                <a
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.viewBtn}
                >
                  ↗ View Project
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className={styles.showMore}>
        <button className="btn-outline">Show More →</button>
      </div>
    </section>
  );
}