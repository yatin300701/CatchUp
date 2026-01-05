// src/types/fastify.d.ts
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

declare module "fastify" {
  interface FastifyInstance {
    dynamo: DynamoDBDocumentClient;
  }
}
