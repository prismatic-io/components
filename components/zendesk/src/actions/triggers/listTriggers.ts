import { action, outputSchema } from "@prismatic-io/spectral";
import { rawHttpClient } from "../../auth";
import { listTriggersExamplePayload } from "../../examplePayloads";
import { listTriggersInputs } from "../../inputs";
import { listTriggersOutputSchema } from "../../outputSchemas";
import { fetchTriggers } from "../../util";
export const listTriggers = action({
  display: {
    label: "List Triggers",
    description: "List all workflow triggers configured in Zendesk.",
  },
  inputs: listTriggersInputs,
  performSafety: "notAllowed",
  perform: async (_context, params) => {
    const client = rawHttpClient(params.connection);
    const triggers = await fetchTriggers(client);
    return { data: triggers };
  },
  examplePerform: async () => listTriggersExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listTriggersOutputSchema,
  }),
  examplePayload: listTriggersExamplePayload,
});
