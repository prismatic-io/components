import { nullableString, userSummarySchema } from "./shared";

export const getCurrentUserOutputSchema = {
  type: "object" as const,
  properties: {
    userById: {
      type: ["object", "null"],
      properties: {
        ...userSummarySchema.properties,
        primaryCompany: {
          type: ["object", "null"],
          properties: { id: nullableString, name: nullableString },
          required: ["id", "name"],
        },
      },
      required: ["lastName", "email", "firstName", "id", "primaryCompany"],
    },
  },
  required: ["userById"],
};
