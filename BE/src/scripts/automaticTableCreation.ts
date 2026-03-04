import {
  DynamoDBClient,
  CreateTableCommand,
  DescribeTableCommand,
  CreateTableCommandInput,
} from "@aws-sdk/client-dynamodb";

export const TABLES: CreateTableCommandInput[] = [
  {
    TableName: "Users",
    KeySchema: [{ AttributeName: "email", KeyType: "HASH" }],
    AttributeDefinitions: [{ AttributeName: "email", AttributeType: "S" }],
    BillingMode: "PAY_PER_REQUEST",
  },
];

export async function bootstrapDynamoTables(
  client: DynamoDBClient,
): Promise<void> {
  console.log(process.env.ENV);
  // if (process.env.ENV !== "development") return;

  for (const table of TABLES) {
    const exists = await tableExists(client, table.TableName!);

    if (!exists) {
      console.log(`Creating table: ${table.TableName}`);
      await client.send(new CreateTableCommand(table));
    } else {
      console.log(`Table already exists: ${table.TableName}`);
    }
  }
}

async function tableExists(
  client: DynamoDBClient,
  tableName: string,
): Promise<boolean> {
  try {
    await client.send(new DescribeTableCommand({ TableName: tableName }));
    return true;
  } catch (error: any) {
    if (error.name === "ResourceNotFoundException") {
      return false;
    }
    throw error;
  }
}
