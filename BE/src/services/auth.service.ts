import crypto from "node:crypto";
import { UserRepository } from "../repository/user.repository";
import { hashPassword, verifyPassword } from "../utils/password";
import { User } from "../domain/user.domain";

export class AuthService {
  constructor(private readonly repo: UserRepository) {}

  async register(email: string, password: string) {
    const existing = await this.repo.findByEmail(email);
    if (existing) {
      throw new Error("User already exists");
    }

    const userId = crypto.randomUUID();
    const accountId = crypto.randomUUID();
    const now = new Date().toISOString();

    const user: User = {
      pk: `ACCOUNT#${accountId}`,
      sk: `USER#${userId}`,

      userId,
      accountId,
      email,
      passwordHash: await hashPassword(password),
      createdAt: now,
    };

    await this.repo.create(user);

    return {
      userId,
      accountId,
      email,
    };
  }

  async login(email: string, password: string) {
    const user = await this.repo.findByEmail(email);
    if (!user) {
      throw new Error("Invalid credentials");
    }

    const valid = await verifyPassword(password, user.passwordHash);
    if (!valid) {
      throw new Error("Invalid credentials");
    }

    return {
      userId: user.userId,
      accountId: user.accountId,
    };
  }
}
