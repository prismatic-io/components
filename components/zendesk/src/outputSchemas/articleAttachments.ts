import {
  cursorLinksSchema,
  cursorMetaSchema,
  offsetPaginationProperties,
} from "./pagination";
export const articleAttachmentSchema = {
  type: "object" as const,
  properties: {
    article_id: { type: "integer" },
    content_type: { type: "string" },
    content_url: { type: "string" },
    created_at: { type: "string" },
    file: { type: "object" },
    file_name: { type: "string" },
    guide_media_id: { type: "string" },
    id: { type: "integer" },
    inline: { type: "boolean" },
    locale: { type: "string" },
    size: { type: "integer" },
    updated_at: { type: "string" },
    url: { type: "string" },
  },
};
export const createArticleAttachmentOutputSchema = {
  type: "object" as const,
  properties: { article_attachment: articleAttachmentSchema },
  required: ["article_attachment"],
};
export const deleteArticleAttachmentOutputSchema = { type: "string" as const };
export const getArticleAttachmentOutputSchema = {
  type: "object" as const,
  properties: { article_attachment: articleAttachmentSchema },
  required: ["article_attachment"],
};
export const listArticleAttachmentsOutputSchema = {
  type: "object" as const,
  properties: {
    article_attachments: { type: "array", items: articleAttachmentSchema },
    meta: cursorMetaSchema,
    links: cursorLinksSchema,
    ...offsetPaginationProperties,
  },
  required: ["article_attachments"],
};
