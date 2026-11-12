import { action, outputSchema } from "@prismatic-io/spectral";
import { listTemplateDocumentsOutputSchema } from "../../outputSchemas";
import { getDocuSignClient } from "../../client";
import { listTemplateDocumentsInputs } from "../../inputs";
import { listTemplateDocumentsExamplePayload } from "../../examplePayloads";

export const listTemplateDocuments = action({
  display: {
    label: "List Template Documents",
    description:
      "Retrieves a list of documents associated with the specified template.",
  },
  performSafety: "notAllowed",
  perform: async (context, { connection, templateId }) => {
    const client = await getDocuSignClient(
      connection,
      true,
      context.debug.enabled,
    );
    const { data } = await client.get(`/templates/${templateId}/documents`);
    return { data };
  },
  examplePerform: async () => listTemplateDocumentsExamplePayload,
  inputs: listTemplateDocumentsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listTemplateDocumentsOutputSchema,
  }),
  examplePayload: listTemplateDocumentsExamplePayload,
});
