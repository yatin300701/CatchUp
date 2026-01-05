export type TimeSelectionMode = "range" | "duration";

export type TaskPriority = "low" | "medium" | "high";
export type TaskStatus = "todo" | "in_progress" | "done";

export interface Task {
  id: string;
  name: string;
  dueDate: Date | null;
  timeSelectionMode: TimeSelectionMode;
  timeRange?: {
    startTime: string;
    endTime: string;
  };
  duration?: string;
  priority: TaskPriority;
  status: TaskStatus;
  description: string;
}
