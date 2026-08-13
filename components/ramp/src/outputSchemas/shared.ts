export const pageSchema = {
  type: ["object", "null"],
  properties: {
    next: {
      type: ["string", "null"],
    },
  },
  required: ["next"],
};
export const deleteResponseSchema = {
  type: "string",
  enum: ["Deleted successfully"],
};
