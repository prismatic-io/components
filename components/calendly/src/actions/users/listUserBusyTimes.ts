import { action } from "@prismatic-io/spectral";
import { getCalendlyClient } from "../../client";
import { connection, endTime, startTime, user } from "../../inputs";
import { listUserBusyTimesExamplePayload } from "../../examplePayloads";

export const listUserBusyTimes = action({
  display: {
    label: "List User Busy Times",
    description:
      "Returns an ascending list of user internal and external scheduled events within a specified date range.",
  },
  perform: async (context, { connection, endTime, startTime, user }) => {
    const client = getCalendlyClient(connection, context.debug.enabled);

    const { data } = await client.get("/user_busy_times", {
      params: {
        endTime,
        startTime,
        user,
      },
    });
    return { data };
  },
  inputs: {
    connection,
    user: {
      ...user,
      required: true,
      comments: "The uri associated with the user",
    },
    endTime: {
      ...endTime,
      comments: "End time of the requested availability range",
    },
    startTime: {
      ...startTime,
      comments: "Start time of the requested availability range",
    },
  },
  examplePayload: listUserBusyTimesExamplePayload,
});
