import { FastifyReply, FastifyRequest } from "fastify";
import { AuthService } from "../services/auth.service";
import { UserRepository } from "../repository/user.repository";

export async function registerHandler(
  request: FastifyRequest<{ Body: { email: string; password: string } }>,
  reply: FastifyReply
) {
  const { email, password } = request.body;

  const service = new AuthService(new UserRepository(request.server.dynamo));

  const user = await service.register(email, password);

  const token = request.server.jwt.sign({
    userId: user.userId,
    accountId: user.accountId,
  });

  reply.code(201).send({ token });
}

export async function loginHandler(
  request: FastifyRequest<{ Body: { email: string; password: string } }>,
  reply: FastifyReply
) {
  const { email, password } = request.body;

  const service = new AuthService(new UserRepository(request.server.dynamo));

  const user = await service.login(email, password);

  const token = request.server.jwt.sign({
    userId: user.userId,
    accountId: user.accountId,
  });

  reply.send({ token });
}
