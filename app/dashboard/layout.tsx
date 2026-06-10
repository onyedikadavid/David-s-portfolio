import type { Metadata } from "next";
import DashNav from "@/components/dashboard/DashNav";
import Sidebar from "@/components/dashboard/Sidebar";
import styles from "./dashboard.module.css";

export const metadata: Metadata = { title: "Dashboard · Portfolio CMS" };

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <DashNav />
      <div className={styles.wrap}>
        <Sidebar />
        <main className={styles.main}>{children}</main>
      </div>
    </>
  );
}
