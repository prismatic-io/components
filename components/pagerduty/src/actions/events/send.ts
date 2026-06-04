import { action } from "@prismatic-io/spectral";
import { createEventsClient } from "../../client";
import { sendEventExamplePayload } from "../../examplePayloads";
import { event, sendEventExample } from "../../inputs";

export const sendEvent = action({
  display: {
    label: "Send Event",
    description: "Send a trigger event to the Events API to report a new event.",
  },
  perform: async (context, { event }) => {
    const client = createEventsClient(context.debug.enabled);
    console.log({ event });
    const { data } = await client.post(`/enqueue`, event);
    return { data };
  },
  inputs: {
    event: {
      ...event,
      example: sendEventExample,
    },
  },
  examplePayload: sendEventExamplePayload,
});
