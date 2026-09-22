import { coverSchema, iconSchema, richTextItemSchema } from "./shared";
export const notionDatabaseObjectSchema = {
  type: "object" as const,
  properties: {
    object: { type: "string", enum: ["database"] },
    id: { type: "string" },
    title: { type: "array", items: richTextItemSchema },
    parent: {
      type: "object" as const,
      properties: {
        type: { type: "string" },
        page_id: { type: "string" },
      },
      required: [],
    },
    is_inline: { type: "boolean" },
    in_trash: { type: "boolean" },
    is_locked: { type: "boolean" },
    created_time: { type: "string", format: "date-time" },
    last_edited_time: { type: "string", format: "date-time" },
    data_sources: {
      type: "array",
      items: {
        type: "object" as const,
        properties: {
          id: { type: "string" },
          name: { type: "string" },
        },
        required: [],
      },
    },
    icon: iconSchema,
    cover: coverSchema,
  },
  required: [],
};
export const retrieveDatabaseOutputSchema = notionDatabaseObjectSchema;
export const updatedCreateDatabaseOutputSchema = notionDatabaseObjectSchema;
export const updatedUpdateDatabaseOutputSchema = notionDatabaseObjectSchema;
