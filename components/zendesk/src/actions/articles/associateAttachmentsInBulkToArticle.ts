import { action, outputSchema } from "@prismatic-io/spectral";
import { rawHttpClient } from "../../auth";
import { associateAttachmentsInBulkToArticleExamplePayload } from "../../examplePayloads";
import { associateAttachmentsInBulkToArticleInputs } from "../../inputs";
import { associateAttachmentsInBulkToArticleOutputSchema } from "../../outputSchemas";
export const associateAttachmentsInBulkToArticle = action({
  display: {
    label: "Associate Attachments to Article",
    description:
      "Associate attachments in bulk to a single article, with a maximum of 20 attachments per request.",
  },
  performSafety: "notAllowed",
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
  examplePerform: async () => associateAttachmentsInBulkToArticleExamplePayload,
  inputs: associateAttachmentsInBulkToArticleInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: associateAttachmentsInBulkToArticleOutputSchema,
  }),
  examplePayload: associateAttachmentsInBulkToArticleExamplePayload,
});
