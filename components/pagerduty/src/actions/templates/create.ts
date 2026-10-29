import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { createTemplateExamplePayload } from "../../examplePayloads";
import { connectionInput, createTemplateObject } from "../../inputs";

export const createTemplate = action({
  display: {
    label: "Create Template",
    description: "Create a new template.",
  },
  perform: async (context, { connection, template }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.post(`/templates`, { template });
    return { data };
  },
  inputs: {
    connection: connectionInput,
    template: createTemplateObject,
  },
  examplePayload: createTemplateExamplePayload,
});
