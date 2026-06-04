import { action } from "@prismatic-io/spectral";
import { getDocuSignClient } from "../client";
import { connection, jsonInput } from "../inputs";
import { templateJson } from "../json/templateJson";
import { createTemplatePayload } from "../examplePayloads";

export const createTemplate = action({
  display: {
    label: "Create Template",
    description:
      "Creates one or more template definitions, using a multipart request for each template.",
  },
  perform: async (context, { connection, jsonInput }) => {
    const client = await getDocuSignClient(
      connection,
      true,
      context.debug.enabled,
    );
    const { data } = await client.post(`/templates`, jsonInput);
    return { data };
  },
  inputs: {
    connection,
    jsonInput: {
      ...jsonInput,
      required: true,
      default: JSON.stringify(templateJson, null, 2),
      comments:
        "For extra fields, see https://developers.docusign.com/docs/esign-rest-api/reference/templates/templates/create/",
    },
  },
  examplePayload: createTemplatePayload,
});
