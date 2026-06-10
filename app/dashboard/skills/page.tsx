"use client";
import { useState } from "react";
import { usePortfolioStore } from "@/lib/store";
import styles from "./skills.module.css";

export default function SkillsDash() {
  const { skills, addSkill, removeSkill } = usePortfolioStore();
  const [name, setName] = useState("");
  const [icon, setIcon] = useState("");

  function handleAdd() {
    if (!name.trim()) return;
    addSkill({ id: Date.now().toString(), name: name.trim(), icon: icon.trim() || name.slice(0, 2).toUpperCase() });
    setName(""); setIcon("");
  }

  return (
    <div>
      <div className={styles.header}>
        <h1 className={styles.title}>Skills</h1>
        <p className={styles.sub}>Manage your toolkit.</p>
      </div>

      <div className={styles.addCard}>
        <h2 className={styles.cardTitle}>Add New Skill</h2>
        <div className={styles.addRow}>
          <input className="form-control" style={{ flex: 2 }} placeholder="Skill name (e.g. TypeScript)" value={name} onChange={(e) => setName(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleAdd()} />
          <input className="form-control" style={{ flex: 1 }} placeholder="Icon/emoji (e.g. TS or 🔷)" value={icon} onChange={(e) => setIcon(e.target.value)} />
          <button className="btn-sm btn-violet" onClick={handleAdd}>Add</button>
        </div>
      </div>

      <div className={styles.listCard}>
        <h2 className={styles.cardTitle}>Current Skills <span className={styles.count}>{skills.length}</span></h2>
        <div className={styles.grid}>
          {skills.map((s) => (
            <div key={s.id} className={styles.pill}>
              <span className={styles.icon}>{s.icon}</span>
              <span className={styles.name}>{s.name}</span>
              <button className={styles.remove} onClick={() => removeSkill(s.id)}>×</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
