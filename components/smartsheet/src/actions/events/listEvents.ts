import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listEventsExamplePayload } from "../../examplePayloads";
import { listEventsInputs } from "../../inputs";
export const listEvents = action({
  display: {
    label: "List Events",
    description:
      "Lists events occurring in the Smartsheet organization account.",
  },
  perform: async (
    { debug: { enabled: debug } },
    { connection, since, pagination },
  ) => {
    const client = createClient(connection, debug);
    const { data } = await client.get(`/events`, {
      params: {
        since,
        streamPosition: pagination.streamPosition,
        maxCount: pagination.maxCount,
      },
    });
    return { data };
  },
  inputs: listEventsInputs,
  examplePayload: listEventsExamplePayload,
});
