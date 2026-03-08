import crypto from "node:crypto";
import { TaskRepository } from "../repository/task.repository";
import {
  Task,
  TaskDTO,
  TaskStatus,
  TaskType,
  TaskWithSubTasks,
} from "../domain/task.domain";
import { ulid } from "ulid";

export class TaskService {
  constructor(private readonly repo: TaskRepository) {}

  async createTask(email: string, text: string): Promise<TaskDTO> {
    const taskId = ulid();
    const now = new Date().getTime();

    const task: Task = {
      userId: email,
      taskId: "TASK#" + taskId,
      text,
      status: TaskStatus.TODO,
      taskType: TaskType.TASK,
      createdBy: email,
      createdAt: now,
      lastUpdatedAt: now,
    };

    await this.repo.create(task);

    const taskDto: TaskDTO = {
      taskId: taskId,
      text: task.text,
      status: task.status,
      createdAt: task.createdAt,
    };
    return taskDto;
  }

  async createSubtask(
    email: string,
    taskId: string,
    text: string,
  ): Promise<TaskDTO> {
    const subtaskId = ulid();
    const now = new Date().getTime();

    const subtask: Task = {
      userId: email,
      taskId: "TASK#" + taskId + "#SUBTASK#" + subtaskId,
      text,
      parentTaskId: taskId,
      status: TaskStatus.TODO,
      taskType: TaskType.SUBTASK,
      createdBy: email,
      createdAt: now,
      lastUpdatedAt: now,
    };

    await this.repo.create(subtask);

    const subtaskDto: TaskDTO = {
      taskId: subtaskId,
      text: subtask.text,
      status: subtask.status,
      createdAt: subtask.createdAt,
    };
    return subtaskDto;
  }

  async listTasks(email: string): Promise<TaskWithSubTasks[]> {
    const allTasks = await this.repo.listTasks(email);
    let mapSet = new Map<string, number>();
    let taskWithSubTasks: TaskWithSubTasks[] = [];
    let taskIndex = 0;
    for (const task of allTasks) {
      if (task.taskType === TaskType.TASK) {
        taskWithSubTasks.push({
          taskId: task.taskId.replace("TASK#", ""),
          text: task.text,
          status: task.status,
          createdAt: task.createdAt,
          subtasks: [],
        });
        mapSet.set(task.taskId.replace("TASK#", ""), taskIndex);
        taskIndex++;
      } else {
        const parentTaskId = task.parentTaskId;
        const parentTaskIndex = mapSet.get(parentTaskId ?? "");
        if (parentTaskIndex !== undefined) {
          taskWithSubTasks[parentTaskIndex]?.subtasks.push({
            taskId: task.taskId.replace(
              "TASK#" + parentTaskId + "#SUBTASK#",
              "",
            ),
            text: task.text,
            status: task.status,
            createdAt: task.createdAt,
          });
        }
      }
    }
    return taskWithSubTasks;
  }

  async updateTask(
    email: string,
    taskId: string,
    data: { text?: string; status?: TaskStatus },
  ) {
    await this.repo.update(email, taskId, data);
  }

  async deleteTaskAndSubtasks(email: string, taskId: string): Promise<void> {
    const taskIds = await this.repo.listTaskKeysByPrefix(email, taskId);

    if (taskIds.length === 0) return;

    await this.repo.batchDelete(email, taskIds);
  }

  async deleteTask(email: string, taskId: string) {
    await this.repo.delete(email, taskId);
  }
}
export interface JwtPayloads {
  accountId: string;
  userId: string;
}
