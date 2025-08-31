import BreadcrumbComponent from "@/components/parts/breadcrumpts";
import CreateTask from "@/components/parts/createTask";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Label } from "@radix-ui/react-label";
import { SidebarTrigger } from "../components/ui/sidebar";
import ListTasks from "@/components/parts/listTasks";

function Home() {
  return (
    <>
      <main className="w-full">
        <div className="flex items-center">
          <SidebarTrigger />
          <BreadcrumbComponent />
        </div>
        <div className="flex my-2 mx-4 gap-2">
          <div className="flex-1 w-full">
            <CreateTask />
            <ListTasks />
          </div>
          <Separator orientation="vertical" className="!h-screen m-2" />
          <div className="w-1/3 ">
            <Label>Filters</Label>
            <Separator className="my-4" />
            <Input placeholder="Type to search..." type="search" />
          </div>
        </div>
      </main>
    </>
  );
}

export default Home;
