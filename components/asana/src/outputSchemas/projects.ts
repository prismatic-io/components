import {
  customFieldCompactSchema,
  customFieldSettingSchema,
  nextPageSchema,
  projectCompactSchema,
  teamCompactSchema,
  userCompactSchema,
  workspaceCompactSchema,
} from "./shared";
export const projectResponseSchema = {
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
          enum: ["default_project", "custom"],
        },
        archived: { type: "boolean" },
        color: { type: ["string", "null"] },
        icon: { type: ["string", "null"] },
        created_at: { type: "string", format: "date-time" },
        current_status: {
          type: ["object", "null"],
          additionalProperties: true,
        },
        current_status_update: {
          type: ["object", "null"],
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
          },
          additionalProperties: true,
        },
        custom_field_settings: {
          type: "array",
          items: customFieldSettingSchema,
        },
        custom_fields: { type: "array", items: customFieldCompactSchema },
        default_view: {
          type: "string",
          enum: ["list", "board", "calendar", "timeline"],
        },
        due_date: { type: ["string", "null"], format: "date" },
        due_on: { type: ["string", "null"], format: "date" },
        html_notes: { type: "string" },
        members: { type: "array", items: userCompactSchema },
        modified_at: { type: "string", format: "date-time" },
        notes: { type: "string" },
        public: { type: "boolean" },
        privacy_setting: {
          type: "string",
          enum: ["public_to_workspace", "private_to_team", "private"],
        },
        start_on: { type: ["string", "null"], format: "date" },
        default_access_level: {
          type: "string",
          enum: ["admin", "editor", "commenter", "viewer"],
        },
        minimum_access_level_for_customization: {
          type: "string",
          enum: ["admin", "editor"],
        },
        minimum_access_level_for_sharing: {
          type: "string",
          enum: ["admin", "editor"],
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
        followers: { type: "array", items: userCompactSchema },
        owner: {
          type: ["object", "null"],
          properties: {
            gid: { type: "string" },
            resource_type: { type: "string" },
            name: { type: "string" },
          },
          additionalProperties: true,
        },
        team: teamCompactSchema,
        permalink_url: { type: "string" },
        project_brief: {
          type: ["object", "null"],
          properties: {
            gid: { type: "string" },
            resource_type: { type: "string" },
          },
          additionalProperties: true,
        },
        created_from_template: {
          type: ["object", "null"],
          properties: {
            gid: { type: "string" },
            resource_type: { type: "string" },
            name: { type: "string" },
          },
          additionalProperties: true,
        },
        workspace: workspaceCompactSchema,
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
      },
      required: [] as string[],
      additionalProperties: true,
    },
  },
  required: [] as string[],
  additionalProperties: true,
};
export const listProjectsOutputSchema = {
  type: "object" as const,
  properties: {
    data: { type: "array", items: projectCompactSchema },
    next_page: nextPageSchema,
  },
  required: [] as string[],
  additionalProperties: true,
};
