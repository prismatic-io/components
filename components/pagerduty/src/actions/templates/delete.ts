import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { NO_RESPONSE_SUCCESSFULL_PAYLOAD } from "../../examplePayloads";
import { connectionInput, templateId } from "../../inputs";

export const deleteTemplate = action({
  display: {
    label: "Delete Template",
    description: "Delete a template by ID.",
  },
  perform: async (context, { connection, id }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.delete(`/templates/${id}`);
    return { data };
  },
  inputs: {
    connection: connectionInput,
    id: templateId,
  },
  examplePayload: {
    data: NO_RESPONSE_SUCCESSFULL_PAYLOAD,
  },
});
