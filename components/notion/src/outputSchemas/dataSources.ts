import {
  coverSchema,
  iconSchema,
  propertySchemaEntrySchema,
  richTextItemSchema,
  userReferenceSchema,
} from "./shared";
export const notionDataSourceObjectSchema = {
  type: "object" as const,
  properties: {
    object: { type: "string", enum: ["data_source"] },
    id: { type: "string" },
    created_time: { type: "string", format: "date-time" },
    last_edited_time: { type: "string", format: "date-time" },
    title: { type: "array", items: richTextItemSchema },
    properties: {
      type: "object" as const,
      additionalProperties: propertySchemaEntrySchema,
    },
    parent: {
      type: "object" as const,
      properties: {
        type: { type: "string" },
        database_id: { type: "string" },
      },
      required: [],
    },
    database_parent: {
      type: "object" as const,
      properties: {
        type: { type: "string" },
        page_id: { type: "string" },
      },
      required: [],
    },
    archived: { type: "boolean" },
    is_inline: { type: "boolean" },
    icon: iconSchema,
    cover: coverSchema,
    url: { type: "string" },
  },
  required: [],
};
export const createDataSourceOutputSchema = notionDataSourceObjectSchema;
export const retrieveDataSourceOutputSchema = notionDataSourceObjectSchema;
export const updateDataSourceOutputSchema = notionDataSourceObjectSchema;
export const listDataSourcesOutputSchema = {
  type: "object" as const,
  properties: {
    object: { type: "string", enum: ["list"] },
    results: { type: "array", items: notionDataSourceObjectSchema },
    next_cursor: { type: ["string", "null"] },
    has_more: { type: "boolean" },
    type: { type: "string" },
    page_or_database: { type: "object" as const },
  },
  required: [],
};
export const queryDataSourceOutputSchema = {
  type: "object" as const,
  properties: {
    object: { type: "string", enum: ["list"] },
    results: {
      type: "array",
      items: {
        type: "object" as const,
        properties: {
          object: { type: "string" },
          id: { type: "string" },
          created_time: { type: "string", format: "date-time" },
          last_edited_time: { type: "string", format: "date-time" },
          created_by: userReferenceSchema,
          last_edited_by: userReferenceSchema,
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
          icon: iconSchema,
          cover: coverSchema,
          url: { type: "string" },
          properties: {
            type: "object" as const,
            additionalProperties: true,
          },
        },
        required: [],
        additionalProperties: true,
      },
    },
    next_cursor: { type: ["string", "null"] },
    has_more: { type: "boolean" },
    type: { type: "string" },
    page_or_data_source: { type: "object" as const },
  },
  required: [],
};
