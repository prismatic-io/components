export const importSchema = {
  type: "object" as const,
  properties: {
    createdAt: { type: "string", format: "date-time" },
    id: { type: "string" },
    importName: { type: "string" },
    importRequestJson: { type: "object" as const },
    importSource: {
      type: "string",
      enum: [
        "API",
        "CRM_UI",
        "IMPORT",
        "MOBILE_ANDROID",
        "MOBILE_IOS",
        "SALESFORCE",
      ],
    },
    importTemplate: {
      type: "object" as const,
      properties: {
        templateId: { type: "integer" },
        templateType: {
          type: "string",
          enum: ["admin_defined", "previous_import", "user_file"],
        },
      },
      required: ["templateId", "templateType"],
    },
    mappedObjectTypeIds: { type: "array" as const, items: { type: "string" } },
    metadata: {
      type: "object" as const,
      properties: {
        counters: {
          type: "object" as const,
          additionalProperties: { type: "integer" },
        },
        fileIds: { type: "array" as const, items: { type: "string" } },
        objectLists: {
          type: "array" as const,
          items: {
            type: "object" as const,
            properties: {
              listId: { type: "string" },
              objectType: { type: "string" },
            },
            required: ["listId", "objectType"],
          },
        },
      },
      required: ["counters", "fileIds", "objectLists"],
    },
    optOutImport: { type: "boolean" },
    state: {
      type: "string",
      enum: [
        "CANCELED",
        "DEFERRED",
        "DONE",
        "FAILED",
        "PROCESSING",
        "REVERTED",
        "STARTED",
      ],
    },
    updatedAt: { type: "string", format: "date-time" },
  },
  required: [
    "createdAt",
    "id",
    "mappedObjectTypeIds",
    "metadata",
    "optOutImport",
    "state",
    "updatedAt",
  ],
};

export const listActiveImportsOutputSchema = {
  type: "array" as const,
  items: importSchema,
};

export const cancelImportOutputSchema = {
  type: "object" as const,
  properties: {
    completedAt: { type: "string", format: "date-time" },
    links: {
      type: "object" as const,
      additionalProperties: { type: "string" },
    },
    requestedAt: { type: "string", format: "date-time" },
    startedAt: { type: "string", format: "date-time" },
    status: {
      type: "string",
      enum: ["CANCELED", "COMPLETE", "PENDING", "PROCESSING"],
    },
  },
  required: ["completedAt", "startedAt", "status"],
};
