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
      endTime: formatTimeHHMMSS(new Date(new Date().getTime() + HOUR)),
    },
    duration: "",
    dueDate: new Date(),
    priority: "low",
    status: "pending",
    description: "",
  });
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Task</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-3">
            <div className="grid w-full  items-center gap-1">
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
              <Calendar22
                date={taskDetails.dueDate}
                setDate={(date?: Date) =>
                  setTaskDetails({ ...taskDetails, dueDate: date })
                }
              />
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
            {taskDetails.timeSelectionMode == "range" && (
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
            {taskDetails.timeSelectionMode == "duration" && (
              <>
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
              </>
            )}
            <div className="flex gap-1">
              <Select
                value={taskDetails.priority}
                onValueChange={(value) => {
                  setTaskDetails({ ...taskDetails, priority: value });
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Priority</SelectLabel>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Select
                value={taskDetails.status}
                onValueChange={(value) => {
                  setTaskDetails({ ...taskDetails, status: value });
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Status</SelectLabel>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
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
    </>
  );
};

export default TaskDialog;
