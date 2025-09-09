import BreadcrumbComponent from "@/components/parts/breadcrumpts";
import CreateTask from "@/components/parts/createTask";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Label } from "@radix-ui/react-label";
import { SidebarTrigger } from "../components/ui/sidebar";
import ListTasks from "@/components/parts/listTasks";
import { FileUploader } from "react-drag-drop-files";
import { useState } from "react";

const fileTypes = ["JPG", "PNG", "GIF"];

function Home() {
  const [file, setFile] = useState(null);
  const handleChange = (file: any) => {
    setFile(file);
  };
  return (
    <>
      <main className="w-full">
        <div className="flex items-center">
          <SidebarTrigger />
          <BreadcrumbComponent />
        </div>
        <div className="flex my-2 mx-4 gap-2  ">
          <div className="flex-1 w-full">
            <FileUploader
              handleChange={handleChange}
              name="file"
              
              classes="!text-red-100 !border-red-50"
              types={fileTypes}
            />
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
