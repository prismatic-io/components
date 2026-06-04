import { action } from "@prismatic-io/spectral";
import { connectionInput, articleId, articleAttachmentId } from "../../inputs";
import { rawHttpClient } from "../../auth";
import type { ArticleAttachment } from "../../types";
import { getArticleAttachmentPayload } from "../../examplePayloads";

export const getArticleAttachment = action({
  display: {
    label: "Get Article Attachment",
    description:
      "Get the properties of an attachment on an article in the Help Center.",
  },
  perform: async (
    context,
    { zendeskConnection, articleId, articleAttachmentId },
  ) => {
    const client = rawHttpClient(zendeskConnection, context.debug.enabled);
    const { data } = await client.get<{
      article_attachment: ArticleAttachment;
    }>(`/help_center/articles/${articleId}/attachments/${articleAttachmentId}`);

    return {
      data,
    };
  },
  inputs: {
    zendeskConnection: connectionInput,
    articleId,
    articleAttachmentId,
  },
  examplePayload: {
    data: getArticleAttachmentPayload,
  },
});
