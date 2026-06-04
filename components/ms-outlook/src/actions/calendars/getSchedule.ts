import { action } from "@prismatic-io/spectral";
import type { ScheduleInformation } from "@microsoft/microsoft-graph-types";
import { createClient } from "../../client";
import { getScheduleExamplePayload } from "../../examplePayloads";
import { getScheduleInputs } from "../../inputs";
import type { ODataAttrs } from "../../types";
import { computeEndpointBasedOnConnection } from "../../util";

export const getSchedule = action({
  display: {
    label: "Get Schedule Availability",
    description: "Gets the free/busy availability information for a collection of users.",
  },
  inputs: getScheduleInputs,
  perform: async (context, params) => {
    const client = createClient(params.connection, context.debug.enabled);

    const payload = {
      availabilityViewInterval: params.availabilityViewInterval,
      schedules: params.schedules,
      startTime: {
        dateTime: params.start,
        timeZone: params.startTimezone,
      },
      endTime: {
        dateTime: params.end,
        timeZone: params.endTimezone,
      },
    };

    const { data } = await client.post<{ value: ScheduleInformation[] } & ODataAttrs>(
      computeEndpointBasedOnConnection(params.connection, "/me/calendar/getSchedule"),
      payload,
    );
    return { data };
  },
  examplePayload: getScheduleExamplePayload,
});
