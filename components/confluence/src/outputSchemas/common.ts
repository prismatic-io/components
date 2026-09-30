export const versionSchema = {
  type: "object" as const,
  properties: {
    createdAt: { type: "string", format: "date-time" },
    message: { type: "string" },
    number: { type: "integer" },
    minorEdit: { type: "boolean" },
    authorId: { type: ["string", "null"] },
  },
  required: ["createdAt", "number", "minorEdit"],
};
export const bodyRepresentationSchema = {
  type: "object" as const,
  properties: {
    representation: { type: "string" },
    value: { type: "string" },
  },
};
