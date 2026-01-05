import { FastifySchema } from "fastify";

export const createTaskSchema: FastifySchema = {
  body: {
    type: "object",
    required: ["name", "timeSelectionMode", "priority", "status"],
    properties: {
      name: { type: "string", minLength: 1 },

      dueDate: {
        type: ["string", "null"],
        format: "date-time",
      },

      timeSelectionMode: {
        type: "string",
        enum: ["range", "duration"],
      },

      timeRange: {
        type: "object",
        required: ["startTime", "endTime"],
        properties: {
          startTime: { type: "string" },
          endTime: { type: "string" },
        },
      },
      duration: { type: "string" },
      priority: {
        type: "string",
        enum: ["low", "medium", "high"],
      },
      status: {
        type: "string",
        enum: ["todo", "in progress", "done"],
      },
      description: { type: "string", minLength: 1 },
    },
    allOf: [
      {
        if: {
          properties: { timeSelectionMode: { const: "range" } },
        },
        then: { required: ["timeRange"] },
      },
      {
        if: {
          properties: { timeSelectionMode: { const: "duration" } },
        },
        then: { required: ["duration"] },
      },
    ],
  },
};

export const updateTaskSchema: FastifySchema = {
  params: {
    type: "object",
    required: ["id"],
    properties: {
      id: { type: "string" },
    },
  },
  body: {
    type: "object",
    properties: {
      name: { type: "string" },
      dueDate: {
        type: ["string", "null"],
        format: "date-time",
      },
      timeSelectionMode: {
        type: "string",
        enum: ["range", "duration"],
      },

      timeRange: {
        type: "object",
        required: ["startTime", "endTime"],
        properties: {
          startTime: { type: "string" },
          endTime: { type: "string" },
        },
      },
      duration: { type: "string" },
      priority: {
        type: "string",
        enum: ["low", "medium", "high"],
      },
      status: {
        type: "string",
        enum: ["todo", "in_progress", "done"],
      },
      description: { type: "string" },
    },
    allOf: [
      {
        if: {
          properties: { timeSelectionMode: { const: "range" } },
          required: ["timeSelectionMode"],
        },
        then: { required: ["timeRange"], not: { required: ["duration"] } },
      },
      {
        if: {
          properties: { timeSelectionMode: { const: "duration" } },
          required: ["timeSelectionMode"],
        },
        then: { required: ["duration"], not: { required: ["timeRange"] } },
      },
    ],
  },
};

export const deleteTaskSchema: FastifySchema = {
  params: {
    type: "object",
    required: ["id"],
    properties: {
      id: { type: "string" },
    },
  },
};
