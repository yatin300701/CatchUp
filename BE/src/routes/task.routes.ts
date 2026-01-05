import { FastifyInstance } from "fastify";
import {
  createTaskHandler,
  deleteTaskHandler,
  listTasksHandler,
  updateTaskHandler,
} from "../controllers/task.controller";
import {
  createTaskSchema,
  deleteTaskSchema,
  updateTaskSchema,
} from "../schemas/task.schema";

export async function taskRoutes(app: FastifyInstance) {
  if (!app.dynamo) {
    throw new Error("Dynamo not available in taskRoutes");
  }
  app.post("/tasks", { schema: createTaskSchema }, createTaskHandler);
  app.get("/tasks", listTasksHandler);
  app.patch("/tasks/:id", { schema: updateTaskSchema }, updateTaskHandler);
  app.delete("/tasks/:id", { schema: deleteTaskSchema }, deleteTaskHandler);
}
