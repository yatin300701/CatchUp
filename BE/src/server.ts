import Fastify from "fastify";
import { taskRoutes } from "./routes/task.routes";
import { dynamoPlugin } from "./plugings/dynamodb.plugin";
import { authRoutes } from "./routes/auth.routes";
import pingRoute from "./routes";
import jwtPlugin from "./plugings/jwt.plugin";
import fastifyEnvPlugin from "./plugings/fastifyEnv.plugin";
import sensible from "@fastify/sensible";

const fastify = Fastify({
  logger: true,
});

fastify.register(fastifyEnvPlugin);
fastify.register(dynamoPlugin);
fastify.register(jwtPlugin);
fastify.register(sensible);

fastify.ready();

fastify.register(pingRoute);
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
