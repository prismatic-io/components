import { action, outputSchema } from "@prismatic-io/spectral";
import { getArticleAttachmentInputs } from "../../inputs";
import { rawHttpClient } from "../../auth";
import { getArticleAttachmentOutputSchema } from "../../outputSchemas";
import type { ArticleAttachment } from "../../types";
import { getArticleAttachmentExamplePayload } from "../../examplePayloads";
export const getArticleAttachment = action({
  display: {
    label: "Get Article Attachment",
    description:
      "Get the properties of an attachment on an article in the Help Center.",
  },
  performSafety: "safe",
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
  inputs: getArticleAttachmentInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getArticleAttachmentOutputSchema,
  }),
  examplePayload: getArticleAttachmentExamplePayload,
});
