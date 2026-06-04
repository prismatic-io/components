import { action } from "@prismatic-io/spectral";
import {
  apiVersionInput,
  articleSysId,
  attachmentSysId,
  connection,
  instanceUrlInput,
} from "../../inputs";
import { getKnowledgeManagementApiClient } from "../../util";

export const getKnowledgeArticleAttachment = action({
  display: {
    label: "Get Knowledge Article Attachment",
    description: "Returns a knowledge article attachment as a file.",
  },
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
  inputs: {
    connection,
    instanceUrlInput,
    apiVersionInput,
    articleSysId,
    attachmentSysId,
  },
});
