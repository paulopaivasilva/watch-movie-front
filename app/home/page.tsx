import { Sidebar } from "@/components/layout/sidebar";
import PageTransition from "@/components/shared-components/page-transition";
import Trending from "@/sections/trending";

export default function HomePage() {
  return (
    <PageTransition>
      <div className="flex">
        <Sidebar />

        <main className="flex-1 bg-black text-white p-10 overflow-hidden pt-20 md:pt-10">
          <Trending />
        </main>
      </div>
    </PageTransition>
  );
}