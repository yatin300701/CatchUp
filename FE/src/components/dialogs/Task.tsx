import { formatTimeHHMMSS } from "@/lib/utils";
import { useState, type FC } from "react";
import { Button } from "../ui/button";
import { Calendar22 } from "../ui/date-picker";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";

export interface Task {
  id: string;
  name: string;
  dueDate: undefined | Date;
  timeSelectionMode: TimeSelectionMode;
  timeRange: {
    startTime: string;
    endTime: string;
  };
  duration: string;
  priority: string;
  status: string;
  description: string;
}

export type TimeSelectionMode = "range" | "duration";

interface TaskProps {
  children?: React.ReactNode;
  open: boolean;
  setOpen: (open: boolean) => void;
  onTaskSubmit: (task: Omit<Task, "id">) => void;
}

const HOUR = 60 * 60 * 1000;

const TaskDialog: FC<TaskProps> = ({ open, setOpen, onTaskSubmit }) => {
  const [taskDetails, setTaskDetails] = useState<Omit<Task, "id">>({
    name: "",
    timeSelectionMode: "range",
    timeRange: {
      startTime: formatTimeHHMMSS(new Date()),
      endTime: formatTimeHHMMSS(new Date(Date.now()+ HOUR)),
    },
    duration: "",
    dueDate: new Date(),
    priority: "low",
    status: "pending",
    description: "",
  });
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Task</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-3">
          <div className="grid w-full  items-center gap-1">
            <Label htmlFor="name-1">Name</Label>
            <Input
              type="text"
              id="name"
              placeholder="Enter name"
              value={taskDetails.name}
              onChange={(e) =>
                setTaskDetails((p) => {
                  return { ...p, name: e.target.value };
                })
              }
            />
          </div>
          <div className="grid grid-cols-2 items-center gap-1">
            <div className="flex flex-col gap-1">
              <Label htmlFor="date">Date</Label>
              <Calendar22
                date={taskDetails.dueDate}
                setDate={(date?: Date) =>
                  setTaskDetails({ ...taskDetails, dueDate: date })
                }
              />
            </div>
            <div className="flex flex-col gap-1">
              <Label htmlFor="date">Mode</Label>
              <Select
                value={taskDetails.timeSelectionMode}
                onValueChange={(value) => {
                  setTaskDetails({
                    ...taskDetails,
                    timeSelectionMode: value as TimeSelectionMode,
                  });
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Time Selection Mode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Time Selection</SelectLabel>
                    <SelectItem value="range">Range</SelectItem>
                    <SelectItem value="duration">Duration</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          {taskDetails.timeSelectionMode === "range" && (
            <div className="flex gap-1">
              <Input
                type="time"
                step="1"
                defaultValue={taskDetails.timeRange.startTime}
                value={taskDetails.timeRange.startTime}
                onChange={(e) => {
                  console.log(e.target.value);
                  setTaskDetails({
                    ...taskDetails,
                    timeRange: {
                      ...taskDetails.timeRange,
                      startTime: e.target.value,
                    },
                  });
                }}
                className="bg-background appearance-none "
              />
              <Input
                type="time"
                step="1"
                defaultValue={taskDetails.timeRange.endTime}
                className="bg-background appearance-none "
              />
            </div>
          )}
          {taskDetails.timeSelectionMode === "duration" && (
            <Input
              value={taskDetails?.duration}
              onChange={(e) => {
                setTaskDetails((p) => {
                  return { ...p, duration: e.target.value };
                });
              }}
              type="number"
              placeholder="Expected Duration (minutes)"
              className="bg-background appearance-none "
            />
          )}

          <div className="flex flex-col gap-1">
            <Textarea
              placeholder="Description"
              value={taskDetails.description}
              onChange={(e) =>
                setTaskDetails((pre) => {
                  return { ...pre, description: e.target.value };
                })
              }
              className="mb-4"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="ghost">Cancel</Button>
          <Button onClick={() => onTaskSubmit(taskDetails)}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TaskDialog;
