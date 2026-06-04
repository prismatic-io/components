import { action } from "@prismatic-io/spectral";
import { getCalendlyClient } from "../../client";
import { connection, uuid } from "../../inputs";
import { getUserAvailabilityScheduleExamplePayload } from "../../examplePayloads";

export const getUserAvailabilitySchedule = action({
  display: {
    label: "Get User Availability Schedule",
    description:
      "This will return the availability schedule of the given UUID.",
  },
  perform: async (context, { connection, uuid }) => {
    const client = getCalendlyClient(connection, context.debug.enabled);

    const { data } = await client.get(`/user_availability_schedules/${uuid}`);
    return { data };
  },
  inputs: {
    connection,
    uuid: { ...uuid, comments: "The UUID of the availability schedule." },
  },
  examplePayload: getUserAvailabilityScheduleExamplePayload,
});
