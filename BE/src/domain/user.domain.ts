export interface User {
  pk: string;
  sk: string;

  userId: string;
  accountId: string;

  email: string;
  passwordHash: string;

  createdAt: string;
}
