import { action, outputSchema } from "@prismatic-io/spectral";
import { deleteScheduledEventDataOutputSchema } from "../../outputSchemas";
import { getCalendlyClient } from "../../client";
import { deleteScheduledEventDataInputs } from "../../inputs";
import { deleteScheduledEventDataExamplePayload } from "../../examplePayloads";
export const deleteScheduledEventData = action({
  display: {
    label: "Delete Scheduled Event Data",
    description:
      "Submits a request to remove scheduled events data within a time range for the organization.",
  },
  performSafety: "notAllowed",
  perform: async (context, { connection, startTime, endTime }) => {
    const client = getCalendlyClient(connection, context.debug.enabled);
    const { data } = await client.post("/data_compliance/deletion/events", {
      start_time: startTime,
      end_time: endTime,
    });
    return { data };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => ({
    data: deleteScheduledEventDataExamplePayload.data,
  }),
  inputs: deleteScheduledEventDataInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: deleteScheduledEventDataOutputSchema,
  }),
  examplePayload: deleteScheduledEventDataExamplePayload,
});
