import { Task } from "@/domain/task.domain";
import {
  DeleteCommand,
  PutCommand,
  ScanCommand,
  UpdateCommand,
} from "@aws-sdk/lib-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const TABLE_NAME = "Tasks";

export class TaskRepository {
  constructor(private readonly db: DynamoDBDocumentClient) {}

  async create(task: Task): Promise<void> {
    await this.db.send(
      new PutCommand({
        TableName: TABLE_NAME,
        Item: {
          PK: "TASK",
          SK: `TASK#${task.id}`,
          entityType: "TASK",

          ...task,

          dueDate: task.dueDate?.toISOString() ?? null,
          createdAt: Date.now(),
          updatedAt: Date.now(),
        },
      })
    );
  }

  async list(): Promise<Task[]> {
    const result = await this.db.send(
      new ScanCommand({
        TableName: TABLE_NAME,
        FilterExpression: "entityType = :type",
        ExpressionAttributeValues: {
          ":type": "TASK",
        },
      })
    );

    console.log("tresult", result);

    return (result.Items ?? []).map((item) => ({
      id: item.id,
      name: item.name,
      dueDate: item.dueDate ? new Date(item.dueDate) : null,
      timeSelectionMode: item.timeSelectionMode,
      timeRange: item.timeRange,
      duration: item.duration,
      priority: item.priority,
      status: item.status,
      description: item.description,
    }));
  }

  async update(id: string, task: Partial<Task>) {
    const updateExpressions: string[] = [];
    const expressionAttributeNames: Record<string, string> = {};
    const expressionAttributeValues: Record<string, any> = {};

    const allowedFields: (keyof Task)[] = [
      "name",
      "dueDate",
      "timeSelectionMode",
      "timeRange",
      "duration",
      "priority",
      "status",
      "description",
    ];

    for (const field of allowedFields) {
      const value = task[field];
      if (value === undefined) continue;

      const nameKey = `#${field}`;
      const valueKey = `:${field}`;

      updateExpressions.push(`${nameKey} = ${valueKey}`);
      expressionAttributeNames[nameKey] = field;

      if (field === "dueDate") {
        expressionAttributeValues[valueKey] =
          value instanceof Date ? value.toISOString() : null;
      } else {
        expressionAttributeValues[valueKey] = value;
      }
    }

    updateExpressions.push("#updatedAt = :updatedAt");
    expressionAttributeNames["#updatedAt"] = "updatedAt";
    expressionAttributeValues[":updatedAt"] = Date.now();

    if (updateExpressions.length === 1) {
      throw new Error("No valid fields provided for update");
    }

    const result = await this.db.send(
      new UpdateCommand({
        TableName: TABLE_NAME,
        Key: {
          PK: "TASK",
          SK: `TASK#${id}`,
        },
        UpdateExpression: `SET ${updateExpressions.join(", ")}`,
        ExpressionAttributeNames: expressionAttributeNames,
        ExpressionAttributeValues: expressionAttributeValues,
        ReturnValues: "ALL_NEW",
        ConditionExpression: "attribute_exists(PK)",
      })
    );
    return result.Attributes as Task;
  }

  async delete(id: string) {
    const result = await this.db.send(
      new DeleteCommand({
        TableName: TABLE_NAME,
        Key: {
          PK: "TASK",
          SK: `TASK#${id}`,
        },
      })
    );
    return result;
  }
}
