import { bootstrapDynamoTables } from "../scripts/automaticTableCreation";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { FastifyPluginAsync } from "fastify";
import fp from "fastify-plugin";

declare module "fastify" {
  interface FastifyInstance {
    dynamo: DynamoDBDocumentClient;
  }
}

const dynamoPluginAsync: FastifyPluginAsync = async (app) => {
  const client = new DynamoDBClient({
    region: app.config.AWS_REGION,
    endpoint: app.config.AWS_DYNAMODB_ENDPOINT,
    credentials: {
      accessKeyId: app.config.AWS_ACCESS_KEY_ID,
      secretAccessKey: app.config.AWS_SECRET_ACCESS_KEY,
    },
  });
  await bootstrapDynamoTables(client, app.config.NODE_ENV);

  const docClient = DynamoDBDocumentClient.from(client, {
    marshallOptions: { removeUndefinedValues: true },
  });

  app.decorate("dynamo", docClient);
};

export const dynamoPlugin = fp(dynamoPluginAsync);
