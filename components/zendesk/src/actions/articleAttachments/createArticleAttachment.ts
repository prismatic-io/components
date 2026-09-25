import { action, outputSchema } from "@prismatic-io/spectral";
import { rawHttpClient } from "../../auth";
import { createArticleAttachmentExamplePayload } from "../../examplePayloads";
import { createArticleAttachmentInputs } from "../../inputs";
import { createArticleAttachmentOutputSchema } from "../../outputSchemas";
import type { ArticleAttachment } from "../../types";
export const createArticleAttachment = action({
  display: {
    label: "Create Article Attachment",
    description: "Create an attachment for an article in the Help Center.",
  },
  performSafety: "notAllowed",
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
  examplePerform: async (_context, { articleId, fileName, inline }) => ({
    data: {
      ...createArticleAttachmentExamplePayload.data,
      article_attachment: {
        ...createArticleAttachmentExamplePayload.data.article_attachment,
        ...(articleId ? { article_id: articleId } : {}),
        ...(fileName ? { file_name: fileName } : {}),
        inline,
      },
    },
  }),
  inputs: createArticleAttachmentInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: createArticleAttachmentOutputSchema,
  }),
  examplePayload: createArticleAttachmentExamplePayload,
});
