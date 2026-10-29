import { action } from "@prismatic-io/spectral";
import { getDocuSignClient } from "../client";
import {
  connection,
  templateId,
  documentId,
  encrypt,
  fileType,
  showChanges,
} from "../inputs";

export const getTemplateDocument = action({
  display: {
    label: "Get Template Document",
    description:
      "This method retrieves one or more PDF documents from the template that you specify.",
  },
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
  inputs: {
    connection,
    templateId,
    documentId,
    encrypt,
    fileType,
    showChanges: {
      ...showChanges,
      comments:
        "When true, any document fields that a recipient changed are highlighted in yellow in the returned PDF document, and optional signatures or initials are outlined in red.",
    },
  },
});
