import { action } from "@prismatic-io/spectral";
import { createClient } from "../../../client";
import { listDestinationSubscriptionsExamplePayload } from "../../../examplePayloads";
import { paginateResults } from "../../../helpers/pagination";
import {
  connectionInput,
  count,
  cursor,
  destinationId,
  fetchAll,
  region,
} from "../../../inputs";

export const listDestinationSubscriptions = action({
  display: {
    label: "List Destination Subscriptions",
    description: "Lists subscriptions for a Destination.",
  },
  inputs: {
    connectionInput,
    region,
    destinationId,
    fetchAll,
    count,
    cursor,
  },
  perform: async (
    context,
    { connectionInput, destinationId, region, fetchAll, count, cursor },
  ) => {
    const client = createClient(connectionInput, region, context.debug.enabled);
    return await paginateResults({
      client,
      endpoint: `/destinations/${destinationId}/subscriptions`,
      fetchAll,
      count,
      cursor,
    });
  },
  examplePayload: {
    data: listDestinationSubscriptionsExamplePayload,
  },
});
