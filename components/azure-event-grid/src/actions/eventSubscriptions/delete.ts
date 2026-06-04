import { createEventGridHttpClient } from "../../client";
import { DEFAULT_DELETE_RESPONSE } from "../../constants";
import { deleteEventSubscriptionInputs as inputs } from "../../inputs/eventSubscriptions";
import { action } from "@prismatic-io/spectral";
import { getEventSubscriptionUrl } from "../../util";

export const deleteEventSubscription = action({
  display: {
    label: "Delete Event Subscription",
    description: "Delete an existing event subscription.",
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

    await managementClient.delete(eventSubscriptionURL);
    return { data: DEFAULT_DELETE_RESPONSE };
  },
  examplePayload: {
    data: DEFAULT_DELETE_RESPONSE,
  },
});
