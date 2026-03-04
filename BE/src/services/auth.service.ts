import { UserRepository } from "../repository/user.repository";
import { hashPassword, verifyPassword } from "../utils/password";
import { User } from "../domain/user.domain";
import { FastifyInstance, FastifyRequest } from "fastify";

export class AuthService {
  constructor(private readonly repo: UserRepository) {}

  async register(
    request: FastifyRequest<{
      Body: { email: string; password: string; name: string };
    }>,
    email: string,
    name: string,
    password: string,
  ) {
    const existing = await this.repo.findByEmail(email);
    if (existing) {
      throw request.server.httpErrors.conflict("User already exists");
    }
    const now = Date.now();
    const user: User = {
      email,
      name,
      passwordHash: await hashPassword(password),
      createdAt: now,
      updatedAt: now,
    };

    await this.repo.create(user);

    return {
      email,
      name,
    };
  }

  async login(
    request: FastifyRequest<{ Body: { email: string; password: string } }>,
    email: string,
    password: string,
  ) {
    const user = await this.repo.findByEmail(email);
    if (!user) {
      throw request.server.httpErrors.notFound("Email not found");
    }

    const valid = await verifyPassword(password, user.passwordHash);
    if (!valid) {
      throw request.server.httpErrors.unauthorized("Invalid password");
    }

    return {
      email: user.email,
      name: user.name,
    };
  }
}
