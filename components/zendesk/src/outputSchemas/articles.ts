import {
  cursorLinksSchema,
  cursorMetaSchema,
  offsetPaginationProperties,
} from "./pagination";
export const articleSchema = {
  type: "object" as const,
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
    section_id: { type: "integer" },
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
};
export const associateAttachmentsInBulkToArticleOutputSchema = {
  type: ["string", "null"],
};
export const createArticleOutputSchema = {
  type: "object" as const,
  properties: { article: articleSchema },
  required: ["article"],
};
export const listArticlesOutputSchema = {
  type: "object" as const,
  properties: {
    articles: { type: "array", items: articleSchema },
    meta: cursorMetaSchema,
    links: cursorLinksSchema,
    ...offsetPaginationProperties,
  },
  required: ["articles"],
};
export const showArticleOutputSchema = {
  type: "object" as const,
  properties: { article: articleSchema },
  required: ["article"],
};
export const updateArticleOutputSchema = {
  type: "object" as const,
  properties: { article: articleSchema },
  required: ["article"],
};
