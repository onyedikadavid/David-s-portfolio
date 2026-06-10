"use client";
import Link from "next/link";
import { usePortfolioStore } from "@/lib/store";
import styles from "./overview.module.css";

export default function DashboardOverview() {
  const { projects, skills, experience } = usePortfolioStore();

  const stats = [
    { label: "Total Projects", value: projects.length, note: "Active in portfolio" },
    { label: "Skills",         value: skills.length,   note: "Listed in toolkit" },
    { label: "Profile Views",  value: 847,             note: "↑ 12% this month" },
    { label: "Messages",       value: 3,               note: "2 unread" },
  ];

  return (
    <div>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Welcome back 👋</h1>
          <p className={styles.sub}>Here&apos;s what&apos;s happening with your portfolio.</p>
        </div>
        <Link href="/" className="btn-sm btn-gold">↗ Preview Live</Link>
      </div>

      <div className={styles.statsRow}>
        {stats.map((s) => (
          <div key={s.label} className={styles.statCard}>
            <div className={styles.statLabel}>{s.label}</div>
            <div className={styles.statValue}>{s.value}</div>
            <div className={styles.statNote}>{s.note}</div>
          </div>
        ))}
      </div>

      <div className={styles.tableCard}>
        <div className={styles.tableHead}>
          <span className={styles.tableTitle}>Recent Projects</span>
          <Link href="/dashboard/projects" className="btn-sm btn-ghost">Manage All →</Link>
        </div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Project</th>
              <th>Tags</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {projects.slice(0, 5).map((p) => (
              <tr key={p.id}>
                <td><strong>{p.emoji} {p.title}</strong></td>
                <td className={styles.tagCell}>{p.tags.join(", ")}</td>
                <td>
                  <span className={p.status === "Live" ? styles.live : styles.draft}>
                    {p.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
