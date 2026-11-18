export const odataCollectionSchema = {
  type: "object" as const,
  properties: {
    "@odata.context": { type: "string" },
    "@odata.nextLink": { type: "string" },
    "@odata.count": { type: "integer" },
  },
};

export const deleteResultSchema = {
  type: "object" as const,
  properties: {
    success: { type: "boolean", enum: [true] },
    id: { type: "string" },
    message: { type: "string" },
  },
  required: ["success", "id", "message"],
};

export const successResultSchema = {
  type: "object" as const,
  properties: {
    success: { type: "boolean", enum: [true] },
  },
  required: ["success"],
};
