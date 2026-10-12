import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getCallLogInputs } from "../../inputs";
import { getCallLogExamplePayload } from "../../examplePayloads";
import { getCallLogOutputSchema } from "../../outputSchemas";
export const getCallLog = action({
  display: {
    label: "Get Call Log",
    description: "Gets details of a call log.",
  },
  performSafety: "safe",
  perform: async (context, { connection, id }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/callLogs/${id}`);
    return { data };
  },
  inputs: getCallLogInputs,
  examplePayload: getCallLogExamplePayload,
  examplePerform: async () => getCallLogExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getCallLogOutputSchema,
  }),
});
