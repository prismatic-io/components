import { action } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { SERVICES } from "../../constants";
import { deleteTimeClockEventsByIdExamplePayload } from "../../examplePayloads";
import { deleteTimeClockEventsByIdInputs } from "../../inputs";

export const deleteTimeClockEventsById = action({
  display: {
    label: "Delete Time Clock Event by ID",
    description: "Deletes a time clock event with the specified ID.",
  },
  perform: async (context, { connection, timeClockEventId }) => {
    const client = getClient(connection, context.debug.enabled);
    const { data } = await client.delete(
      `${SERVICES.timeTracking}/timeClockEvents/${timeClockEventId}`,
    );
    return {
      data,
    };
  },
  inputs: deleteTimeClockEventsByIdInputs,
  examplePayload: deleteTimeClockEventsByIdExamplePayload,
});
