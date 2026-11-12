import { action } from "@prismatic-io/spectral";
import { getDocuSignClient } from "../../client";
import { getTemplateDocumentInputs } from "../../inputs";

export const getTemplateDocument = action({
  display: {
    label: "Get Template Document",
    description:
      "Retrieves one or more PDF documents from the specified template.",
  },
  performSafety: "safe",
  perform: async (
    context,
    { connection, templateId, documentId, encrypt, fileType, showChanges },
  ) => {
    const client = await getDocuSignClient(
      connection,
      true,
      context.debug.enabled,
    );
    const { data } = await client.get(
      `/templates/${templateId}/documents/${documentId}`,
      {
        params: {
          encrypt,
          file_type: fileType || undefined,
          show_changes: showChanges,
        },
      },
    );
    return { data };
  },
  inputs: getTemplateDocumentInputs,
});
