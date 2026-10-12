import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getDealMailMessagesInputs } from "../../inputs";
import { getDealMailMessagesExamplePayload } from "../../examplePayloads";
import { getDealMailMessagesOutputSchema } from "../../outputSchemas";
export const getDealMailMessages = action({
  display: {
    label: "Get Deal Mail Messages",
    description: "Lists mail messages associated with a deal.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, id, pagination: { start, limit, cursor } = {} },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/deals/${id}/mailMessages`, {
      params: { start, limit, cursor },
    });
    return { data };
  },
  inputs: getDealMailMessagesInputs,
  examplePayload: getDealMailMessagesExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getDealMailMessagesOutputSchema,
  }),
});
