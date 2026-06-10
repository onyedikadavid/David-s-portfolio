"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Navbar from "@/components/portfolio/Navbar";
import styles from "./DashboardShell.module.css";

const navItems = [
  { label: "Overview",   icon: "📊", href: "/dashboard" },
  { label: "Projects",   icon: "🗂", href: "/dashboard/projects" },
  { label: "Skills",     icon: "⚡", href: "/dashboard/skills" },
  { label: "Experience", icon: "💼", href: "/dashboard/experience" },
  { label: "Profile",    icon: "👤", href: "/dashboard/profile" },
  { label: "Sections",   icon: "🔧", href: "/dashboard/sections" },
];

export default function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <>
      <Navbar />
      <div className={styles.wrap}>
        <aside className={styles.sidebar}>
          <div className={styles.sideSection}>
            <p className={styles.sideLabel}>Content</p>
            {navItems.map((item) => {
              const active =
                item.href === "/dashboard"
                  ? pathname === "/dashboard"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`${styles.sideItem} ${active ? styles.sideItemActive : ""}`}
                >
                  <span className={styles.sideIcon}>{item.icon}</span>
                  {item.label}
                </Link>
              );
            })}
          </div>
          <div className={styles.sideSection}>
            <p className={styles.sideLabel}>Quick Links</p>
            <Link href="/" className={styles.sideItem} target="_blank">
              <span className={styles.sideIcon}>↗</span>
              View Portfolio
            </Link>
          </div>
        </aside>
        <main className={styles.main}>{children}</main>
      </div>
    </>
  );
}
