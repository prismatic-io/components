import { action } from "@prismatic-io/spectral";
import { getCalendlyClient } from "../../client";
import { connection, startTime, endTime } from "../../inputs";
import { deleteInviteeDataExamplePayload } from "../../examplePayloads";

export const deleteScheduledEventData = action({
  display: {
    label: "Delete Scheduled Event Data",
    description:
      "To submit a request to remove scheduled events data within a time range for your organization, use this endpoint.",
  },
  perform: async (context, { connection, startTime, endTime }) => {
    const client = getCalendlyClient(connection, context.debug.enabled);

    const { data } = await client.post("/data_compliance/deletion/events", {
      start_time: startTime,
      end_time: endTime,
    });
    return { data };
  },
  inputs: {
    connection,
    startTime,
    endTime,
  },
  examplePayload: deleteInviteeDataExamplePayload,
});
