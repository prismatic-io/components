import { createEventGridHttpClient } from "../../client";
import { listEventSubscriptionsInputs as inputs } from "../../inputs/eventSubscriptions";
import { listEventSubscriptionsExamplePayload as examplePayload } from "../../examplePayloads";
import { action } from "@prismatic-io/spectral";
import { getEventSubscriptionUrl, paginateResults } from "../../util";

export const listEventSubscriptions = action({
  display: {
    label: "List Event Subscriptions",
    description:
      "List all event subscriptions that have been created for a specific topic.",
  },
  inputs,
  perform: async (
    context,
    {
      connection,
      topicName,
      subscriptionId,
      resourceGroupName,
      nextLink,
      fetchAll,
      $filter,
      $top,
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
    );
    const url = nextLink || eventSubscriptionURL;
    const data = await paginateResults(managementClient, url, fetchAll, {
      $filter,
      $top,
    });
    return { data };
  },
  examplePayload,
});
