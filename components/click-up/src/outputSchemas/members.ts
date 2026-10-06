import { memberWithProfileSchema } from "./shared";
export const getListMembersOutputSchema = {
  type: "object" as const,
  properties: {
    members: { type: "array", items: memberWithProfileSchema },
  },
  required: ["members"],
};
export const getTaskMembersOutputSchema = getListMembersOutputSchema;
