import { idOnlySchema, postSchema, successStringSchema } from "./shared";
export const listPostsOutputSchema = {
  type: "object" as const,
  properties: {
    posts: { type: "array", items: postSchema },
    hasMore: { type: "boolean" },
  },
  required: ["posts", "hasMore"],
  additionalProperties: true,
};
export const retrievePostOutputSchema = postSchema;
export const createPostOutputSchema = idOnlySchema;
export const updatePostOutputSchema = successStringSchema;
export const deletePostOutputSchema = successStringSchema;
export const changePostStatusOutputSchema = postSchema;
