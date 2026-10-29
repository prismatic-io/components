import { action } from "@prismatic-io/spectral";
import { createClient } from "../../../client";
import {
  connectionInput,
  destinationId,
  enabled,
  name,
  region,
  settings,
  subscriptionId,
  trigger,
} from "../../../inputs";
import { getDestinationSubscriptionExamplePayload } from "../../../examplePayloads";

export const updateDestinationSubscription = action({
  display: {
    label: "Update Destination Subscription",
    description: "Updates an existing Destination subscription.",
  },
  inputs: {
    connectionInput,
    region,
    destinationId,
    subscriptionId,
    name: {
      ...name,
      comments: "The user-defined name for the subscription.",
    },
    trigger,
    enabled: {
      ...enabled,
      comments: "Is the subscription enabled.",
    },
    settings,
  },
  perform: async (
    context,
    {
      connectionInput,
      region,
      subscriptionId,
      destinationId,
      enabled,
      name,
      settings,
      trigger,
    },
  ) => {
    const client = createClient(connectionInput, region, context.debug.enabled);
    const { data } = await client.patch(
      `/destinations/${destinationId}/subscriptions/${subscriptionId}`,
      {
        enabled: enabled || undefined,
        name: name || undefined,
        settings: settings || undefined,
        trigger: trigger || undefined,
      },
      {
        headers: {
          "Content-Type": "application/vnd.segment.v1alpha+json",
        },
      },
    );
    return {
      data,
    };
  },
  examplePayload: {
    data: getDestinationSubscriptionExamplePayload,
  },
});
