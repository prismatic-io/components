import { emailsByIdSchema, responseEnvelopeSchema } from "./common";

export const updateEmployeeOutputSchema = {
  type: "object" as const,
  properties: {
    ...responseEnvelopeSchema.properties,
    "dry-run": { type: "boolean" },
    updatedEmployeesCount: { type: "number" },
    diff: {
      type: "object",
      properties: {
        diffToAdd: emailsByIdSchema,
        diffToRemove: emailsByIdSchema,
      },
    },
    securityGroupEmployeesMap: emailsByIdSchema,
    skippedEmployees: {
      type: "array",
      items: {
        type: "object",
        properties: {
          email: { type: "string" },
          reason: { type: "string" },
        },
      },
    },
  },
  required: ["responseCode"],
};
