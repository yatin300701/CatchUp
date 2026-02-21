import { JwtPayload } from "@/types/jwt";
import fastifyJwt from "@fastify/jwt";
import { FastifyInstance } from "fastify";
import fp from "fastify-plugin";

declare module "fastify" {
  interface FastifyRequest {
    user: JwtPayload;
  }
}

export default fp(async (app: FastifyInstance) => {
  app.register(fastifyJwt, {
    secret: process.env.JWT_SECRET!,
  });
});
