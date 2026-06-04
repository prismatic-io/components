import { action } from "@prismatic-io/spectral";
import { getCalendlyClient } from "../../client";
import { connection, user } from "../../inputs";
import { listUserAvailabilitySchedulesExamplePayload } from "../../examplePayloads";

export const listUserAvailabilitySchedules = action({
  display: {
    label: "List User Availability Schedules",
    description: "Returns the availability schedules of the given user.",
  },
  perform: async (context, { connection, user }) => {
    const client = getCalendlyClient(connection, context.debug.enabled);

    const { data } = await client.get("/user_availability_schedules", {
      params: {
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
      comments: "A URI reference to a user",
    },
  },
  examplePayload: listUserAvailabilitySchedulesExamplePayload,
});
