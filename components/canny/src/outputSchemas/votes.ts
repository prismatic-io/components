import { successStringSchema, voteSchema } from "./shared";
export const listVotesOutputSchema = {
  type: "object" as const,
  properties: {
    items: { type: "array", items: voteSchema },
    hasNextPage: { type: "boolean" },
    cursor: { type: "string" },
  },
  required: ["items", "hasNextPage", "cursor"],
  additionalProperties: true,
};
export const retrieveVoteOutputSchema = voteSchema;
export const createVoteOutputSchema = successStringSchema;
export const deleteVoteOutputSchema = successStringSchema;
