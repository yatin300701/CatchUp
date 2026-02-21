export type TaskStatus = "todo" | "done";
export type TaskType = "task" | "subtask";

export interface Task {
  // DynamoDB keys
  pk: string; // accountId
  sk: string; // TASK#<taskId> | TASK#<taskId>#SUBTASK#<subtaskId>

  taskId: string;
  parentTaskId?: string;

  name: string;
  status: TaskStatus;
  taskType: TaskType;

  createdAt: string;
  lastUpdatedAt: string;
}
