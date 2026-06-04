import { action } from "@prismatic-io/spectral";
import { createClient } from "../../../client";
import {
  connectionInput,
  count,
  cursor,
  destinationId,
  region,
} from "../../../inputs";
import { listDestinationSubscriptionsExamplePayload } from "../../../examplePayloads";

export const listDestinationSubscriptions = action({
  display: {
    label: "List Destination Subscriptions",
    description: "Lists subscriptions for a Destination.",
  },
  inputs: {
    connectionInput,
    region,
    destinationId,
    count,
    cursor,
  },
  perform: async (
    context,
    { connectionInput, destinationId, region, count, cursor },
  ) => {
    const client = createClient(connectionInput, region, context.debug.enabled);
    const { data } = await client.get(
      `/destinations/${destinationId}/subscriptions`,
      {
        params: {
          pagination: {
            count: count || undefined,
            cursor: cursor || undefined,
          },
        },
      },
    );
    return {
      data,
    };
  },
  examplePayload: {
    data: listDestinationSubscriptionsExamplePayload,
  },
});
