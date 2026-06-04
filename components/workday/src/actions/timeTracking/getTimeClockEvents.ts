import { action } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { SERVICES } from "../../constants";
import { getTimeClockEventsExamplePayload } from "../../examplePayloads";
import { getTimeClockEventsInputs } from "../../inputs";

export const getTimeClockEvents = action({
  display: {
    label: "Get Time Clock Events",
    description:
      "Retrieves a collection of time clock events. You can filter by the time clock events by worker and date range.",
  },
  perform: async (context, { connection, params }) => {
    const client = getClient(connection, context.debug.enabled);
    const { data } = await client.get(
      `${SERVICES.timeTracking}/timeClockEvents`,
      { params },
    );
    return {
      data,
    };
  },
  inputs: getTimeClockEventsInputs,
  examplePayload: getTimeClockEventsExamplePayload,
});
