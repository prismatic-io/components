import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getDealInputs } from "../../inputs";
import { WebhookVersion } from "../../constants";
import { getDealExamplePayload } from "../../examplePayloads";
import { getDealOutputSchema } from "../../outputSchemas";
export const getDeal = action({
  display: {
    label: "Get Deal",
    description: "Gets details of a deal.",
  },
  performSafety: "safe",
  perform: async (context, { connection, id }) => {
    const client = createClient(
      connection,
      context.debug.enabled,
      WebhookVersion.V2,
    );
    const { data } = await client.get(`/deals/${id}`);
    return { data };
  },
  inputs: getDealInputs,
  examplePayload: getDealExamplePayload,
  examplePerform: async () => getDealExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getDealOutputSchema,
  }),
});
