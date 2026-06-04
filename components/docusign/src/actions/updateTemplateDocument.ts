import { action } from "@prismatic-io/spectral";
import { getDocuSignClient } from "../client";
import { connection, jsonInput, templateId, documentId } from "../inputs";
import { templateDocument } from "../json/templateDocument";

export const updateTemplateDocument = action({
  display: {
    label: "Update Template Document",
    description: "This methods updates an existing template document.",
  },
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
  inputs: {
    connection,
    jsonInput: {
      ...jsonInput,
      required: true,
      default: JSON.stringify(templateDocument, null, 2),
      comments:
        "For extra fields, see https://developers.docusign.com/docs/esign-rest-api/reference/templates/templatedocuments/update/",
    },
    templateId,
    documentId,
  },
});
