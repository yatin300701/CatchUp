import TaskNavigation from "@/components/parts/taskNavigation";
import { SidebarTrigger } from "../components/ui/sidebar";

function Home() {
  return (
    <main className="w-full relative">
      <SidebarTrigger className="absolute bottom-0.5 left-0" />
      <div className="flex my-2 mx-4 gap-2 ">
        <TaskNavigation />
      </div>
    </main>
  );
}

export default Home;
