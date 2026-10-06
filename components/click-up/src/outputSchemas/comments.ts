import { userRefSchema } from "./shared";
export const createTaskCommentOutputSchema = {
  type: "object" as const,
  properties: {
    id: { type: "string" },
    hist_id: { type: "string" },
    date: { type: "integer" },
  },
  required: ["id", "hist_id", "date"],
};
const commentAssigneeSchema = {
  ...userRefSchema,
  required: ["id", "username", "email", "color", "initials", "profilePicture"],
};
export const getTaskCommentsOutputSchema = {
  type: "object" as const,
  properties: {
    comments: {
      type: "array",
      items: {
        type: "object" as const,
        properties: {
          id: { type: "string" },
          comment: {
            type: "array",
            items: {
              type: "object" as const,
              properties: { text: { type: "string" } },
              required: ["text"],
            },
          },
          comment_text: { type: "string" },
          user: userRefSchema,
          resolved: { type: "boolean" },
          assignee: commentAssigneeSchema,
          assigned_by: commentAssigneeSchema,
          reactions: { type: "array", items: { type: "string" } },
          date: { type: "string" },
          reply_count: { type: "string" },
        },
        required: [
          "id",
          "comment",
          "comment_text",
          "user",
          "resolved",
          "assignee",
          "assigned_by",
          "reactions",
          "date",
        ],
      },
    },
  },
  required: ["comments"],
};
