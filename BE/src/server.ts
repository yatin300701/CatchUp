import Fastify from "fastify";
import { taskRoutes } from "./routes/task.routes";
import { dynamoPlugin } from "./plugings/dynamodb.plugin";
import { authRoutes } from "./routes/auth.routes";

const fastify = Fastify({
  logger: true,
});

fastify.register(dynamoPlugin);
fastify.ready();
fastify.register(authRoutes, { prefix: "/api" });
fastify.register(taskRoutes, { prefix: "/api" });

const start = async () => {
  try {
    await fastify.ready();
    await fastify.listen({ port: 3000 });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
