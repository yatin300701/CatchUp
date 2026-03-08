export enum TaskStatus {
  TODO = "Todo",
  DONE = "Done",
}

export enum TaskType {
  TASK = "Task",
  SUBTASK = "Subtask",
}

export interface Task {
  userId: string; // email
  taskId: string; // TASK#<taskId> | TASK#<taskId>#SUBTASK#<subtaskId>
  text: string;
  status: TaskStatus; // Todo | Done
  taskType: TaskType; // Task | Subtask
  createdAt: number;
  createdBy: string;
  lastUpdatedAt: number;
  parentTaskId?: string; // subtask
}

export type TaskDTO = Omit<
  Task,
  "createdBy" | "parentTaskId" | "lastUpdatedAt" | "taskType" | "userId"
>;

export interface TaskWithSubTasks extends TaskDTO {
  subtasks: TaskDTO[];
}
