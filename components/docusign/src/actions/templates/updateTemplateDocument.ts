import { action, outputSchema } from "@prismatic-io/spectral";
import { updateTemplateDocumentOutputSchema } from "../../outputSchemas";
import { getDocuSignClient } from "../../client";
import { updateTemplateDocumentInputs } from "../../inputs";
import { updateTemplateDocumentExamplePayload } from "../../examplePayloads";

export const updateTemplateDocument = action({
  display: {
    label: "Update Template Document",
    description: "This methods updates an existing template document.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, jsonInput, templateId, documentId },
  ) => {
    const client = await getDocuSignClient(
      connection,
      true,
      context.debug.enabled,
    );
    const { data } = await client.put(
      `/templates/${templateId}/documents/${documentId}`,
      jsonInput,
    );
    return { data };
  },
  examplePerform: async () => updateTemplateDocumentExamplePayload,
  inputs: updateTemplateDocumentInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: updateTemplateDocumentOutputSchema,
  }),
  examplePayload: updateTemplateDocumentExamplePayload,
});
