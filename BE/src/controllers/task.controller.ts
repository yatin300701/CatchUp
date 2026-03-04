import { FastifyReply, FastifyRequest } from "fastify";
import { TaskService } from "../services/task.service";
import { TaskRepository } from "../repository/task.repository";

export async function createTaskHandler(
  request: FastifyRequest<{ Body: { name: string } }>,
  reply: FastifyReply,
) {
  const { name } = request.body;

  const service = new TaskService(new TaskRepository(request.server.dynamo));

  const task = await service.createTask(request.user.email, name);
  reply.code(201).send(task);
}

export async function createSubtaskHandler(
  request: FastifyRequest<{
    Params: { taskId: string };
    Body: { name: string };
  }>,
  reply: FastifyReply,
) {
  const { taskId } = request.params;
  const { name } = request.body;

  const service = new TaskService(new TaskRepository(request.server.dynamo));

  const subtask = await service.createSubtask(request.user.email, taskId, name);
  reply.code(201).send(subtask);
}

export async function listTasksHandler(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const email = request.user.email;

  const service = new TaskService(new TaskRepository(request.server.dynamo));

  reply.send(await service.listTasks(email));
}
