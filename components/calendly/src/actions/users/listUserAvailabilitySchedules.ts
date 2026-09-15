import { action, outputSchema } from "@prismatic-io/spectral";
import { listUserAvailabilitySchedulesOutputSchema } from "../../outputSchemas";
import { getCalendlyClient } from "../../client";
import { listUserAvailabilitySchedulesInputs } from "../../inputs";
import { listUserAvailabilitySchedulesExamplePayload } from "../../examplePayloads";
export const listUserAvailabilitySchedules = action({
  display: {
    label: "List User Availability Schedules",
    description: "Returns the availability schedules of the given user.",
  },
  performSafety: "safe",
  perform: async (context, { connection, user }) => {
    const client = getCalendlyClient(connection, context.debug.enabled);
    const { data } = await client.get("/user_availability_schedules", {
      params: {
        user,
      },
    });
    return { data };
  },
  inputs: listUserAvailabilitySchedulesInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listUserAvailabilitySchedulesOutputSchema,
  }),
  examplePayload: listUserAvailabilitySchedulesExamplePayload,
});
