import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getPersonMailMessagesInputs } from "../../inputs";
import { getPersonMailMessagesExamplePayload } from "../../examplePayloads";
import { getPersonMailMessagesOutputSchema } from "../../outputSchemas";

export const getPersonMailMessages = action({
  display: {
    label: "Get Person Mail Messages",
    description: "Lists mail messages associated with a person.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, id, pagination: { start, limit } = {} },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/persons/${id}/mailMessages`, {
      params: { start, limit },
    });
    return { data };
  },
  inputs: getPersonMailMessagesInputs,
  examplePayload: getPersonMailMessagesExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getPersonMailMessagesOutputSchema,
  }),
});
