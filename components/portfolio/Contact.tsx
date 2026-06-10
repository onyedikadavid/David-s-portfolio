"use client";
import { usePortfolioStore } from "@/lib/store";
import styles from "./Contact.module.css";

export default function Contact() {
  const { profile, sections } = usePortfolioStore();
  if (!sections.contact) return null;

  return (
    <section className={styles.section} id="contact">
      <div className={styles.grid}>
        <div className={styles.left}>
          <p className={styles.label}>Get in Touch</p>
          <h2 className={styles.headline}>
            Let&apos;s discuss something{" "}
            <em className={styles.em}>cool</em> together
          </h2>
          <div className={styles.info}>
            <div className={styles.row}><span className={styles.icon}>📍</span>{profile.location}</div>
            <div className={styles.row}><span className={styles.icon}>📞</span>{profile.phone}</div>
            <div className={styles.row}><span className={styles.icon}>✉</span>{profile.email}</div>
          </div>
        </div>

        <div className={styles.right}>
          <div className={styles.card}>
            <div className={styles.formGroup}>
              <label>Name</label>
              <input className="form-control" placeholder="Your name" />
            </div>
            <div className={styles.formGroup}>
              <label>Email</label>
              <input className="form-control" placeholder="your@email.com" />
            </div>
            <div className={styles.formGroup}>
              <label>Message</label>
              <textarea className="form-control" rows={4} placeholder="Tell me about your project..." />
            </div>
            <button className="btn-primary" style={{ width: "100%" }}>
              Send Message
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
