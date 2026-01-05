import { FastifyRequest, FastifyReply } from "fastify";
import { TaskService } from "../services/task.service";
import { Task } from "@/domain/task.domain";
import { TaskRepository } from "../repository/task.repository";

type CreateTaskRequest = FastifyRequest<{
  Body: {
    name: string;
    dueDate?: string | null;
    timeSelectionMode: "range" | "duration";
    timeRange?: { startTime: string; endTime: string };
    duration?: string;
    priority: "low" | "medium" | "high";
    status: "todo" | "in_progress" | "done";
    description?: string;
  };
}>;

type UpdateTaskRequest = FastifyRequest<{
  Params: {
    id: string;
  };
  Body: Partial<Task>;
}>;

type DeleteTaskRequest = FastifyRequest<{
  Params: {
    id: string;
  };
}>;

export async function createTaskHandler(
  request: CreateTaskRequest,
  reply: FastifyReply
) {
  const body = request.body;
  const repo = new TaskRepository(request.server.dynamo);
  const service = new TaskService(repo);

  const task: Omit<Task, "id"> = {
    name: body.name,
    dueDate: body.dueDate ? new Date(body.dueDate) : null,
    timeSelectionMode: body.timeSelectionMode,
    timeRange: body.timeRange,
    duration: body.duration,
    priority: body.priority,
    status: body.status,
    description: body.description ?? "",
  };

  const created = await service.createTask(task);
  return reply.code(201).send(created);
}

export async function listTasksHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const repo = new TaskRepository(request.server.dynamo);
  const service = new TaskService(repo);
  const tasks = await service.listTasks();
  return reply.send(tasks);
}

export async function updateTaskHandler(
  request: UpdateTaskRequest,
  reply: FastifyReply
) {
  const repo = new TaskRepository(request.server.dynamo);
  const service = new TaskService(repo);
  return reply.send(service.updateTask(request.params.id, request.body));
}

export async function deleteTaskHandler(
  request: DeleteTaskRequest,
  reply: FastifyReply
) {
  const repo = new TaskRepository(request.server.dynamo);
  const service = new TaskService(repo);
  return reply.send(service.deleteTask(request.params.id));
}
