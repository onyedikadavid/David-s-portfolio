"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Sidebar.module.css";

const nav = [
  { label: "Overview",    href: "/dashboard",              icon: "📊", group: "Overview" },
  { label: "Projects",    href: "/dashboard/projects",     icon: "🗂",  group: "Content" },
  { label: "Skills",      href: "/dashboard/skills",       icon: "⚡", group: "Content" },
  { label: "Experience",  href: "/dashboard/experience",   icon: "💼", group: "Content" },
  { label: "Profile",     href: "/dashboard/profile",      icon: "👤", group: "Settings" },
  { label: "Sections",    href: "/dashboard/sections",     icon: "🔧", group: "Settings" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const groups = [...new Set(nav.map((n) => n.group))];

  return (
    <aside className={styles.sidebar}>
      {groups.map((g) => (
        <div key={g} className={styles.group}>
          <div className={styles.groupLabel}>{g}</div>
          {nav
            .filter((n) => n.group === g)
            .map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.item} ${pathname === item.href ? styles.active : ""}`}
              >
                <span className={styles.icon}>{item.icon}</span>
                {item.label}
              </Link>
            ))}
        </div>
      ))}
    </aside>
  );
}
