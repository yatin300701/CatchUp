import {
  DynamoDBDocumentClient,
  PutCommand,
  QueryCommand,
  UpdateCommand,
  DeleteCommand,
  BatchWriteCommand,
} from "@aws-sdk/lib-dynamodb";

import { Task } from "@/domain/task.domain";

const MAX_BATCH_SIZE = 25;
const MAX_RETRIES = 8;
const BASE_DELAY = 50;

export class TaskRepository {
  constructor(
    private readonly db: DynamoDBDocumentClient,
    private readonly tableName = "Tasks",
  ) {}

  async create(task: Task): Promise<void> {
    await this.db.send(
      new PutCommand({
        TableName: this.tableName,
        Item: task,
      }),
    );
  }

  async listTasks(email: string): Promise<Task[]> {
    const expressionAttributeValues: Record<string, any> = {
      ":pk": email,
      ":sk": "TASK#",
    };

    const res = await this.db.send(
      new QueryCommand({
        TableName: this.tableName,
        KeyConditionExpression: "userId = :pk AND begins_with(taskId, :sk)",
        ExpressionAttributeValues: expressionAttributeValues,
      }),
    );

    return (res.Items ?? []) as Task[];
  }

  async update(
    pk: string,
    sk: string,
    updates: Partial<Pick<Task, "text" | "status">>,
  ): Promise<void> {
    const expressions: string[] = [];
    const values: Record<string, any> = {};
    const names: Record<string, string> = {};

    if (updates.text) {
      expressions.push("#text = :text");
      names["#text"] = "text";
      values[":text"] = updates.text;
    }

    if (updates.status) {
      expressions.push("#status = :status");
      names["#status"] = "status";
      values[":status"] = updates.status;
    }

    expressions.push("#lastUpdatedAt = :now");
    names["#lastUpdatedAt"] = "lastUpdatedAt";
    values[":now"] = Date.now();

    await this.db.send(
      new UpdateCommand({
        TableName: this.tableName,
        Key: { userId: pk, taskId: sk },
        UpdateExpression: `SET ${expressions.join(", ")}`,
        ExpressionAttributeValues: values,
        ExpressionAttributeNames: names,
      }),
    );
  }

  async delete(pk: string, sk: string): Promise<void> {
    await this.db.send(
      new DeleteCommand({
        TableName: this.tableName,
        Key: { userId: pk, taskId: sk },
      }),
    );
  }

  async listTaskKeysByPrefix(
    email: string,
    taskPrefix: string,
  ): Promise<string[]> {
    const res = await this.db.send(
      new QueryCommand({
        TableName: this.tableName,
        KeyConditionExpression: "userId = :pk AND begins_with(taskId, :sk)",
        ExpressionAttributeValues: {
          ":pk": email,
          ":sk": taskPrefix,
        },
        ProjectionExpression: "taskId",
      }),
    );

    return (res.Items ?? []).map((i) => i.taskId);
  }

  async batchDelete(email: string, taskIds: string[]): Promise<void> {
    const batches = this.chunk(taskIds, MAX_BATCH_SIZE);

    for (const batch of batches) {
      const requests = batch.map((taskId) => ({
        DeleteRequest: {
          Key: {
            userId: email,
            taskId,
          },
        },
      }));

      await this.executeBatchDelete(requests);
    }
  }

  private async executeBatchDelete(
    requests: any[],
    attempt = 0,
  ): Promise<void> {
    const res = await this.db.send(
      new BatchWriteCommand({
        RequestItems: {
          [this.tableName]: requests,
        },
      }),
    );

    const unprocessed = res.UnprocessedItems?.[this.tableName] ?? [];

    if (unprocessed.length === 0) return;

    if (attempt >= MAX_RETRIES) {
      throw new Error("Batch delete failed after retries");
    }

    const delay = this.calculateBackoff(attempt);

    await this.sleep(delay);

    await this.executeBatchDelete(unprocessed, attempt + 1);
  }

  private calculateBackoff(attempt: number): number {
    const exponential = BASE_DELAY * 2 ** attempt;
    const jitter = Math.random() * exponential;
    return exponential + jitter;
  }

  private sleep(ms: number): Promise<void> {
    return new Promise((r) => setTimeout(r, ms));
  }

  private chunk<T>(arr: T[], size: number): T[][] {
    const chunks: T[][] = [];

    for (let i = 0; i < arr.length; i += size) {
      chunks.push(arr.slice(i, i + size));
    }

    return chunks;
  }
}
