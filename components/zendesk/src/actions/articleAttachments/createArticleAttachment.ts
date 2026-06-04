import { action } from "@prismatic-io/spectral";
import {
  articleId,
  connectionInput,
  file,
  fileName,
  inline,
} from "../../inputs";
import { rawHttpClient } from "../../auth";
import type { ArticleAttachment } from "../../types";
import { createArticleAttachmentPayload } from "../../examplePayloads";
import FormData from "form-data";

export const createArticleAttachment = action({
  display: {
    label: "Create Article Attachment",
    description: "Create an attachment for an article in the Help Center.",
  },
  perform: async (
    context,
    { zendeskConnection, file, articleId, inline, fileName },
  ) => {
    const client = rawHttpClient(zendeskConnection, context.debug.enabled);

    const formData = new FormData();
    formData.append("inline", inline.toString());
    formData.append("file", file?.data, fileName);

    const { data } = await client.post<{
      article_attachment: ArticleAttachment;
    }>(`/help_center/articles/${articleId}/attachments`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return {
      data,
    };
  },
  inputs: {
    zendeskConnection: connectionInput,
    fileName: {
      ...fileName,
      example: "file.jpg",
      placeholder: "file.jpg",
    },
    file: {
      ...file,
      comments: "The File Attachment to upload.",
      required: true,
    },
    inline,
    articleId,
  },
  examplePayload: {
    data: createArticleAttachmentPayload,
  },
});
