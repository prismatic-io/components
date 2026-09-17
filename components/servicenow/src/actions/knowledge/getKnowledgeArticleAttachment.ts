import { action } from "@prismatic-io/spectral";
import { getKnowledgeArticleAttachmentInputs } from "../../inputs";
import { getKnowledgeManagementApiClient } from "../../util";
export const getKnowledgeArticleAttachment = action({
  display: {
    label: "Get Knowledge Article Attachment",
    description: "Returns a knowledge article attachment as a file.",
  },
  performSafety: "safe",
  perform: async (
    context,
    {
      connection,
      instanceUrlInput,
      apiVersionInput,
      articleSysId,
      attachmentSysId,
    },
  ) => {
    const client = getKnowledgeManagementApiClient(
      connection,
      instanceUrlInput,
      apiVersionInput,
      context.debug.enabled,
    );
    const { data } = await client.get(
      `/knowledge/articles/${articleSysId}/attachments/${attachmentSysId}`,
    );
    return {
      data,
    };
  },
  inputs: getKnowledgeArticleAttachmentInputs,
});
