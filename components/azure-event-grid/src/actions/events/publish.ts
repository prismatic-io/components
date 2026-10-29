import { createEventGridPublishClient } from "../../client";
import { getEventSubscriptionExamplePayload as examplePayload } from "../../examplePayloads";
import { publishEventsInputs as inputs } from "../../inputs/events";
import { action } from "@prismatic-io/spectral";

export const publishEvents = action({
  display: {
    label: "Publish Events",
    description: "Publishes a batch of events to an Azure Event Grid topic.",
  },
  inputs,
  perform: async (
    context,
    { connection, topicAccessKey, topicHostName, events },
  ) => {
    const publishClient = createEventGridPublishClient(
      connection,
      topicHostName,
      topicAccessKey,
      context.debug.enabled,
    );

    const { data } = await publishClient.post("", events);
    return { data };
  },
  examplePayload,
});
