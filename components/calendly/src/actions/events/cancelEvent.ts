import { action, outputSchema } from "@prismatic-io/spectral";
import { cancelEventOutputSchema } from "../../outputSchemas";
import { getCalendlyClient } from "../../client";
import { cancelEventInputs } from "../../inputs";
import { cancelEventExamplePayload } from "../../examplePayloads";
export const cancelEvent = action({
  display: {
    label: "Cancel Event",
    description: "Cancels specified event.",
  },
  performSafety: "notAllowed",
  perform: async (context, { connection, uuid, reason }) => {
    const client = getCalendlyClient(connection, context.debug.enabled);
    const body: {
      reason?: string;
    } = {};
    if (reason) {
      body.reason = reason;
    }
    const { data } = await client.post(
      `/scheduled_events/${uuid}/cancellation`,
      body,
    );
    return { data };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => ({
    data: cancelEventExamplePayload.data,
  }),
  inputs: cancelEventInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: cancelEventOutputSchema,
  }),
  examplePayload: cancelEventExamplePayload,
});
