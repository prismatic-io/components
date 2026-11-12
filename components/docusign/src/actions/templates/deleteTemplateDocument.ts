import { action, outputSchema } from "@prismatic-io/spectral";
import { deleteTemplateDocumentOutputSchema } from "../../outputSchemas";
import { getDocuSignClient } from "../../client";
import { deleteTemplateDocumentInputs } from "../../inputs";
import { deleteTemplateDocumentExamplePayload } from "../../examplePayloads";

export const deleteTemplateDocument = action({
  display: {
    label: "Delete Template Document",
    description:
      "This method deletes one or more documents from an existing template.",
  },
  performSafety: "notAllowed",
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
  examplePerform: async () => deleteTemplateDocumentExamplePayload,
  inputs: deleteTemplateDocumentInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: deleteTemplateDocumentOutputSchema,
  }),
  examplePayload: deleteTemplateDocumentExamplePayload,
});
