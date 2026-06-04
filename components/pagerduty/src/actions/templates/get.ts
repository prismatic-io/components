import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getTemplateExamplePayload } from "../../examplePayloads";
import { connectionInput, templateId } from "../../inputs";

export const getTemplate = action({
  display: {
    label: "Get Template",
    description: "Retrieve a template by ID.",
  },
  perform: async (context, { connection, id }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/templates/${id}`);
    return { data };
  },
  inputs: {
    connection: connectionInput,
    id: templateId,
  },
  examplePayload: getTemplateExamplePayload,
});
