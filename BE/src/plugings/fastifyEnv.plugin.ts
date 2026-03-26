import { FastifyInstance } from "fastify";
import fastifyEnv from "@fastify/env";
import fp from "fastify-plugin";

declare module "fastify" {
  interface FastifyInstance {
    config: {
      APP_PORT: number;
      AWS_REGION: string;
      AWS_ACCESS_KEY_ID: string;
      AWS_SECRET_ACCESS_KEY: string;
      JWT_SECRET: string;
      NODE_ENV: string;
        ENV: string;
      AWS_DYNAMODB_ENDPOINT: string;
    };
  }
}

const schema = {
  type: "object",
  required: [
    "APP_PORT",
    "AWS_REGION",
    "AWS_ACCESS_KEY_ID",
    "AWS_SECRET_ACCESS_KEY",
    "JWT_SECRET",
  ],
  properties: {
    APP_PORT: {
      type: "number",
      default: 3000,
    },

    AWS_REGION: {
      type: "string",
    },

    AWS_ACCESS_KEY_ID: {
      type: "string",
    },

    AWS_SECRET_ACCESS_KEY: {
      type: "string",
    },

    JWT_SECRET: {
      type: "string",
    },

    NODE_ENV: {
      type: "string",
      default: "development",
    },

    ENV: {
      type: "string",
      default: "development",
    },

    AWS_DYNAMODB_ENDPOINT: {
      type: "string",
      default: "http://localhost:4566",
    },
  },
};

const fastifyEnvPlugin = async (app: FastifyInstance) => {
  await app.register(fastifyEnv, {
    dotenv: true,
    schema,
    confKey: "config",
  });
};

export default fp(fastifyEnvPlugin, {
  name: "fastify-env",
});
