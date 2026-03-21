import { apiFetch } from "./client";
import { Task, CreateTaskRequest } from "@/types/task.types";

export const fetchTasks = () => {
  return apiFetch<Task[]>(`/api/tasks`);
};

export const createTask = (data: CreateTaskRequest) =>
  apiFetch<Task>("/api/task", {
    method: "POST",
    body: JSON.stringify(data),
  });

export const createSubTask = (taskId: string, name: string) =>
  apiFetch<Task>(`/api/task/${taskId}/subtask`, {
    method: "POST",
    body: JSON.stringify({ text: name }),
  });

export const updateTask = (taskId: string, payload: any) =>
  apiFetch(`/api/tasks/${taskId}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });

export const deleteTask = (taskId: string, subtaskId?: string) =>
  apiFetch(`/api/tasks/${taskId}${subtaskId ? `/${subtaskId}` : ""}`, {
    method: "DELETE",
  });
