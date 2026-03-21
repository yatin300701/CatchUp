export type TaskStatus = "Todo" | "InProgress" | "Done";

export type TaskType = "Task" | "Subtask";

export interface SubTask {
  taskId: string;
  text: string;
  status: TaskStatus;
  taskType: TaskType;
  createdAt: number;
}

export interface Task {
  taskId: string;
  text: string;
  status: TaskStatus;
  taskType: TaskType;
  createdAt: number;
  subtasks: Task[];
}

export interface CreateTaskRequest {
  text: string;
}

export interface CreateSubTaskPayload {
  taskId: string;
  name: string;
}
