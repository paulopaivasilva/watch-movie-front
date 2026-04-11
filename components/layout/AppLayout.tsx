"use client";

import Navbar from "./Navbar";
import { Sidebar } from "./sidebar";
import PageTransition from "@/components/shared-components/page-transition";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PageTransition>
      <div className="flex">
        <Sidebar />

        <main className="flex-1 bg-black text-white p-10 pt-20 md:pt-10">

          <div className="sticky top-0 z-50">
            <Navbar />
          </div>

          {children}

        </main>
      </div>
    </PageTransition>
  );
}