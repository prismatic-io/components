import { action, outputSchema } from "@prismatic-io/spectral";
import { listUserBusyTimesOutputSchema } from "../../outputSchemas";
import { getCalendlyClient } from "../../client";
import { listUserBusyTimesInputs } from "../../inputs";
import { listUserBusyTimesExamplePayload } from "../../examplePayloads";
export const listUserBusyTimes = action({
  display: {
    label: "List User Busy Times",
    description:
      "Returns an ascending list of user internal and external scheduled events within a specified date range.",
  },
  performSafety: "safe",
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
  inputs: listUserBusyTimesInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listUserBusyTimesOutputSchema,
  }),
  examplePayload: listUserBusyTimesExamplePayload,
});
