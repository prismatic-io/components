import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { updateTemplateExamplePayload } from "../../examplePayloads";
import {
  connectionInput,
  templateId,
  updateTemplateObject,
} from "../../inputs";

export const updateTemplate = action({
  display: {
    label: "Update Template",
    description: "Update an existing template.",
  },
  perform: async (context, { connection, id, template }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.put(`/templates/${id}`, { template });
    return { data };
  },
  inputs: {
    connection: connectionInput,
    id: templateId,
    template: updateTemplateObject,
  },
  examplePayload: updateTemplateExamplePayload,
});
