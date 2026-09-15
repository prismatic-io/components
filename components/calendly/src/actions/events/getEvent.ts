import { action, outputSchema } from "@prismatic-io/spectral";
import { getEventOutputSchema } from "../../outputSchemas";
import { getCalendlyClient } from "../../client";
import { getEventInputs } from "../../inputs";
import { getEventExamplePayload } from "../../examplePayloads";
export const getEvent = action({
  display: {
    label: "Get Event",
    description: "Returns information about a specified Event.",
  },
  performSafety: "safe",
  perform: async (context, { connection, uuid }) => {
    const client = getCalendlyClient(connection, context.debug.enabled);
    const { data } = await client.get(`/scheduled_events/${uuid}`);
    return { data };
  },
  inputs: getEventInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getEventOutputSchema,
  }),
  examplePayload: getEventExamplePayload,
});
