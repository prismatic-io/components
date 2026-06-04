import { createEventGridHttpClient } from "../../client";
import { getEventSubscriptionExamplePayload as examplePayload } from "../../examplePayloads";
import { getEventSubscriptionInputs as inputs } from "../../inputs/eventSubscriptions";
import { action } from "@prismatic-io/spectral";
import { getEventSubscriptionUrl } from "../../util";

export const getEventSubscription = action({
  display: {
    label: "Get Event Subscription",
    description: "Get properties of an event subscription.",
  },
  inputs,
  perform: async (
    context,
    {
      connection,
      topicName,
      subscriptionId,
      resourceGroupName,
      eventSubscriptionName,
    },
  ) => {
    const managementClient = createEventGridHttpClient(
      connection,
      context.debug.enabled,
    );
    const eventSubscriptionURL = getEventSubscriptionUrl(
      subscriptionId,
      resourceGroupName,
      topicName,
      eventSubscriptionName,
    );

    const { data } = await managementClient.get(eventSubscriptionURL);
    return { data };
  },
  examplePayload,
});
