import {
  asanaResourceSchema,
  customFieldCompactSchema,
  likeSchema,
  nextPageSchema,
  projectCompactSchema,
  tagCompactSchema,
  taskCompactSchema,
  taskMembershipSchema,
  userCompactSchema,
  workspaceCompactSchema,
} from "./shared";
export const taskResponseSchema = {
  type: "object" as const,
  properties: {
    data: {
      type: "object" as const,
      properties: {
        gid: { type: "string" },
        resource_type: { type: "string" },
        name: { type: "string" },
        resource_subtype: {
          type: "string",
          enum: ["default_task", "milestone", "approval", "custom"],
        },
        created_by: {
          type: "object" as const,
          properties: {
            gid: { type: "string" },
            resource_type: { type: "string" },
          },
          additionalProperties: true,
        },
        approval_status: {
          type: "string",
          enum: ["pending", "approved", "rejected", "changes_requested"],
        },
        assignee_status: {
          type: "string",
          enum: ["today", "upcoming", "later", "new", "inbox"],
        },
        assigned_by: {
          type: ["object", "null"],
          properties: {
            gid: { type: "string" },
            resource_type: { type: "string" },
            name: { type: "string" },
          },
          additionalProperties: true,
        },
        completed: { type: "boolean" },
        completed_at: {
          type: ["string", "null"],
          format: "date-time",
        },
        completed_by: {
          type: ["object", "null"],
          properties: {
            gid: { type: "string" },
            resource_type: { type: "string" },
            name: { type: "string" },
          },
          additionalProperties: true,
        },
        created_at: { type: "string", format: "date-time" },
        dependencies: { type: "array", items: asanaResourceSchema },
        dependents: { type: "array", items: asanaResourceSchema },
        due_at: { type: ["string", "null"], format: "date-time" },
        due_on: { type: ["string", "null"], format: "date" },
        external: {
          type: ["object", "null"],
          properties: {
            gid: { type: ["string", "null"] },
            data: { type: ["string", "null"] },
          },
          additionalProperties: true,
        },
        html_notes: { type: "string" },
        hearted: { type: "boolean" },
        hearts: { type: "array", items: likeSchema },
        is_rendered_as_separator: { type: "boolean" },
        liked: { type: "boolean" },
        likes: { type: "array", items: likeSchema },
        memberships: { type: "array", items: taskMembershipSchema },
        modified_at: { type: "string", format: "date-time" },
        notes: { type: "string" },
        num_hearts: { type: "integer" },
        num_likes: { type: "integer" },
        num_subtasks: { type: "integer" },
        start_at: { type: ["string", "null"], format: "date-time" },
        start_on: { type: ["string", "null"], format: "date" },
        actual_time_minutes: { type: ["number", "null"] },
        assignee: {
          type: ["object", "null"],
          properties: {
            gid: { type: "string" },
            resource_type: { type: "string" },
            name: { type: "string" },
          },
          additionalProperties: true,
        },
        assignee_section: {
          type: ["object", "null"],
          properties: {
            gid: { type: "string" },
            resource_type: { type: "string" },
            name: { type: "string" },
          },
          additionalProperties: true,
        },
        custom_fields: { type: "array", items: customFieldCompactSchema },
        custom_type: {
          type: ["object", "null"],
          properties: {
            gid: { type: "string" },
            resource_type: { type: "string" },
            name: { type: "string" },
            asana_created_type_identifier: {
              type: ["string", "null"],
            },
          },
          additionalProperties: true,
        },
        custom_type_status_option: { type: ["object", "null"] },
        followers: { type: "array", items: userCompactSchema },
        parent: {
          type: ["object", "null"],
          properties: {
            gid: { type: "string" },
            resource_type: { type: "string" },
            name: { type: "string" },
            resource_subtype: {
              type: "string",
              enum: ["default_task", "milestone", "approval", "custom"],
            },
            created_by: {
              type: ["object", "null"],
              properties: {
                gid: { type: "string" },
                resource_type: { type: "string" },
              },
              additionalProperties: true,
            },
          },
          additionalProperties: true,
        },
        projects: { type: "array", items: projectCompactSchema },
        effective_memberships: {
          type: "array",
          items: { type: "object" as const, additionalProperties: true },
        },
        tags: { type: "array", items: tagCompactSchema },
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
export const listTasksOutputSchema = {
  type: "object" as const,
  properties: {
    data: { type: "array", items: taskCompactSchema },
    next_page: nextPageSchema,
  },
  required: [] as string[],
  additionalProperties: true,
};
export const listSubtasksOutputSchema = {
  type: "object" as const,
  properties: {
    data: { type: "array", items: taskCompactSchema },
  },
  required: [] as string[],
  additionalProperties: true,
};
