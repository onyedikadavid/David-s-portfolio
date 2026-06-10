"use client";
import { useState } from "react";
import { usePortfolioStore } from "@/lib/store";
import type { Project } from "@/types";
import styles from "./projects.module.css";

const CARD_COLORS = [
  { bg: "rgba(124,58,237,0.25)", base: "#0f0c1a" },
  { bg: "rgba(201,168,76,0.2)",  base: "#110e04" },
  { bg: "rgba(52,211,153,0.15)", base: "#04120a" },
  { bg: "rgba(59,130,246,0.2)",  base: "#04081a" },
  { bg: "rgba(239,68,68,0.2)",   base: "#1a0404" },
  { bg: "rgba(236,72,153,0.2)",  base: "#1a0410" },
];
const EMOJIS = ["🚀","⚡","🎯","🌍","🛒","📋","🌤","🎨","🔥","🍃","💡","📱","🎮","🔐","📊","🌐","🛡","⚙","🎵","🌈","🤖","✨","🧩","🗺"];

const blank = (): Omit<Project, "id"> => ({
  title: "", desc: "", tags: [], emoji: "🚀",
  color: CARD_COLORS[0].bg, bg: CARD_COLORS[0].base,
  status: "Live", badge: "",
});

export default function ProjectsDash() {
  const { projects, addProject, updateProject, removeProject } = usePortfolioStore();
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);
  const [form, setForm] = useState(blank());
  const [colorIdx, setColorIdx] = useState(0);
  const [tagsInput, setTagsInput] = useState("");

  const filtered = projects.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()))
  );

  function openNew() {
    setEditing(null);
    setForm(blank());
    setTagsInput("");
    setColorIdx(0);
    setModal(true);
  }

  function openEdit(p: Project) {
    setEditing(p.id);
    setForm({ title: p.title, desc: p.desc, tags: p.tags, emoji: p.emoji, color: p.color, bg: p.bg, status: p.status, badge: p.badge ?? "" });
    setTagsInput(p.tags.join(", "));
    const ci = CARD_COLORS.findIndex((c) => c.bg === p.color);
    setColorIdx(ci >= 0 ? ci : 0);
    setModal(true);
  }

  function handleSave() {
    const tags = tagsInput.split(",").map((t) => t.trim()).filter(Boolean);
    const payload = { ...form, tags, color: CARD_COLORS[colorIdx].bg, bg: CARD_COLORS[colorIdx].base };
    if (editing) {
      updateProject(editing, payload);
    } else {
      addProject({ id: Date.now().toString(), ...payload });
    }
    setModal(false);
  }

  return (
    <div>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Projects</h1>
          <p className={styles.sub}>Manage your portfolio work.</p>
        </div>
        <button className="btn-sm btn-violet" onClick={openNew}>+ Add Project</button>
      </div>

      <div className={styles.toolbar}>
        <input
          className={styles.search}
          placeholder="Search projects…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className={styles.tableCard}>
        <table className={styles.table}>
          <thead>
            <tr><th>Project</th><th>Tags</th><th>Status</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p.id}>
                <td><strong>{p.emoji} {p.title}</strong></td>
                <td className={styles.tagCell}>{p.tags.join(", ")}</td>
                <td>
                  <span className={p.status === "Live" ? styles.live : styles.draft}>{p.status}</span>
                </td>
                <td>
                  <button className="btn-sm btn-ghost" style={{ marginRight: "0.4rem" }} onClick={() => openEdit(p)}>Edit</button>
                  <button className="btn-sm btn-danger" onClick={() => removeProject(p.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {modal && (
        <div className={styles.overlay} onClick={(e) => { if (e.target === e.currentTarget) setModal(false); }}>
          <div className={styles.modal}>
            <div className={styles.modalHead}>
              <span className={styles.modalTitle}>{editing ? "Edit Project" : "Add Project"}</span>
              <button className={styles.close} onClick={() => setModal(false)}>×</button>
            </div>
            <div className={styles.modalBody}>
              <div className={styles.fg}><label>Title</label><input className="form-control" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="My Project" /></div>
              <div className={styles.fg}><label>Description</label><textarea className="form-control" rows={3} value={form.desc} onChange={(e) => setForm({ ...form, desc: e.target.value })} placeholder="What did you build?" /></div>
              <div className={styles.fg}><label>Tags (comma separated)</label><input className="form-control" value={tagsInput} onChange={(e) => setTagsInput(e.target.value)} placeholder="React, Node.js" /></div>
              <div className={styles.fg}>
                <label>Emoji</label>
                <input className="form-control" value={form.emoji} onChange={(e) => setForm({ ...form, emoji: e.target.value })} placeholder="🚀" style={{ marginBottom: "0.6rem" }} />
                <div className={styles.emojiGrid}>
                  {EMOJIS.map((em) => (
                    <button key={em} className={styles.emojiBtn} onClick={() => setForm({ ...form, emoji: em })}>{em}</button>
                  ))}
                </div>
              </div>
              <div className={styles.fg}>
                <label>Card Color</label>
                <div className={styles.colorRow}>
                  {CARD_COLORS.map((c, i) => (
                    <div
                      key={i}
                      className={`${styles.swatch} ${colorIdx === i ? styles.swatchSelected : ""}`}
                      style={{ background: c.bg, borderColor: c.bg.replace("0.25", "0.7").replace("0.2", "0.6").replace("0.15", "0.5") }}
                      onClick={() => setColorIdx(i)}
                    />
                  ))}
                </div>
              </div>
              <div className={styles.fgRow}>
                <div className={styles.fg}>
                  <label>Status</label>
                  <select className="form-control" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as "Live" | "Draft" })}>
                    <option>Live</option><option>Draft</option>
                  </select>
                </div>
                <div className={styles.fg}>
                  <label>Badge (optional)</label>
                  <input className="form-control" value={form.badge} onChange={(e) => setForm({ ...form, badge: e.target.value })} placeholder="Featured" />
                </div>
              </div>
              <div className={styles.modalActions}>
                <button className="btn-sm btn-ghost" onClick={() => setModal(false)}>Cancel</button>
                <button className="btn-sm btn-violet" onClick={handleSave}>Save Project</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
