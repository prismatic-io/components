import { action, outputSchema } from "@prismatic-io/spectral";
import { getEventTypeOutputSchema } from "../../outputSchemas";
import { getCalendlyClient } from "../../client";
import { getEventTypeInputs } from "../../inputs";
import { getEventTypeExamplePayload } from "../../examplePayloads";
export const getEventType = action({
  display: {
    label: "Get Event Type",
    description: "Returns information about a specified Event Type.",
  },
  performSafety: "safe",
  perform: async (context, { connection, uuid }) => {
    const client = getCalendlyClient(connection, context.debug.enabled);
    const { data } = await client.get(`/event_types/${uuid}`);
    return { data };
  },
  inputs: getEventTypeInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getEventTypeOutputSchema,
  }),
  examplePayload: getEventTypeExamplePayload,
});
