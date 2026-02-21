import { FastifyReply, FastifyRequest } from "fastify";
import { TaskRepository } from "../../src/repository/task.repository";
import { TaskService } from "../../src/services/task.service";

export async function createTaskHandler(
  request: FastifyRequest<{ Body: { name: string } }>,
  reply: FastifyReply
) {
  const { name } = request.body;
  const accountId = request.user.accountId;

  const service = new TaskService(new TaskRepository(request.server.dynamo));

  const task = await service.createTask(accountId, name);
  reply.code(201).send(task);
}

export async function createSubtaskHandler(
  request: FastifyRequest<{
    Params: { taskId: string };
    Body: { name: string };
  }>,
  reply: FastifyReply
) {
  const { taskId } = request.params;
  const { name } = request.body;
  const accountId = request.user.accountId;

  const service = new TaskService(new TaskRepository(request.server.dynamo));

  const subtask = await service.createSubtask(accountId, taskId, name);
  reply.code(201).send(subtask);
}

export async function listTasksHandler(
  request: FastifyRequest,
  reply: FastifyReply
) {
  const accountId = request.user.accountId;

  const service = new TaskService(new TaskRepository(request.server.dynamo));

  reply.send(await service.listTasks(accountId));
}
