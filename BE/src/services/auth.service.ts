import { UserRepository } from "../repository/user.repository";
import { hashPassword, verifyPassword } from "../utils/password";
import { User } from "../domain/user.domain";

export class AuthService {
  constructor(private readonly repo: UserRepository) {}

  async register(email: string, name: string, password: string) {
    const existing = await this.repo.findByEmail(email);
    if (existing) {
      throw new Error("User already exists");
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
      email: user.email,
      name: user.name,
    };
  }
}
