import { Task } from "@/domain/task.domain";
import { TaskRepository } from "@/repository/task.repository";
import crypto from "node:crypto";

export class TaskService {
  constructor(private readonly repo: TaskRepository) {}

  async createTask(data: Omit<Task, "id">): Promise<Task> {
    const task: Task = {
      id: crypto.randomUUID(),
      ...data,
    };

    await this.repo.create(task);
    return task;
  }

  async listTasks(): Promise<Task[]> {
    return this.repo.list();
  }

  async updateTask(id: string, data: Partial<Task>): Promise<Task> {
    const task = await this.repo.update(id, data);
    return task;
  }

  async deleteTask(id: string): Promise<void> {
    await this.repo.delete(id);
  }
}
