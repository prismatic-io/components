import {
  nextPageSchema,
  tagCompactSchema,
  userCompactSchema,
  workspaceCompactSchema,
} from "./shared";
export const tagResponseSchema = {
  type: "object" as const,
  properties: {
    data: {
      type: "object" as const,
      properties: {
        gid: { type: "string" },
        resource_type: { type: "string" },
        name: { type: "string" },
        color: { type: ["string", "null"] },
        notes: { type: "string" },
        created_at: { type: "string", format: "date-time" },
        followers: { type: "array", items: userCompactSchema },
        workspace: workspaceCompactSchema,
        permalink_url: { type: "string" },
      },
      required: [] as string[],
      additionalProperties: true,
    },
  },
  required: [] as string[],
  additionalProperties: true,
};
export const listTagsOutputSchema = {
  type: "object" as const,
  properties: {
    data: { type: "array", items: tagCompactSchema },
    next_page: nextPageSchema,
  },
  required: [] as string[],
  additionalProperties: true,
};
export const findTagByNameOutputSchema = {
  type: "object" as const,
  properties: {
    gid: { type: "string" },
    resource_type: { type: "string" },
    name: { type: "string" },
  },
  required: [] as string[],
  additionalProperties: true,
};
