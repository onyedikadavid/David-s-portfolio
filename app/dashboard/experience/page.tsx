"use client";
import { useState } from "react";
import { usePortfolioStore } from "@/lib/store";
import type { ExperienceEntry } from "@/types";
import styles from "./experience.module.css";

const blank = (): Omit<ExperienceEntry, "id"> => ({
  type: "exp", years: "", role: "", company: "", bullets: [],
});

export default function ExperienceDash() {
  const { experience, addExperience, updateExperience, removeExperience } = usePortfolioStore();
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState(blank());
  const [bulletsText, setBulletsText] = useState("");

  function openNew() {
    setEditing(null); setForm(blank()); setBulletsText(""); setModal(true);
  }
  function openEdit(e: ExperienceEntry) {
    setEditing(e.id);
    setForm({ type: e.type, years: e.years, role: e.role, company: e.company, bullets: e.bullets });
    setBulletsText(e.bullets.join("\n"));
    setModal(true);
  }
  function handleSave() {
    const bullets = bulletsText.split("\n").map((b) => b.trim()).filter(Boolean);
    const payload = { ...form, bullets };
    if (editing) updateExperience(editing, payload);
    else addExperience({ id: Date.now().toString(), ...payload });
    setModal(false);
  }

  return (
    <div>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Experience</h1>
          <p className={styles.sub}>Your work and education timeline.</p>
        </div>
        <button className="btn-sm btn-violet" onClick={openNew}>+ Add Entry</button>
      </div>

      <div className={styles.tableCard}>
        <table className={styles.table}>
          <thead><tr><th>Type</th><th>Period</th><th>Role</th><th>Company</th><th>Actions</th></tr></thead>
          <tbody>
            {experience.map((e) => (
              <tr key={e.id}>
                <td><span className={e.type === "exp" ? styles.live : styles.draft}>{e.type === "exp" ? "Work" : "Edu"}</span></td>
                <td className={styles.period}>{e.years}</td>
                <td>{e.role}</td>
                <td className={styles.company}>{e.company}</td>
                <td>
                  <button className="btn-sm btn-ghost" style={{ marginRight: "0.4rem" }} onClick={() => openEdit(e)}>Edit</button>
                  <button className="btn-sm btn-danger" onClick={() => removeExperience(e.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modal && (
        <div className={styles.overlay} onClick={(e) => { if (e.target === e.currentTarget) setModal(false); }}>
          <div className={styles.modal}>
            <div className={styles.modalHead}>
              <span className={styles.modalTitle}>{editing ? "Edit Entry" : "Add Entry"}</span>
              <button className={styles.close} onClick={() => setModal(false)}>×</button>
            </div>
            <div className={styles.modalBody}>
              <div className={styles.fgRow}>
                <div className={styles.fg}>
                  <label>Type</label>
                  <select className="form-control" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value as "exp" | "edu" })}>
                    <option value="exp">Experience</option>
                    <option value="edu">Education</option>
                  </select>
                </div>
                <div className={styles.fg}>
                  <label>Period</label>
                  <input className="form-control" value={form.years} onChange={(e) => setForm({ ...form, years: e.target.value })} placeholder="2022 – now" />
                </div>
              </div>
              <div className={styles.fg}><label>Role / Degree</label><input className="form-control" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} placeholder="Frontend Developer" /></div>
              <div className={styles.fg}><label>Company / Institution</label><input className="form-control" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} placeholder="Acme Corp" /></div>
              <div className={styles.fg}><label>Bullet Points (one per line)</label><textarea className="form-control" rows={5} value={bulletsText} onChange={(e) => setBulletsText(e.target.value)} placeholder={"Built responsive UIs...\nIntegrated REST APIs..."} /></div>
              <div className={styles.actions}>
                <button className="btn-sm btn-ghost" onClick={() => setModal(false)}>Cancel</button>
                <button className="btn-sm btn-violet" onClick={handleSave}>Save Entry</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
