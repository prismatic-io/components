import { action } from "@prismatic-io/spectral";
import { createEventsClient } from "../../client";
import { createChangeEventExamplePayload } from "../../examplePayloads";
import { event, sendChangeEventExample } from "../../inputs";

export const sendChangeEvent = action({
  display: {
    label: "Send Change Event",
    description: "Send a change event to the Events API.",
  },
  perform: async (context, { event }) => {
    const client = createEventsClient(context.debug.enabled);
    const { data } = await client.post(`/change/enqueue`, event);
    return { data };
  },
  inputs: {
    event: {
      ...event,
      label: "Change Event To Send",
      example: sendChangeEventExample,
    },
  },
  examplePayload: createChangeEventExamplePayload,
});
