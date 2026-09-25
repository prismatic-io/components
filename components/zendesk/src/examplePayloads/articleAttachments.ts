import { paginationAttributes } from "./general";
const getArticleAttachmentRaw = {
  article_attachment: {
    article_id: 23,
    content_type: "application/jpeg",
    content_url:
      "https://company.zendesk.com/hc/article_attachments/200109629/logo.jpg",
    file_name: "logo.jpg",
    id: 1428,
    inline: true,
    size: 1428,
  },
};
const listArticleAttachmentsRaw = {
  ...paginationAttributes,
  article_attachments: [
    {
      article_id: 23,
      content_type: "application/jpeg",
      content_url:
        "https://company.zendesk.com/hc/article_attachments/200109629/logo.jpg",
      file_name: "logo.jpg",
      id: 1428,
      inline: true,
      size: 1428,
    },
  ],
};
const createArticleAttachmentRaw = {
  article_attachment: listArticleAttachmentsRaw.article_attachments[0],
};
const deleteArticleAttachmentRaw = "";
export const createArticleAttachmentExamplePayload = {
  data: createArticleAttachmentRaw,
};
export const deleteArticleAttachmentExamplePayload = {
  data: deleteArticleAttachmentRaw,
};
export const getArticleAttachmentExamplePayload = {
  data: getArticleAttachmentRaw,
};
export const listArticleAttachmentsExamplePayload = {
  data: listArticleAttachmentsRaw,
};
