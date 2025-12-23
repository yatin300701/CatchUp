import { useState, type FC } from "react";
import { Dialog, DialogContent } from "../ui/dialog";
import type { Task, TimeSelectionMode } from "./Task";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Calendar22 } from "../ui/date-picker";

interface EditTaskDialogProps {
  open: boolean;
  onClose: (task: Task) => void;
  task: Task;
}

const EditTaskDialog: FC<EditTaskDialogProps> = ({ open, onClose, task }) => {
  const [taskDetails, setTaskDetails] = useState<Task>({ ...task });

  const update = <K extends keyof Task>(key: K, value: Task[K]) => {
    setTaskDetails((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) onClose(taskDetails);
      }}
    >
      <DialogContent
        className="!max-w-full w-[60%] flex flex-col gap-1"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <h2 className="font-bold mb-2">Task – {taskDetails.id}</h2>

        <div className="flex gap-5">
          <div className="w-[70%]">
            <Input
              value={taskDetails.name}
              placeholder="Enter name"
              className="w-full mb-2"
              onChange={(e) => update("name", e.target.value)}
            />

            <Textarea
              value={taskDetails.description}
              placeholder="Enter Description"
              rows={4}
              className="h-40"
              onChange={(e) => update("description", e.target.value)}
            />
          </div>

          <div className="flex flex-col w-[40%]">
            <div className="flex gap-2">
              <Select
                value={taskDetails.status}
                onValueChange={(value) =>
                  update("status", value as Task["status"])
                }
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

              <Select
                value={taskDetails.priority}
                onValueChange={(value) =>
                  update("priority", value as Task["priority"])
                }
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
            </div>

            <div className="my-2">
              <Select
                value={taskDetails.timeSelectionMode}
                onValueChange={(value) =>
                  update("timeSelectionMode", value as TimeSelectionMode)
                }
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

            <div className="mb-3">
              {taskDetails.timeSelectionMode === "range" && (
                <div className="flex gap-1">
                  <Input
                    type="time"
                    step="1"
                    value={taskDetails.timeRange.startTime}
                    onChange={(e) =>
                      update("timeRange", {
                        ...taskDetails.timeRange,
                        startTime: e.target.value,
                      })
                    }
                    className="bg-background"
                  />

                  <Input
                    type="time"
                    step="1"
                    value={taskDetails.timeRange.endTime}
                    onChange={(e) =>
                      update("timeRange", {
                        ...taskDetails.timeRange,
                        endTime: e.target.value,
                      })
                    }
                    className="bg-background"
                  />
                </div>
              )}

              {taskDetails.timeSelectionMode === "duration" && (
                <Input
                  type="number"
                  value={String(taskDetails.duration ?? "")}
                  onChange={(e) => update("duration", e.target.value || "")}
                  placeholder="Expected Duration (minutes)"
                  className="bg-background"
                />
              )}
            </div>

            <Calendar22
              date={taskDetails.dueDate}
              setDate={(date?: Date) => {
                update("dueDate", date ?? undefined);
              }}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditTaskDialog;
