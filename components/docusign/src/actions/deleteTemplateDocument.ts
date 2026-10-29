import { action } from "@prismatic-io/spectral";
import { getDocuSignClient } from "../client";
import { connection, templateId, documentIds } from "../inputs";

export const deleteTemplateDocument = action({
  display: {
    label: "Delete Template Document",
    description:
      "This method deletes one or more documents from an existing template.",
  },
  perform: async (context, { connection, templateId, documentIds }) => {
    const client = await getDocuSignClient(
      connection,
      true,
      context.debug.enabled,
    );
    const { data } = await client.delete(`/templates/${templateId}/documents`, {
      data: {
        documents: documentIds,
      },
    });
    return { data };
  },
  inputs: {
    connection,
    templateId,
    documentIds,
  },
});
