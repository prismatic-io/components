import { action } from "@prismatic-io/spectral";
import { connectionInput, articleAttachmentId } from "../../inputs";
import { rawHttpClient } from "../../auth";
import { deleteArticleAttachmentPayload } from "../../examplePayloads";

export const deleteArticleAttachment = action({
  display: {
    label: "Delete Article Attachment",
    description: "Delete an existing article attachment.",
  },
  perform: async (context, { zendeskConnection, articleAttachmentId }) => {
    const client = rawHttpClient(zendeskConnection, context.debug.enabled);
    const { data } = await client.delete(
      `/help_center/articles/attachments/${articleAttachmentId}`,
    );

    return {
      data,
    };
  },
  inputs: {
    zendeskConnection: connectionInput,
    articleAttachmentId,
  },
  examplePayload: { data: deleteArticleAttachmentPayload },
});
