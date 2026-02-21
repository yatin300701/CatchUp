import { FastifyInstance } from "fastify";
import {
  createTaskHandler,
  listTasksHandler,
} from "../../src/controllers/task.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

export async function taskRoutes(app: FastifyInstance) {
  app.addHook("preHandler", authMiddleware);
  app.post("/tasks", createTaskHandler);
  app.get("/tasks", listTasksHandler);
}
