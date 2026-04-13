"use client";

import { useEffect } from "react";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import Logo from "../shared-components/Logo";
import { useMediaQuery } from "@/hooks/use-media-query";
import SidebarContent from "./SidebarContent";

export function Sidebar({
  collapsed,
  setCollapsed,
}: {
  collapsed: boolean;
  setCollapsed: (value: boolean) => void;
}) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  useEffect(() => {
    if (!isDesktop) return;
    setCollapsed(false);
  }, [isDesktop]);

  return (
    <>
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 p-4 bg-[#191817]/80 backdrop-blur-md">
        <Sheet>
          <SheetTrigger>
            <Menu className="text-white" />
          </SheetTrigger>

          <SheetContent side="left" className="bg-[#21201E] border-none">
            <SheetTitle className="sr-only">Menu</SheetTitle>

            <Logo className="p-4 mt-10" />

            <div className="md:hidden px-5 py-4 flex items-center gap-2">
              <img
                src="https://i.pravatar.cc/40"
                className="w-7 h-7 rounded-full"
              />
              <span className="text-white font-medium">Igor</span>
            </div>

            <SidebarContent />
          </SheetContent>
        </Sheet>
      </div>
      <aside
        className={cn(
          "hidden md:flex flex-col bg-[#191817] text-white h-screen py-10 px-4",
          "fixed top-0 left-0 z-40 transition-all duration-300 ease-in-out",
          "shadow-[6px_0_30px_rgba(97,0,194,0.35)]",
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