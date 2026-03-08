import { FastifyInstance } from "fastify";
import {
  createSubtaskHandler,
  createTaskHandler,
  deleteTaskHandler,
  listTasksHandler,
  updateTaskHandler,
} from "../../src/controllers/task.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

export async function taskRoutes(app: FastifyInstance) {
  app.addHook("preHandler", authMiddleware);
  app.post("/task", createTaskHandler);
  app.post("/task/:taskId/subtask", createSubtaskHandler);
  app.get("/tasks", listTasksHandler);
  app.patch("/tasks/:taskId", updateTaskHandler);
  app.delete("/tasks/:taskId/:subtaskId?", deleteTaskHandler);
}
