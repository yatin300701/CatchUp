import { useState, type FC } from "react";
import { CalendarCheck, List, Target } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import ListTasks from "./listTasks";
import DayWork from "./dayWork";

interface TaskNavigationProps {}

const TaskNavigation: FC<TaskNavigationProps> = () => {
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
          <CalendarCheck className="p-0.5 bg-chart-3 text-sidebar rounded-xs" />{" "}
          Today Plan
        </TabsTrigger>
        <TabsTrigger value="tasks" variant="outline" className="text-xs">
          <List className="p-0.5 bg-chart-1 text-sidebar rounded-xs" /> Task
          List
        </TabsTrigger>
        <TabsTrigger value="completed" variant="outline" className="text-xs">
          <Target className="p-0.5 rounded-xs bg-chart-2 text-sidebar" /> Habits
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
        <div>Completed Content</div>
      </TabsContent>
    </Tabs>
  );
};

export default TaskNavigation;
