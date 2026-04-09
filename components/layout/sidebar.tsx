"use client";

import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import Logo from "../shared-components/Logo";
import { useMediaQuery } from "@/hooks/use-media-query";
import SidebarContent from "./sidebar-content";

export function Sidebar() {
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    if (isDesktop) {
      setCollapsed(false);
    }
  }, [isDesktop]);

  return (
    <>
      {/* MOBILE */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 p-4 bg-[#191817]/80 backdrop-blur-md">
        <Sheet>
          <SheetTrigger>
            <Menu className="text-white" />
          </SheetTrigger>

          <SheetContent side="left" className="bg-[#21201E] border-none">
            <SheetTitle className="sr-only">Menu</SheetTitle>
            <Logo className="p-4 mt-10" />

            <SidebarContent />
          </SheetContent>
        </Sheet>
      </div>

      <aside
        className={cn(
          "hidden md:flex flex-col bg-[#191817] text-white h-screen transition-all duration-300 py-10 px-4",
          "shadow-[2px_0_90px_rgba(97,0,194,0.4)]",
          collapsed ? "w-20" : "w-64"
        )}
      >
        <div className="flex items-center justify-between mb-15">
          {!collapsed && <Logo />}

          <button onClick={() => setCollapsed(!collapsed)}>
            <Menu className="text-white ml-2" />
          </button>
        </div>

        <SidebarContent collapsed={collapsed} />
      </aside>
    </>
  );
}