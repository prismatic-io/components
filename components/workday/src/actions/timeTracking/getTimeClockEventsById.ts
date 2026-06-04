import { action } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { SERVICES } from "../../constants";
import { getTimeClockEventsByIdExamplePayload } from "../../examplePayloads";
import { getTimeClockEventsByIdInputs } from "../../inputs";

export const getTimeClockEventsById = action({
  display: {
    label: "Get Time Clock Event by ID",
    description: "Retrieves a time clock event with the specified ID.",
  },
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
  examplePayload: getTimeClockEventsByIdExamplePayload,
});
