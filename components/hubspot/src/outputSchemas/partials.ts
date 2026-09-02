import { crmObjectSchema } from "./shared";
export const getContactOutputSchema = {
  type: "object" as const,
  properties: {
    id: { type: "string" },
    properties: {
      type: "object" as const,
      additionalProperties: { type: ["string", "null"] as string[] },
    },
    propertiesWithHistory: {
      type: ["object", "null"] as string[],
      additionalProperties: {
        type: "array" as const,
        items: {
          type: "object" as const,
          properties: {
            sourceId: { type: "string" },
            sourceType: { type: "string" },
            sourceLabel: { type: "string" },
            updatedByUserId: { type: "number" },
            value: { type: "string" },
            timestamp: { type: "string", format: "date-time" },
          },
        },
      },
    },
    createdAt: { type: "string", format: "date-time" },
    updatedAt: { type: "string", format: "date-time" },
    archived: { type: "boolean" },
    archivedAt: { type: ["string", "null"] as string[], format: "date-time" },
    total: { type: "integer" },
    results: { type: "array" as const, items: crmObjectSchema },
    paging: {
      type: ["object", "null"] as string[],
      properties: {
        next: {
          type: "object" as const,
          properties: { after: { type: "string" } },
        },
      },
    },
  },
  required: [] as string[],
  additionalProperties: true,
};
export const getCompanyOutputSchema = {
  properties: {
    id: { type: "string" },
    properties: {
      type: "object" as const,
      additionalProperties: { type: ["string", "null"] as string[] },
    },
    createdAt: { type: "string", format: "date-time" },
    updatedAt: { type: "string", format: "date-time" },
    archived: { type: "boolean" },
    archivedAt: { type: ["string", "null"] as string[], format: "date-time" },
  },
  required: [] as string[],
  additionalProperties: true,
};
export const getDealByIdOutputSchema = {
  properties: {
    id: { type: "string" },
    properties: {
      type: "object" as const,
      additionalProperties: { type: ["string", "null"] as string[] },
    },
    createdAt: { type: "string", format: "date-time" },
    updatedAt: { type: "string", format: "date-time" },
    archived: { type: "boolean" },
    archivedAt: { type: ["string", "null"] as string[], format: "date-time" },
  },
  required: [] as string[],
  additionalProperties: true,
};
export const getProductOutputSchema = {
  properties: {
    id: { type: "string" },
    properties: {
      type: "object" as const,
      additionalProperties: { type: ["string", "null"] as string[] },
    },
    createdAt: { type: "string", format: "date-time" },
    updatedAt: { type: "string", format: "date-time" },
    archived: { type: "boolean" },
    archivedAt: { type: ["string", "null"] as string[], format: "date-time" },
  },
  required: [] as string[],
  additionalProperties: true,
};
export const getLineItemOutputSchema = {
  properties: {
    id: { type: "string" },
    properties: {
      type: "object" as const,
      additionalProperties: { type: ["string", "null"] as string[] },
    },
    createdAt: { type: "string", format: "date-time" },
    updatedAt: { type: "string", format: "date-time" },
    archived: { type: "boolean" },
    archivedAt: { type: ["string", "null"] as string[], format: "date-time" },
  },
  required: [] as string[],
  additionalProperties: true,
};
