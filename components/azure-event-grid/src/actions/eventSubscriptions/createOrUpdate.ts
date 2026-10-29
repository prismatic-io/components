import { createEventGridHttpClient } from "../../client";
import { createOrUpdateEventSubscriptionInputs as inputs } from "../../inputs/eventSubscriptions";
import { getEventSubscriptionExamplePayload as examplePayload } from "../../examplePayloads";
import { action } from "@prismatic-io/spectral";
import {
  DEFAULT_EVENT_TIME_TO_LIVE_IN_MINUTES,
  DEFAULT_MAX_DELIVERY_ATTEMPTS,
} from "../../constants";
import { getEventSubscriptionUrl } from "../../util";

export const createOrUpdateEventSubscription = action({
  display: {
    label: "Create or Update Event Subscription",
    description:
      "Asynchronously creates a new event subscription or updates an existing event subscription based on the specified scope.",
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
      webhookUrl,
      eventDeliverySchema,
      bodyFields,
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

    const { data } = await managementClient.put(eventSubscriptionURL, {
      properties: {
        retryPolicy: {
          maxDeliveryAttempts: DEFAULT_MAX_DELIVERY_ATTEMPTS,
          eventTimeToLiveInMinutes: DEFAULT_EVENT_TIME_TO_LIVE_IN_MINUTES,
        },
        ...bodyFields,
        destination: {
          properties: {
            endpointUrl: webhookUrl,
          },
          endpointType: "WebHook",
        },
        eventDeliverySchema,
      },
    });
    return { data };
  },
  examplePayload,
});
