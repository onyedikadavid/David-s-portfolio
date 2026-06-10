"use client";
import { useState } from "react";
import { usePortfolioStore } from "@/lib/store";
import styles from "./profile.module.css";

const COLORS = [
  "linear-gradient(135deg,#7C3AED,#6D28D9)",
  "linear-gradient(135deg,#C9A84C,#B8952E)",
  "linear-gradient(135deg,#1E40AF,#1D4ED8)",
  "linear-gradient(135deg,#065F46,#047857)",
  "linear-gradient(135deg,#9D174D,#BE185D)",
  "linear-gradient(135deg,#92400E,#B45309)",
];

export default function ProfileDash() {
  const { profile, setProfile } = usePortfolioStore();
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({ ...profile });

  function handleSave() {
    setProfile(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Profile</h1>
          <p className={styles.sub}>Your personal info and branding.</p>
        </div>
        <button className={`btn-sm btn-violet ${saved ? styles.saved : ""}`} onClick={handleSave}>
          {saved ? "✓ Saved!" : "Save Changes"}
        </button>
      </div>

      <div className={styles.card}>
        <div className={styles.avatarRow}>
          <div className={styles.avatar} style={{ background: form.avatarColor }}>
            {form.firstName?.[0] ?? "M"}{form.lastName?.[0] ?? "S"}
          </div>
          <div>
            <p className={styles.colorLabel}>Avatar Colour</p>
            <div className={styles.colorRow}>
              {COLORS.map((c, i) => (
                <div
                  key={i}
                  className={`${styles.dot} ${form.avatarColor === c ? styles.dotActive : ""}`}
                  style={{ background: c }}
                  onClick={() => setForm({ ...form, avatarColor: c })}
                />
              ))}
            </div>
          </div>
        </div>

        <div className={styles.grid}>
          <div className={styles.fg}><label>First Name</label><input className="form-control" value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} /></div>
          <div className={styles.fg}><label>Last Name</label><input className="form-control" value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} /></div>
          <div className={styles.fg}><label>Title</label><input className="form-control" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></div>
          <div className={styles.fg}><label>Years Experience</label><input className="form-control" value={form.years} onChange={(e) => setForm({ ...form, years: e.target.value })} /></div>
          <div className={styles.fg} style={{ gridColumn: "1/-1" }}><label>Tagline</label><textarea className="form-control" rows={3} value={form.tagline} onChange={(e) => setForm({ ...form, tagline: e.target.value })} /></div>
          <div className={styles.fg}><label>Location</label><input className="form-control" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} /></div>
          <div className={styles.fg}><label>Phone</label><input className="form-control" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></div>
          <div className={styles.fg} style={{ gridColumn: "1/-1" }}><label>Email</label><input className="form-control" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></div>
        </div>
      </div>
    </div>
  );
}
