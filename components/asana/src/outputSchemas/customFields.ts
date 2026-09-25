import {
  customFieldCompactSchema,
  enumOptionSchema,
  nextPageSchema,
  userCompactSchema,
} from "./shared";
export const customFieldResponseSchema = {
  type: "object" as const,
  properties: {
    data: {
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
        resource_subtype: {
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
        description: { type: "string" },
        is_global_to_workspace: { type: "boolean" },
        has_notifications_enabled: { type: "boolean" },
        is_value_read_only: { type: "boolean" },
        is_formula_field: { type: "boolean" },
        asana_created_field: { type: ["string", "null"] },
        enum_options: { type: "array", items: enumOptionSchema },
        precision: { type: "integer" },
        format: {
          type: "string",
          enum: [
            "currency",
            "identifier",
            "percentage",
            "custom",
            "duration",
            "none",
          ],
        },
        currency_code: { type: ["string", "null"] },
        custom_label: { type: ["string", "null"] },
        custom_label_position: {
          type: ["string", "null"],
          enum: ["prefix", "suffix"],
        },
        input_restrictions: {
          type: "array",
          items: {
            type: "string",
            enum: ["task", "project", "portfolio", "goal"],
          },
        },
        id_prefix: { type: ["string", "null"] },
        privacy_setting: {
          type: "string",
          enum: ["public_with_guests", "public", "private"],
        },
        default_access_level: {
          type: "string",
          enum: ["admin", "editor", "user"],
        },
        created_by: {
          type: ["object", "null"],
          properties: {
            gid: { type: "string" },
            resource_type: { type: "string" },
            name: { type: "string" },
          },
          additionalProperties: true,
        },
        text_value: { type: ["string", "null"] },
        html_text_value: { type: ["string", "null"] },
        number_value: { type: ["number", "null"] },
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
        people_value: { type: "array", items: userCompactSchema },
        reference_value: {
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
        display_value: { type: ["string", "null"] },
        enabled: { type: "boolean" },
      },
      required: [] as string[],
      additionalProperties: true,
    },
  },
  required: [] as string[],
  additionalProperties: true,
};
export const listCustomFieldsOutputSchema = {
  type: "object" as const,
  properties: {
    data: { type: "array", items: customFieldCompactSchema },
    next_page: nextPageSchema,
  },
  required: [] as string[],
  additionalProperties: true,
};
export const customFieldSettingResponseSchema = {
  type: "object" as const,
  properties: {
    data: {
      type: "object" as const,
      properties: {
        gid: { type: "string" },
        resource_type: { type: "string" },
        project: {
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
          additionalProperties: true,
        },
        is_important: { type: "boolean" },
        parent: {
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
          additionalProperties: true,
        },
        custom_field: customFieldCompactSchema,
      },
      required: [] as string[],
      additionalProperties: true,
    },
  },
  required: [] as string[],
  additionalProperties: true,
};
