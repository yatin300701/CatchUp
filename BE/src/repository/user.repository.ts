import {
  DynamoDBDocumentClient,
  PutCommand,
  QueryCommand,
} from "@aws-sdk/lib-dynamodb";
import { User } from "@/domain/user.domain";

export class UserRepository {
  constructor(
    private readonly db: DynamoDBDocumentClient,
    private readonly tableName = "Users",
  ) {}

  async create(user: User): Promise<void> {
    await this.db.send(
      new PutCommand({
        TableName: this.tableName,
        Item: user,
        ConditionExpression: "attribute_not_exists(email)",
      }),
    );
  }

  async findByEmail(email: string): Promise<User | null> {
    const res = await this.db.send(
      new QueryCommand({
        TableName: this.tableName,
        KeyConditionExpression: "email = :email",
        ExpressionAttributeValues: {
          ":email": email,
        },
      }),
    );

    return (res.Items?.[0] as User) ?? null;
  }
}
