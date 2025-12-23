import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CalendarIcon, CirclePlus, Ellipsis, Trash } from "lucide-react";
import { Fragment, useEffect, useMemo, useState } from "react";
import { Button } from "../ui/button";
import dayjs from "dayjs";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import TaskDialog, { type Task } from "../dialogs/Task";
import { Columns3Cog } from "lucide-react";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import Confirmation from "../dialogs/Confirmation";
import EditTaskDialog from "../dialogs/EditTask";

type HeaderKey =
  | "name"
  | "dueDate"
  | "priority"
  | "status"
  | "createdAt"
  | "timeSelectionMode"
  | "timeRange"
  | "duration"
  | "description"
  | "actions";

interface Header {
  name: string;
  key: HeaderKey;
}

const headers: Header[] = [
  { name: "Name", key: "name" },
  { name: "Due Date", key: "dueDate" },
  { name: "Priority", key: "priority" },
  { name: "Status", key: "status" },
  { name: "Created Date", key: "createdAt" },
  { name: "Mode", key: "timeSelectionMode" },
  { name: "Time Range", key: "timeRange" },
  { name: "Duration", key: "duration" },
  { name: "Description", key: "description" },
  { name: "Action", key: "actions" },
];

function ListTasks() {
  const [openTaskDialog, setTaskDialogOpen] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [openConfirmationDialog, setOpenConfirmationDialog] = useState<{
    open: boolean;
    selectedTask: Task | null;
  }>({ open: false, selectedTask: null });
  const [editTaskDialog, setEditTaskDialog] = useState<{
    open: boolean;
    selectedTask: Task | null;
  }>({ open: false, selectedTask: null });

  const [activeHeaderKeys, setActiveHeaderKeys] = useState<HeaderKey[]>([
    "name",
    "dueDate",
    "priority",
    "status",
    "createdAt",
    "actions",
  ]);

  const activeHeaders = useMemo(
    () => headers.filter((h) => activeHeaderKeys.includes(h.key)),
    [activeHeaderKeys]
  );

  const handleConfirmation = (res: boolean) => {
    if (res) {
      setTasks((prev) =>
        prev.filter((t) => t.id !== openConfirmationDialog.selectedTask?.id)
      );
    }
    setOpenConfirmationDialog({ open: false, selectedTask: null });
  };

  const handleEditTask = (res: Task) => {
    if (res) {
      setTasks((prev) =>
        prev.map((t) => {
          if (t.id === res.id) {
            return res;
          }
          return t;
        })
      );
    }
    setEditTaskDialog({ open: false, selectedTask: null });
  };

  return (
    <div className="">
      <div className="flex items-center justify-end gap-4 mx-4">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" className="cursor-pointer">
              <Columns3Cog size="20" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-40">
            <div className="grid">
              <div className="mb-4">
                <h4 className="leading-none font-medium">Columns</h4>
              </div>
              <div className="flex flex-col gap-2">
                {headers.map((header) => (
                  <div key={header.key} className="flex items-center gap-3">
                    <Checkbox
                      id={header.key}
                      name={header.key}
                      checked={activeHeaderKeys.includes(header.key)}
                      onCheckedChange={(checked) => {
                        console.log(checked);
                        setActiveHeaderKeys((prev) =>
                          checked
                            ? [...prev, header.key]
                            : prev.filter((key) => key !== header.key)
                        );
                      }}
                    />
                    <Label htmlFor={header.key}>{header.name}</Label>
                  </div>
                ))}
              </div>
            </div>
          </PopoverContent>
        </Popover>

        <Button
          className="   h-8 px-3 cursor-pointer text-xs active:scale-95 transition-transform"
          onClick={() => setTaskDialogOpen(true)}
        >
          <CirclePlus className="h-4 w-4" />
          Add Task
        </Button>
        {openTaskDialog && (
          <TaskDialog
            open={openTaskDialog}
            setOpen={setTaskDialogOpen}
            onTaskSubmit={(task: Omit<Task, "id">) => {
              console.log(task);
              setTasks((prev) => [
                ...prev,
                { ...task, id: Date.now().toString() },
              ]);
              setTaskDialogOpen(false);
            }}
          />
        )}
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            {activeHeaders.map((header) => (
              <TableHead
                key={header.key}
                className="text-xs  text-gray-400 dark:text-gray-400"
              >
                {header.name}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.map((task: any) => (
            <TableRow key={task.id}>
              {activeHeaders.map((header) => {
                switch (header.key) {
                  case "name":
                    return (
                      <TableCell
                        onClick={() =>
                          setEditTaskDialog({ open: true, selectedTask: task })
                        }
                      >
                        {task.name}
                      </TableCell>
                    );
                  case "dueDate":
                    return (
                      <TableCell className="w-40">
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              data-empty={!dayjs(task.dueDate)}
                              className="data-[empty=true]:text-muted-foreground w-full justify-start text-left font-normal border-0 !p-0"
                            >
                              <CalendarIcon />
                              {dayjs(task.dueDate) ? (
                                dayjs(task.dueDate).format("DD/MM/YY")
                              ) : (
                                <span>Pick a date</span>
                              )}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={dayjs(task.dueDate).toDate()}
                              onSelect={(date) => {
                                setTasks((p) => {
                                  return p.map((t) => {
                                    if (t.id === task.id) {
                                      return { ...t, dueDate: date };
                                    }
                                    return t;
                                  });
                                });
                              }}
                            />
                          </PopoverContent>
                        </Popover>
                      </TableCell>
                    );
                  case "priority":
                    return (
                      <TableCell className="w-40">
                        <Select
                          defaultValue={task.priority}
                          value={task.priority}
                          onValueChange={(value) => {
                            setTasks((prev) =>
                              prev.map((t) => {
                                if (t.id === task.id) {
                                  return { ...t, priority: value };
                                }
                                return t;
                              })
                            );
                          }}
                        >
                          <SelectTrigger className="w-full border-0">
                            <SelectValue placeholder="Theme" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">Low</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="high">High</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                    );
                  case "status":
                    return (
                      <TableCell className="w-40">
                        <Select
                          defaultValue={task.status}
                          value={task.status}
                          onValueChange={(val) => {
                            setTasks((prev) =>
                              prev.map((t) => {
                                console.log(t);

                                if (t.id === task.id) {
                                  return { ...t, status: val };
                                }
                                return t;
                              })
                            );
                          }}
                        >
                          <SelectTrigger className="w-full border-0">
                            <SelectValue placeholder="Theme" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="in-progress">
                              In Progress
                            </SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                    );
                  case "createdAt":
                    return (
                      <TableCell className="w-40">
                        {dayjs(task.createdAt).format("DD/MM/YY")}
                      </TableCell>
                    );
                  case "actions":
                    return (
                      <TableCell className="w-40">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="cursor-pointer"
                          onClick={() =>
                            setOpenConfirmationDialog({
                              open: true,
                              selectedTask: task,
                            })
                          }
                        >
                          <Trash />
                        </Button>
                      </TableCell>
                    );
                  case "timeRange": {
                    return (
                      <TableCell>
                        {task.timeSelectionMode == "range" &&
                          task.timeRange.startTime +
                            " - " +
                            task.timeRange.endTime}
                      </TableCell>
                    );
                  }
                  default:
                    return (
                      <TableCell className="capitalize whitespace-break-spaces">
                        {task?.[header.key]}{" "}
                      </TableCell>
                    );
                }
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {openConfirmationDialog && (
        <Confirmation
          open={openConfirmationDialog.open}
          onClose={(res) => handleConfirmation(res)}
        />
      )}
      {editTaskDialog.open && editTaskDialog.selectedTask && (
        <EditTaskDialog
          open={editTaskDialog.open}
          onClose={handleEditTask}
          task={editTaskDialog.selectedTask}
        />
      )}
    </div>
  );
}

export default ListTasks;
