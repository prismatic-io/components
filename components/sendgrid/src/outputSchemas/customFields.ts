export const getAllFieldDefinitionsOutputSchema = {
  type: "object" as const,
  properties: {
    custom_fields: {
      type: "array",
      items: {
        type: "object" as const,
        properties: {
          id: { type: "string" },
          name: { type: "string" },
          field_type: { type: "string", enum: ["Text", "Number", "Date"] },
        },
        required: ["id", "name", "field_type"],
      },
    },
    reserved_fields: {
      type: "array",
      items: {
        type: "object" as const,
        properties: {
          name: { type: "string" },
          field_type: { type: "string", enum: ["Text", "Number", "Date"] },
          read_only: { type: "boolean" },
        },
        required: ["name", "field_type"],
      },
    },
    _metadata: {
      type: "object" as const,
      properties: {
        prev: { type: "string" },
        self: { type: "string" },
        next: { type: "string" },
        count: { type: "number" },
      },
    },
    pagination: {
      type: "object" as const,
      properties: {
        nextPageToken: { type: "string" },
        previousPageToken: { type: "string" },
        totalCount: { type: "number" },
      },
    },
  },
  required: ["custom_fields", "reserved_fields"],
};
