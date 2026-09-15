import { action, outputSchema } from "@prismatic-io/spectral";
import { listEventTypeAvailableTimesOutputSchema } from "../../outputSchemas";
import { getCalendlyClient } from "../../client";
import { listEventTypeAvailableTimesInputs } from "../../inputs";
import { listEventTypeAvailableTimesExamplePayload } from "../../examplePayloads";
export const listEventTypeAvailableTimes = action({
  display: {
    label: "List Event Type Available Times",
    description:
      "Returns a list of available times for an event type within a specified date range.",
  },
  performSafety: "safe",
  perform: async (context, { connection, endTime, eventType, startTime }) => {
    const client = getCalendlyClient(connection, context.debug.enabled);
    const { data } = await client.get("/event_type_available_times", {
      params: {
        end_time: endTime,
        event_type: eventType,
        start_time: startTime,
      },
    });
    return { data };
  },
  inputs: listEventTypeAvailableTimesInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listEventTypeAvailableTimesOutputSchema,
  }),
  examplePayload: listEventTypeAvailableTimesExamplePayload,
});
