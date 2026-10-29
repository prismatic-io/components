import { createEventGridHttpClient } from "../../client";
import { updateEventSubscriptionInputs as inputs } from "../../inputs/eventSubscriptions";
import { getEventSubscriptionExamplePayload as examplePayload } from "../../examplePayloads";
import { action } from "@prismatic-io/spectral";
import type { UpdateEventSubscription } from "../../interfaces";
import { getEventSubscriptionUrl } from "../../util";

export const updateEventSubscription = action({
  display: {
    label: "Update Event Subscription",
    description: "Asynchronously updates an existing event subscription.",
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

    const payload: UpdateEventSubscription = {
      retryPolicy: {
        maxDeliveryAttempts: 10,
        eventTimeToLiveInMinutes: 5,
      },
      ...bodyFields,
      eventDeliverySchema,
    };
    if (webhookUrl) {
      payload.destination = {
        properties: {
          endpointUrl: webhookUrl,
        },
        endpointType: "WebHook",
      };
    }

    const { data } = await managementClient.patch(
      eventSubscriptionURL,
      payload,
    );
    return { data };
  },
  examplePayload,
});
