import { action } from "@prismatic-io/spectral";
import { getCalendlyClient } from "../../client";
import {
  connection,
  endTime,
  eventType,
  organization,
  startTime,
} from "../../inputs";
import { listEventTypeAvailableTimesExamplePayload } from "../../examplePayloads";

export const listEventTypeAvailableTimes = action({
  display: {
    label: "List Event Type Available Times",
    description:
      "Returns a list of available times for an event type within a specified date range.",
  },
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
  inputs: {
    connection,
    organization: { ...organization, dataSource: "organizations" },
    endTime: {
      ...endTime,
      required: true,
      comments: "End time of the requested availability range.",
    },
    eventType,
    startTime: {
      ...startTime,
      required: true,
      comments: "Start time of the requested availability range.",
    },
  },
  examplePayload: listEventTypeAvailableTimesExamplePayload,
});
