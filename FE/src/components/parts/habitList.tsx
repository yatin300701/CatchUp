import { useState, type FC } from "react";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import type { Habit } from "@/models/habit";
import HabitDialog from "../dialogs/Habit";

const HabitList: FC = () => {
  const [habitDialogOpen, setHabitDialogOpen] = useState(false);
  return (
    <div>
      <div className="flex items-center justify-end mx-4 my-2">
        <Button
          className="   h-8 px-3 cursor-pointer text-xs active:scale-95 transition-transform"
          onClick={() => setHabitDialogOpen(true)}
        >
          <Plus className="h-4 w-4" />
          Habit
        </Button>
      </div>
      <div></div>
      <HabitDialog
        open={habitDialogOpen}
        onClose={() => setHabitDialogOpen(false)}
        onSubmit={(habit: Omit<Habit, "id">) => {
          setHabitDialogOpen(false);
          console.log(habit);
        }}
      />
    </div>
  );
};

export default HabitList;
