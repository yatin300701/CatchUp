import "@fastify/jwt";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { JwtPayload } from "./jwt";

declare module "fastify" {
  interface FastifyRequest {
    user: JwtPayload;
  }
  interface FastifyInstance {
    dynamo: DynamoDBDocumentClient;
  }
}

declare module "@fastify/jwt" {
  interface FastifyJWT {
    payload: JwtPayload;
    user: JwtPayload;
  }
}
