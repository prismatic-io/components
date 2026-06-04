import { action } from "@prismatic-io/spectral";
import { getDocuSignClient } from "../client";
import { connection, templateId } from "../inputs";
import { getTemplatePayload } from "../examplePayloads";

export const getTemplate = action({
  display: {
    label: "Get Template",
    description: "Retrieves the definition of the specified template.",
  },
  perform: async (context, { connection, templateId }) => {
    const client = await getDocuSignClient(
      connection,
      true,
      context.debug.enabled,
    );
    const { data } = await client.get(`/templates/${templateId}`);
    return { data };
  },
  inputs: {
    connection,
    templateId,
  },
  examplePayload: getTemplatePayload,
});
