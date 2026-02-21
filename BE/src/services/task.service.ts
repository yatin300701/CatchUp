import crypto from "node:crypto";
import { TaskRepository } from "@/repository/task.repository";
import { Task } from "@/domain/task.domain";

export class TaskService {
  constructor(private readonly repo: TaskRepository) {}

  async createTask(accountId: string, name: string): Promise<Task> {
    const taskId = crypto.randomUUID();
    const now = new Date().toISOString();

    const task: Task = {
      pk: accountId,
      sk: `TASK#${taskId}`,

      taskId,
      name,
      status: "todo",
      taskType: "task",

      createdAt: now,
      lastUpdatedAt: now,
    };

    await this.repo.create(task);
    return task;
  }

  async createSubtask(
    accountId: string,
    taskId: string,
    name: string
  ): Promise<Task> {
    const subtaskId = crypto.randomUUID();
    const now = new Date().toISOString();

    const subtask: Task = {
      pk: accountId,
      sk: `TASK#${taskId}#SUBTASK#${subtaskId}`,

      taskId: subtaskId,
      parentTaskId: taskId,
      name,
      status: "todo",
      taskType: "subtask",

      createdAt: now,
      lastUpdatedAt: now,
    };

    await this.repo.create(subtask);
    return subtask;
  }

  async listTasks(accountId: string) {
    return this.repo.listTasks(accountId);
  }

  async updateTask(
    accountId: string,
    sk: string,
    data: { name?: string; status?: "todo" | "done" }
  ) {
    await this.repo.update(accountId, sk, data);
  }

  async deleteTask(accountId: string, sk: string) {
    await this.repo.delete(accountId, sk);
  }
}
export interface JwtPayloads {
  accountId: string;
  userId: string;
}
