export const userCompactSchema = {
  type: "object" as const,
  properties: {
    gid: { type: "string" },
    resource_type: { type: "string" },
    name: { type: "string" },
  },
  required: [] as string[],
  additionalProperties: true,
};
export const workspaceCompactSchema = {
  type: "object" as const,
  properties: {
    gid: { type: "string" },
    resource_type: { type: "string" },
    name: { type: "string" },
  },
  required: [] as string[],
  additionalProperties: true,
};
export const projectCompactSchema = {
  type: "object" as const,
  properties: {
    gid: { type: "string" },
    resource_type: { type: "string" },
    name: { type: "string" },
    resource_subtype: {
      type: "string",
      enum: ["default_project", "custom"],
    },
  },
  required: [] as string[],
  additionalProperties: true,
};
export const teamCompactSchema = {
  type: "object" as const,
  properties: {
    gid: { type: "string" },
    resource_type: { type: "string" },
    name: { type: "string" },
  },
  required: [] as string[],
  additionalProperties: true,
};
export const tagCompactSchema = {
  type: "object" as const,
  properties: {
    gid: { type: "string" },
    resource_type: { type: "string" },
    name: { type: "string" },
  },
  required: [] as string[],
  additionalProperties: true,
};
export const sectionCompactSchema = {
  type: "object" as const,
  properties: {
    gid: { type: "string" },
    resource_type: { type: "string" },
    name: { type: "string" },
  },
  required: [] as string[],
  additionalProperties: true,
};
export const taskCompactSchema = {
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
      type: ["object", "null"],
      properties: {
        gid: { type: "string" },
        resource_type: { type: "string" },
      },
      additionalProperties: true,
    },
  },
  required: [] as string[],
  additionalProperties: true,
};
export const asanaResourceSchema = {
  type: "object" as const,
  properties: {
    gid: { type: "string" },
    resource_type: { type: "string" },
  },
  required: [] as string[],
  additionalProperties: true,
};
export const enumOptionSchema = {
  type: "object" as const,
  properties: {
    gid: { type: "string" },
    resource_type: { type: "string" },
    name: { type: "string" },
    enabled: { type: "boolean" },
    color: { type: "string" },
  },
  required: [] as string[],
  additionalProperties: true,
};
export const likeSchema = {
  type: "object" as const,
  properties: {
    gid: { type: "string" },
    user: userCompactSchema,
  },
  required: [] as string[],
  additionalProperties: true,
};
export const statusUpdateCompactSchema = {
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
  },
  required: [] as string[],
  additionalProperties: true,
};
export const customFieldCompactSchema = {
  type: "object" as const,
  properties: {
    gid: { type: "string" },
    resource_type: { type: "string" },
    name: { type: "string" },
    type: {
      type: "string",
      enum: [
        "text",
        "enum",
        "multi_enum",
        "number",
        "date",
        "people",
        "reference",
      ],
    },
    enum_options: { type: "array", items: enumOptionSchema },
    enabled: { type: "boolean" },
    representation_type: {
      type: "string",
      enum: [
        "text",
        "enum",
        "multi_enum",
        "number",
        "date",
        "people",
        "formula",
        "custom_id",
        "reference",
      ],
    },
    id_prefix: { type: ["string", "null"] },
    input_restrictions: {
      type: "array",
      items: {
        type: "string",
        enum: ["task", "project", "portfolio", "goal"],
      },
    },
    is_formula_field: { type: "boolean" },
    date_value: {
      type: ["object", "null"],
      properties: {
        date: { type: "string" },
        date_time: { type: ["string", "null"] },
      },
      additionalProperties: true,
    },
    enum_value: {
      type: ["object", "null"],
      properties: {
        gid: { type: "string" },
        resource_type: { type: "string" },
        name: { type: "string" },
        enabled: { type: "boolean" },
        color: { type: "string" },
      },
      additionalProperties: true,
    },
    multi_enum_values: { type: "array", items: enumOptionSchema },
    number_value: { type: ["number", "null"] },
    text_value: { type: ["string", "null"] },
    display_value: { type: ["string", "null"] },
  },
  required: [] as string[],
  additionalProperties: true,
};
export const attachmentCompactSchema = {
  type: "object" as const,
  properties: {
    gid: { type: "string" },
    resource_type: { type: "string" },
    name: { type: "string" },
    resource_subtype: {
      type: "string",
      enum: [
        "asana",
        "dropbox",
        "gdrive",
        "onedrive",
        "box",
        "vimeo",
        "external",
      ],
    },
  },
  required: [] as string[],
  additionalProperties: true,
};
export const portfolioCompactSchema = {
  type: "object" as const,
  properties: {
    gid: { type: "string" },
    resource_type: { type: "string" },
    name: { type: "string" },
    resource_subtype: {
      type: "string",
      enum: ["default_portfolio", "custom"],
    },
  },
  required: [] as string[],
  additionalProperties: true,
};
export const projectTemplateCompactSchema = {
  type: "object" as const,
  properties: {
    gid: { type: "string" },
    resource_type: { type: "string" },
    name: { type: "string" },
  },
  required: [] as string[],
  additionalProperties: true,
};
export const customTypeCompactSchema = {
  type: "object" as const,
  properties: {
    gid: { type: "string" },
    resource_type: { type: "string" },
    name: { type: "string" },
    asana_created_type_identifier: { type: ["string", "null"] },
  },
  required: [] as string[],
  additionalProperties: true,
};
export const projectBriefCompactSchema = {
  type: "object" as const,
  properties: {
    gid: { type: "string" },
    resource_type: { type: "string" },
  },
  required: [] as string[],
  additionalProperties: true,
};
export const customFieldSettingSchema = {
  type: "object" as const,
  properties: {
    gid: { type: "string" },
    resource_type: { type: "string" },
    project: projectCompactSchema,
    is_important: { type: "boolean" },
    parent: projectCompactSchema,
    custom_field: customFieldCompactSchema,
  },
  required: [] as string[],
  additionalProperties: true,
};
export const taskMembershipSchema = {
  type: "object" as const,
  properties: {
    project: projectCompactSchema,
    section: sectionCompactSchema,
  },
  required: [] as string[],
  additionalProperties: true,
};
export const webhookFilterSchema = {
  type: "object" as const,
  properties: {
    resource_type: { type: "string" },
    resource_subtype: { type: ["string", "null"] },
    action: {
      type: "string",
      enum: ["changed", "added", "removed", "deleted", "undeleted"],
    },
    fields: { type: ["array", "null"], items: { type: "string" } },
  },
  required: [] as string[],
  additionalProperties: true,
};
export const nextPageSchema = {
  type: ["object", "null"],
  properties: {
    offset: { type: "string" },
    path: { type: "string" },
    uri: { type: "string" },
  },
  additionalProperties: true,
};
export const emptyResponseOutputSchema = {
  type: "object" as const,
  properties: {
    data: {
      type: "object" as const,
      properties: {},
      additionalProperties: true,
    },
  },
  required: [] as string[],
  additionalProperties: true,
};
export const deleteInstanceWebhooksOutputSchema = {
  type: "object" as const,
  properties: {},
  required: [] as string[],
  additionalProperties: true,
};
