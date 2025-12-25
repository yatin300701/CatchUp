import { useState, type FC } from "react";
import {
  AlarmCheckIcon,
  ClipboardList,
  Hourglass,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import ListTasks from "./listTasks";
import DayWork from "./dayWork";
import HabitList from "./habitList";

const TaskNavigation: FC = () => {
  const [selectedTab, setSelectedTab] = useState("tasks");
  return (
    <Tabs
      className="w-full gap-0"
      defaultValue="tasks"
      value={selectedTab}
      onValueChange={setSelectedTab}
    >
      <TabsList variant="outline">
        <TabsTrigger value="day-work" variant="outline" className="text-xs">
          <Hourglass className="!h-4 !w-4" /> Today Plan
        </TabsTrigger>
        <TabsTrigger value="tasks" variant="outline" className="text-xs">
          <ClipboardList className="!h-4 !w-4" /> Task List
        </TabsTrigger>
        <TabsTrigger value="completed" variant="outline" className="text-xs">
          <AlarmCheckIcon className="!h-4 !w-4" /> Habits
        </TabsTrigger>
      </TabsList>
      <hr className="p-0 mb-1" />
      <TabsContent value="day-work">
        <DayWork />
      </TabsContent>
      <TabsContent value="tasks">
        <ListTasks />
      </TabsContent>
      <TabsContent value="completed">
        <HabitList />
      </TabsContent>
    </Tabs>
  );
};

export default TaskNavigation;
