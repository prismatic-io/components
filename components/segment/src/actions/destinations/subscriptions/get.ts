import { action } from "@prismatic-io/spectral";
import { createClient } from "../../../client";
import {
  connectionInput,
  destinationId,
  region,
  subscriptionId,
} from "../../../inputs";
import { getDestinationSubscriptionExamplePayload } from "../../../examplePayloads";

export const getDestinationSubscription = action({
  display: {
    label: "Get Destination Subscription",
    description: "Gets a Destination subscription by id.",
  },
  inputs: {
    connectionInput,
    region,
    destinationId,
    subscriptionId,
  },
  perform: async (
    context,
    { connectionInput, destinationId, region, subscriptionId },
  ) => {
    const client = createClient(connectionInput, region, context.debug.enabled);
    const { data } = await client.get(
      `/destinations/${destinationId}/subscriptions/${subscriptionId}`,
    );
    return {
      data,
    };
  },
  examplePayload: {
    data: getDestinationSubscriptionExamplePayload,
  },
});
