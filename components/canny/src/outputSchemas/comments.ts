import { commentSchema, idOnlySchema, successStringSchema } from "./shared";
export const listCommentsOutputSchema = {
  type: "object" as const,
  properties: {
    items: { type: "array", items: commentSchema },
    hasNextPage: { type: "boolean" },
    cursor: { type: "string" },
  },
  required: ["items", "hasNextPage", "cursor"],
  additionalProperties: true,
};
export const retrieveCommentOutputSchema = commentSchema;
export const createCommentOutputSchema = idOnlySchema;
export const deleteCommentOutputSchema = successStringSchema;
