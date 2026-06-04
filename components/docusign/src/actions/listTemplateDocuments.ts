import { action } from "@prismatic-io/spectral";
import { getDocuSignClient } from "../client";
import { connection, templateId } from "../inputs";
import { listTemplateDocumentsPayload } from "../examplePayloads";

export const listTemplateDocuments = action({
  display: {
    label: "List Template Documents",
    description:
      "Retrieves a list of documents associated with the specified template.",
  },
  perform: async (context, { connection, templateId }) => {
    const client = await getDocuSignClient(
      connection,
      true,
      context.debug.enabled,
    );
    const { data } = await client.get(`/templates/${templateId}/documents`);
    return { data };
  },
  inputs: {
    connection,
    templateId,
  },
  examplePayload: listTemplateDocumentsPayload,
});
