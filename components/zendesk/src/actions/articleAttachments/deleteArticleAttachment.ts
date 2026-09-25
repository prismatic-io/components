import { action, outputSchema } from "@prismatic-io/spectral";
import { rawHttpClient } from "../../auth";
import { deleteArticleAttachmentExamplePayload } from "../../examplePayloads";
import { deleteArticleAttachmentInputs } from "../../inputs";
import { deleteArticleAttachmentOutputSchema } from "../../outputSchemas";
export const deleteArticleAttachment = action({
  display: {
    label: "Delete Article Attachment",
    description: "Delete an existing article attachment.",
  },
  performSafety: "notAllowed",
  perform: async (context, { zendeskConnection, articleAttachmentId }) => {
    const client = rawHttpClient(zendeskConnection, context.debug.enabled);
    const { data } = await client.delete(
      `/help_center/articles/attachments/${articleAttachmentId}`,
    );
    return {
      data,
    };
  },
  examplePerform: async () => deleteArticleAttachmentExamplePayload,
  inputs: deleteArticleAttachmentInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: deleteArticleAttachmentOutputSchema,
  }),
  examplePayload: deleteArticleAttachmentExamplePayload,
});
