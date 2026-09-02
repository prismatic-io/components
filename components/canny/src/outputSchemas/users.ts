import { idOnlySchema, successStringSchema, userSchema } from "./shared";
export const listUsersOutputSchema = {
  type: "object" as const,
  properties: {
    users: { type: "array", items: userSchema },
    hasNextPage: { type: "boolean" },
    cursor: { type: "string" },
  },
  required: ["users", "hasNextPage", "cursor"],
  additionalProperties: true,
};
export const retrieveUserOutputSchema = userSchema;
export const createOrUpdateUserOutputSchema = idOnlySchema;
export const deleteUserOutputSchema = successStringSchema;
