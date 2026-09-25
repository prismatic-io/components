import {
  likeSchema,
  nextPageSchema,
  statusUpdateCompactSchema,
} from "./shared";
export const statusUpdateResponseSchema = {
  type: "object" as const,
  properties: {
    data: {
      type: "object" as const,
      properties: {
        gid: { type: "string" },
        resource_type: { type: "string" },
        title: { type: "string" },
        resource_subtype: {
          type: "string",
          enum: [
            "project_status_update",
            "portfolio_status_update",
            "goal_status_update",
          ],
        },
        text: { type: "string" },
        html_text: { type: ["string", "null"] },
        status_type: {
          type: "string",
          enum: [
            "on_track",
            "at_risk",
            "off_track",
            "on_hold",
            "complete",
            "achieved",
            "partial",
            "missed",
            "dropped",
          ],
        },
        author: {
          type: ["object", "null"],
          properties: {
            gid: { type: "string" },
            resource_type: { type: "string" },
            name: { type: "string" },
          },
          additionalProperties: true,
        },
        created_at: { type: "string", format: "date-time" },
        created_by: {
          type: ["object", "null"],
          properties: {
            gid: { type: "string" },
            resource_type: { type: "string" },
            name: { type: "string" },
          },
          additionalProperties: true,
        },
        hearted: { type: ["boolean", "null"] },
        hearts: {
          type: ["array", "null"],
          items: likeSchema,
        },
        liked: { type: ["boolean", "null"] },
        likes: {
          type: ["array", "null"],
          items: likeSchema,
        },
        reaction_summary: {
          type: ["array", "null"],
          items: {
            type: "object" as const,
            properties: {
              emoji_base: { type: "string" },
              variant: { type: "string" },
              count: { type: "number" },
              reacted: { type: "boolean" },
            },
            additionalProperties: true,
          },
        },
        modified_at: { type: ["string", "null"], format: "date-time" },
        num_hearts: { type: ["integer", "null"] },
        num_likes: { type: ["integer", "null"] },
        parent: {
          type: ["object", "null"],
          properties: {
            gid: { type: "string" },
            resource_type: { type: "string" },
            name: { type: "string" },
            resource_subtype: {
              type: "string",
              enum: ["default_project", "custom"],
            },
          },
          additionalProperties: true,
        },
      },
      required: [] as string[],
      additionalProperties: true,
    },
  },
  required: [] as string[],
  additionalProperties: true,
};
export const listStatusUpdatesOutputSchema = {
  type: "object" as const,
  properties: {
    data: { type: "array", items: statusUpdateCompactSchema },
    next_page: nextPageSchema,
  },
  required: [] as string[],
  additionalProperties: true,
};
