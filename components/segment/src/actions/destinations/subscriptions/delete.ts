import { action } from "@prismatic-io/spectral";
import { createClient } from "../../../client";
import {
  connectionInput,
  destinationId,
  region,
  subscriptionId,
} from "../../../inputs";
import { deleteExamplePayload } from "../../../examplePayloads";

export const deleteDestinationSubscription = action({
  display: {
    label: "Delete Destination Subscription",
    description: "Deletes an existing Destination subscription.",
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
    const { data } = await client.delete(
      `/destinations/${destinationId}/subscriptions/${subscriptionId}`,
    );
    return {
      data,
    };
  },
  examplePayload: {
    data: deleteExamplePayload,
  },
});
