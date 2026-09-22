import {
  coverSchema,
  iconSchema,
  pagePropertyValueSchema,
  userReferenceSchema,
} from "./shared";
export const notionPageObjectSchema = {
  type: "object" as const,
  properties: {
    object: { type: "string", enum: ["page"] },
    id: { type: "string" },
    created_time: { type: "string", format: "date-time" },
    last_edited_time: { type: "string", format: "date-time" },
    created_by: userReferenceSchema,
    last_edited_by: userReferenceSchema,
    cover: coverSchema,
    icon: iconSchema,
    parent: {
      type: "object" as const,
      properties: {
        type: { type: "string" },
        data_source_id: { type: "string" },
        database_id: { type: "string" },
      },
      required: [],
    },
    archived: { type: "boolean" },
    properties: {
      type: "object" as const,
      additionalProperties: pagePropertyValueSchema,
    },
    url: { type: "string" },
    public_url: { type: ["string", "null"] },
  },
  required: [],
};
export const createPageOutputSchema = notionPageObjectSchema;
export const getPageOutputSchema = notionPageObjectSchema;
export const createDatabaseItemOutputSchema = notionPageObjectSchema;
export const listPagesOutputSchema = {
  type: "object" as const,
  properties: {
    object: { type: "string", enum: ["list"] },
    results: { type: "array", items: notionPageObjectSchema },
    next_cursor: { type: ["string", "null"] },
    has_more: { type: "boolean" },
    type: { type: "string" },
    page_or_database: { type: "object" as const },
  },
  required: [],
};
