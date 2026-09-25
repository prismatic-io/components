import {
  customFieldCompactSchema,
  customFieldSettingSchema,
  nextPageSchema,
  portfolioCompactSchema,
  projectTemplateCompactSchema,
  userCompactSchema,
  workspaceCompactSchema,
} from "./shared";
export const portfolioResponseSchema = {
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
          enum: ["default_portfolio", "custom"],
        },
        archived: { type: "boolean" },
        color: {
          type: "string",
          enum: [
            "dark-pink",
            "dark-green",
            "dark-blue",
            "dark-red",
            "dark-teal",
            "dark-brown",
            "dark-orange",
            "dark-purple",
            "dark-warm-gray",
            "light-pink",
            "light-green",
            "light-blue",
            "light-red",
            "light-teal",
            "light-brown",
            "light-orange",
            "light-purple",
            "light-warm-gray",
          ],
        },
        start_on: { type: ["string", "null"], format: "date" },
        due_on: { type: ["string", "null"], format: "date" },
        default_access_level: {
          type: "string",
          enum: ["admin", "editor", "viewer"],
        },
        public: { type: "boolean" },
        created_at: { type: "string", format: "date-time" },
        created_by: userCompactSchema,
        custom_field_settings: {
          type: "array",
          items: customFieldSettingSchema,
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
        custom_fields: { type: "array", items: customFieldCompactSchema },
        members: { type: "array", items: userCompactSchema },
        owner: userCompactSchema,
        workspace: workspaceCompactSchema,
        permalink_url: { type: "string" },
        privacy_setting: {
          type: "string",
          enum: ["public_to_domain", "members_only"],
        },
        project_templates: {
          type: "array",
          items: projectTemplateCompactSchema,
        },
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
export const listPortfoliosOutputSchema = {
  type: "object" as const,
  properties: {
    data: { type: "array", items: portfolioCompactSchema },
    next_page: nextPageSchema,
  },
  required: [] as string[],
  additionalProperties: true,
};
export const listPortfolioItemsOutputSchema = {
  type: "object" as const,
  properties: {
    data: {
      type: "array",
      items: {
        type: "object" as const,
        properties: {
          gid: { type: "string" },
          resource_type: { type: "string" },
          name: { type: "string" },
        },
        additionalProperties: true,
      },
    },
    next_page: nextPageSchema,
  },
  required: [] as string[],
  additionalProperties: true,
};
