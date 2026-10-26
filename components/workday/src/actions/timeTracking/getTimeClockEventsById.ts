import { action, outputSchema } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { SERVICES } from "../../constants";
import { getTimeClockEventsByIdExamplePayload } from "../../examplePayloads";
import { getTimeClockEventsByIdInputs } from "../../inputs";
import { getTimeClockEventsByIdOutputSchema } from "../../outputSchemas";
export const getTimeClockEventsById = action({
  display: {
    label: "Get Time Clock Event by ID",
    description: "Retrieves a time clock event with the specified ID.",
  },
  performSafety: "safe",
  perform: async (context, { connection, timeClockEventId }) => {
    const client = getClient(connection, context.debug.enabled);
    const { data } = await client.get(
      `${SERVICES.timeTracking}/timeClockEvents/${timeClockEventId}`,
    );
    return {
      data,
    };
  },
  inputs: getTimeClockEventsByIdInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getTimeClockEventsByIdOutputSchema,
  }),
  examplePayload: getTimeClockEventsByIdExamplePayload,
});
