import { FastifyInstance } from "fastify";
import { registerHandler, loginHandler } from "../controllers/auth.controller";

export async function authRoutes(app: FastifyInstance) {
  app.post("/auth/register", registerHandler);
  app.post("/auth/login", loginHandler);
}
