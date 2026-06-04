import { action } from "@prismatic-io/spectral";
import { rawHttpClient } from "../../auth";
import {
  connectionInput,
  locale,
  articleId,
  attachmentIds,
} from "../../inputs";
import { associateAttachmentsInBulkToArticlePayload } from "../../examplePayloads";

export const associateAttachmentsInBulkToArticle = action({
  display: {
    label: "Associate Attachments to Article",
    description:
      "Associate attachments in bulk to a single article, with a maximum of 20 attachments per request.",
  },
  perform: async (
    context,
    { zendeskConnection, locale, articleId, attachmentIds },
  ) => {
    const client = rawHttpClient(zendeskConnection, context.debug.enabled);
    const { data } = await client.post(
      `/help_center/${locale}/articles/${articleId}/bulk_attachments`,
      {
        attachment_ids: attachmentIds,
      },
    );

    return {
      data,
    };
  },
  inputs: {
    zendeskConnection: connectionInput,
    articleId,
    locale,
    attachmentIds,
  },
  examplePayload: {
    data: associateAttachmentsInBulkToArticlePayload,
  },
});
