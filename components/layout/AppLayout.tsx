"use client";

import Navbar from "./Navbar";
import { Sidebar } from "./Sidebar";
import PageTransition from "@/components/shared-components/page-transition";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <PageTransition>
      <div className="flex h-screen overflow-hidden">
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

        <div className="fixed top-0 left-0 md:left-64 right-0 z-40 py-4 md:py-3 mt-8">
          <Navbar />
        </div>

        <main
          className={cn(
            "flex-1 bg-[#191817] text-white px-4 py-6 pt-28 md:p-10 md:pt-24 overflow-y-auto transition-all duration-300 ease-in-out",
            collapsed ? "md:ml-20" : "md:ml-64"
          )}
        >
          {children}
        </main>
      </div>
    </PageTransition>
  );
}