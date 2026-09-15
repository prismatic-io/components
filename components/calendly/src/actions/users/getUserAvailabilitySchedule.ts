import { action, outputSchema } from "@prismatic-io/spectral";
import { getUserAvailabilityScheduleOutputSchema } from "../../outputSchemas";
import { getCalendlyClient } from "../../client";
import { getUserAvailabilityScheduleInputs } from "../../inputs";
import { getUserAvailabilityScheduleExamplePayload } from "../../examplePayloads";
export const getUserAvailabilitySchedule = action({
  display: {
    label: "Get User Availability Schedule",
    description: "Returns the availability schedule of the given UUID.",
  },
  performSafety: "safe",
  perform: async (context, { connection, uuid }) => {
    const client = getCalendlyClient(connection, context.debug.enabled);
    const { data } = await client.get(`/user_availability_schedules/${uuid}`);
    return { data };
  },
  inputs: getUserAvailabilityScheduleInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getUserAvailabilityScheduleOutputSchema,
  }),
  examplePayload: getUserAvailabilityScheduleExamplePayload,
});
