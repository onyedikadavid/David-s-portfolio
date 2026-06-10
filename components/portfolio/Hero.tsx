"use client";
import { usePortfolioStore } from "@/lib/store";
import styles from "./Hero.module.css";

export default function Hero() {
  const { profile, sections } = usePortfolioStore();
  if (!sections.hero) return null;

  return (
    <section className={styles.hero} id="hero">
      <div className={styles.glow} aria-hidden />

      <div className={styles.content}>
        <div className={styles.eyebrowRow}>
          <span className={styles.eyebrow}>Software Engineer</span>
          <span className={styles.dividerDot}>·</span>
          <span className={styles.eyebrowAi}>AI / ML Engineer</span>
        </div>
        <h1 className={styles.name}>
          {profile.firstName}
          <br />
          <span>{profile.lastName}</span>
        </h1>
        <p className={styles.tagline}>{profile.tagline}</p>
        <div className={styles.chips}>
          <span className={styles.chip}>🐍 Python</span>
          <span className={styles.chip}>🧠 Deep Learning</span>
          <span className={styles.chip}>⚛ React / Next.js</span>
          <span className={styles.chip}>⛓ LLMs</span>
        </div>
        <div className={styles.actions}>
          <a href="#projects" className="btn-primary">View My Work</a>
          <a href="#contact" className="btn-outline">Let&apos;s Talk</a>
        </div>
      </div>

      <div className={styles.visual}>
        <div className={styles.ringOuter} aria-hidden />
        <div className={styles.ringInner} aria-hidden />
        <div
          className={styles.avatar}
          style={{ background: profile.avatarColor }}
        >
          <div className={styles.avatarBg} />
          <span className={styles.initials}>
            {profile.firstName?.[0] ?? "N"}
            {profile.lastName?.[0] ?? "D"}
          </span>
        </div>
        <div className={styles.badgeLeft}>
          <span className={styles.dotGreen} />
          Open to work
        </div>
        <div className={styles.badgeRight}>
          <span className={styles.dotGold} />
          {profile.years} years exp.
        </div>
      </div>
    </section>
  );
}
