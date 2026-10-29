import { action } from "@prismatic-io/spectral";
import { getDocuSignClient } from "../client";
import { connection, jsonInput, templateId } from "../inputs";
import { templateJson } from "../json/templateJson";
import { updateTemplatePayload } from "../examplePayloads";

export const updateTemplate = action({
  display: {
    label: "Update Template",
    description: "Updates an existing template.",
  },
  perform: async (context, { connection, jsonInput, templateId }) => {
    const client = await getDocuSignClient(
      connection,
      true,
      context.debug.enabled,
    );
    const { data } = await client.put(`/templates/${templateId}`, jsonInput);
    return { data };
  },
  inputs: {
    connection,
    jsonInput: {
      ...jsonInput,
      required: true,
      default: JSON.stringify(templateJson, null, 2),
      comments:
        "For extra fields, see https://developers.docusign.com/docs/esign-rest-api/reference/templates/templates/update/",
    },
    templateId,
  },
  examplePayload: updateTemplatePayload,
});
