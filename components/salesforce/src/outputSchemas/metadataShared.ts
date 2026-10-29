const metadataErrorSchema = {
  type: "object",
  properties: {
    extendedErrorDetails: {
      type: "array",
      items: {
        type: "object",
        properties: { extendedErrorCode: { type: "string" } },
      },
    },
    fields: { type: "array", items: { type: "string" } },
    message: { type: "string" },
    statusCode: { type: "string" },
  },
};

export const metadataResultSchema = {
  type: "object" as const,
  properties: {
    errors: { type: "array", items: metadataErrorSchema },
    fullName: { type: "string" },
    success: { type: "boolean" },
  },
  required: ["success"],
};

const filePropertiesSchema = {
  type: "object" as const,
  properties: {
    createdById: { type: "string" },
    createdByName: { type: "string" },
    createdDate: { type: "string", format: "date-time" },
    fileName: { type: "string" },
    fullName: { type: "string" },
    id: { type: "string" },
    lastModifiedById: { type: "string" },
    lastModifiedByName: { type: "string" },
    lastModifiedDate: { type: "string", format: "date-time" },
    manageableState: { type: ["string", "null"] },
    namespacePrefix: { type: ["string", "null"] },
    type: { type: "string" },
  },
  required: [
    "createdById",
    "createdByName",
    "createdDate",
    "fileName",
    "fullName",
    "id",
    "lastModifiedById",
    "lastModifiedByName",
    "lastModifiedDate",
    "type",
  ],
};

export const filePropertiesListSchema = {
  type: "array" as const,
  items: filePropertiesSchema,
};
