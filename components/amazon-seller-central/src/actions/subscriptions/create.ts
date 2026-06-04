import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { createSubscriptionExamplePayload } from "../../examplePayloads/notifications";
import {
  aggregationTimePeriod,
  connectionInput,
  destinationId,
  eventFilterType,
  MarketplaceIdsBody,
  notificationType,
  orderChangeTypes,
  payloadVersion,
} from "../../inputs";

export const createSubscription = action({
  display: {
    label: "Create Subscription",
    description:
      "Creates a subscription for the specified notification type to be delivered to the specified destination.",
  },
  examplePayload: createSubscriptionExamplePayload,
  inputs: {
    connectionInput,
    notificationType,
    payloadVersion,
    destinationId,
    aggregationTimePeriod,
    marketplaceIds: {
      ...MarketplaceIdsBody,
      required: false,
      comments:
        "A list of marketplace identifiers to subscribe to (e.g. ATVPDKIKX0DER). To receive notifications in every marketplace, do not provide this list.",
    },
    orderChangeTypes,
    eventFilterType,
  },
  perform: async (
    context,
    {
      connectionInput,
      notificationType,
      payloadVersion,
      destinationId,
      aggregationTimePeriod,
      marketplaceIds,
      orderChangeTypes,
      eventFilterType,
    },
  ) => {
    const client = createClient(connectionInput, context.debug.enabled);
    const { data } = await client.post(
      `/notifications/v1/subscriptions/${notificationType}`,
      {
        payloadVersion,
        destinationId,
        processingDirective: {
          eventFilter: {
            aggregationSettings: {
              aggregationTimePeriod,
            },
            marketplaceIds,
            orderChangeTypes,
            eventFilterType,
          },
        },
      },
    );
    return {
      data,
    };
  },
});
