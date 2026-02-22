import { FastifyInstance, FastifyPluginOptions } from "fastify";

async function routes(fastify: FastifyInstance, options: FastifyPluginOptions) {
  fastify.get("/ping", async (request, reply) => {
    return { pong: true };
  });
}

export default routes;
