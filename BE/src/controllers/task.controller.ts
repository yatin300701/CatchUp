import { FastifyReply, FastifyRequest } from "fastify";
import { TaskService } from "../services/task.service";
import { TaskRepository } from "../repository/task.repository";
import { TaskStatus, TaskType } from "../domain/task.domain";

export async function createTaskHandler(
  request: FastifyRequest<{ Body: { text: string } }>,
  reply: FastifyReply,
) {
  const { text } = request.body;
  if (!text) {
    throw reply.badRequest("Text is required");
  }

  const service = new TaskService(new TaskRepository(request.server.dynamo));

  const task = await service.createTask(request.user.email, text);
  reply.code(201).send(task);
}

export async function createSubtaskHandler(
  request: FastifyRequest<{
    Params: { taskId: string };
    Body: { text: string };
  }>,
  reply: FastifyReply,
) {
  const { taskId } = request.params;
  const { text } = request.body;
  if (!text) {
    throw reply.badRequest("Text is required");
  }
  const service = new TaskService(new TaskRepository(request.server.dynamo));

  const subtask = await service.createSubtask(request.user.email, taskId, text);
  reply.code(201).send(subtask);
}

export async function listTasksHandler(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const email = request.user.email;

  const service = new TaskService(new TaskRepository(request.server.dynamo));
  const allTasks = await service.listTasks(email);

  reply.send(allTasks);
}

export async function updateTaskHandler(
  request: FastifyRequest<{
    Params: { taskId: string };
    Body: {
      text?: string;
      status?: TaskStatus;
      taskType: TaskType;
      parentTaskId?: string;
    };
  }>,
  reply: FastifyReply,
) {
  const { taskId } = request.params;
  const { text, status, taskType, parentTaskId } = request.body;
  if (!text && !status) {
    throw reply.badRequest("Text or status is required");
  }
  if (!taskType) {
    throw reply.badRequest("Task type is required");
  }
  const service = new TaskService(new TaskRepository(request.server.dynamo));
  if (taskType === TaskType.TASK) {
    const pk = "TASK#" + taskId;
    await service.updateTask(request.user.email, pk, { text, status });
  } else {
    if (!parentTaskId) {
      throw reply.badRequest("Parent task id is required");
    }
    const pk = "TASK#" + parentTaskId + "#SUBTASK#" + taskId;
    await service.updateTask(request.user.email, pk, { text, status });
  }
  reply.code(200).send({ message: "Task updated successfully" });
}

export async function deleteTaskHandler(
  request: FastifyRequest<{
    Params: { taskId: string; subtaskId: string };
  }>,
  reply: FastifyReply,
) {
  const { taskId, subtaskId } = request.params;
  const service = new TaskService(new TaskRepository(request.server.dynamo));

  if (subtaskId) {
    const pk = "TASK#" + taskId + "#SUBTASK#" + subtaskId;
    await service.deleteTask(request.user.email, pk);
  } else {
    const pk = "TASK#" + taskId;
    await service.deleteTaskAndSubtasks(request.user.email, pk);
  }
  reply.code(200).send({ message: "Task deleted successfully" });
}
