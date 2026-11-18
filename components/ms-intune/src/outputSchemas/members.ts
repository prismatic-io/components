import { deleteResultSchema, odataCollectionSchema } from "./common";

export const listMembersFromGroupOutputSchema = {
  type: "object" as const,
  properties: {
    ...odataCollectionSchema.properties,
    value: {
      type: "array",
      items: {
        type: "object",
        properties: {
          "@odata.type": { type: "string" },
          id: { type: "string" },
          deletedDateTime: { type: ["string", "null"], format: "date-time" },
        },
        additionalProperties: true,
      },
    },
  },
  required: ["value"],
};

export const deleteMemberFromGroupOutputSchema = deleteResultSchema;

export const addMemberToGroupOutputSchema = {
  type: "object" as const,
  properties: { message: { type: "string" } },
  required: ["message"],
};

export const addMembersToGroupOutputSchema = addMemberToGroupOutputSchema;
