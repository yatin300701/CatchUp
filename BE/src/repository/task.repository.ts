import {
  DynamoDBDocumentClient,
  PutCommand,
  QueryCommand,
  UpdateCommand,
  DeleteCommand,
} from "@aws-sdk/lib-dynamodb";
import { Task } from "@/domain/task.domain";

export class TaskRepository {
  constructor(
    private readonly db: DynamoDBDocumentClient,
    private readonly tableName = "Tasks"
  ) {}

  async create(task: Task): Promise<void> {
    await this.db.send(
      new PutCommand({
        TableName: this.tableName,
        Item: task,
      })
    );
  }

  async listTasks(accountId: string): Promise<Task[]> {
    const res = await this.db.send(
      new QueryCommand({
        TableName: this.tableName,
        KeyConditionExpression: "pk = :pk AND begins_with(sk, :sk)",
        ExpressionAttributeValues: {
          ":pk": accountId,
          ":sk": "TASK#",
        },
      })
    );

    return (res.Items ?? []) as Task[];
  }

  async update(
    pk: string,
    sk: string,
    updates: Partial<Pick<Task, "name" | "status">>
  ): Promise<void> {
    const expressions: string[] = [];
    const values: Record<string, any> = {};

    if (updates.name) {
      expressions.push("name = :name");
      values[":name"] = updates.name;
    }

    if (updates.status) {
      expressions.push("status = :status");
      values[":status"] = updates.status;
    }

    expressions.push("lastUpdatedAt = :now");
    values[":now"] = new Date().toISOString();

    await this.db.send(
      new UpdateCommand({
        TableName: this.tableName,
        Key: { pk, sk },
        UpdateExpression: `SET ${expressions.join(", ")}`,
        ExpressionAttributeValues: values,
      })
    );
  }

  async delete(pk: string, sk: string): Promise<void> {
    await this.db.send(
      new DeleteCommand({
        TableName: this.tableName,
        Key: { pk, sk },
      })
    );
  }
}
