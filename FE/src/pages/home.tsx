import TaskNavigation from "@/components/parts/taskNavigation";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Outlet } from "react-router-dom";

function Home() {
  return (
    <main className="relative w-full overflow-hidden">
      <SidebarTrigger className="absolute bottom-0.5 left-0 z-20" />

      <div className="relative z-20  flex gap-2">
        <TaskNavigation />
      </div>

      <section className="relative z-10">
        <Outlet />
      </section>
    </main>
  );
}

export default Home;
