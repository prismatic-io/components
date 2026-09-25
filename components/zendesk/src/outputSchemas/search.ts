import {
  cursorLinksSchema,
  cursorMetaSchema,
  offsetPaginationProperties,
} from "./pagination";
import { postSchema } from "./posts";
export const searchArticlesOutputSchema = {
  type: "object" as const,
  properties: {
    results: {
      type: "array",
      items: {
        type: "object",
        properties: {
          author_id: { type: "integer" },
          body: { type: "string" },
          comments_disabled: { type: "boolean" },
          content_tag_ids: { type: "array", items: { type: "string" } },
          created_at: { type: "string" },
          draft: { type: "boolean" },
          edited_at: { type: "string" },
          html_url: { type: "string" },
          id: { type: "integer" },
          label_names: { type: "array", items: { type: "string" } },
          locale: { type: "string" },
          outdated: { type: "boolean" },
          outdated_locales: { type: "array", items: { type: "string" } },
          permission_group_id: { type: "integer" },
          position: { type: "integer" },
          promoted: { type: "boolean" },
          result_type: { type: "string" },
          section_id: { type: "integer" },
          snippet: { type: "string" },
          source_locale: { type: "string" },
          title: { type: "string" },
          updated_at: { type: "string" },
          url: { type: "string" },
          user_segment_id: { type: ["integer", "null"] },
          user_segment_ids: { type: "array", items: { type: "integer" } },
          vote_count: { type: "integer" },
          vote_sum: { type: "integer" },
        },
        required: ["locale", "permission_group_id", "title"],
      },
    },
    ...offsetPaginationProperties,
  },
  required: ["results"],
};
export const searchPostsOutputSchema = {
  type: "object" as const,
  properties: {
    results: { type: "array", items: postSchema },
    ...offsetPaginationProperties,
  },
  required: ["results"],
};
export const unifiedSearchOutputSchema = {
  type: "object" as const,
  properties: {
    results: {
      type: "array",
      items: {
        type: "object",
        properties: {
          title: { type: "string" },
          type: {
            type: "string",
            enum: ["ARTICLE", "POST", "EXTERNAL_RECORD"],
          },
          updated_at: { type: "string", format: "date-time" },
          url: { type: "string" },
        },
        required: [],
        additionalProperties: true,
      },
    },
    meta: cursorMetaSchema,
    links: cursorLinksSchema,
  },
  required: ["results"],
};
