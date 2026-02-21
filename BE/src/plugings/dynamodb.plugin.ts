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
    region: "ap-south-1",
    endpoint: "http://localhost:4566",
    credentials: { accessKeyId: "local", secretAccessKey: "local" },
  });

  const docClient = DynamoDBDocumentClient.from(client, {
    marshallOptions: { removeUndefinedValues: true },
  });

  app.decorate("dynamo", docClient);
};

// Wrap with fp so the decorator is accessible globally
export const dynamoPlugin = fp(dynamoPluginAsync);
