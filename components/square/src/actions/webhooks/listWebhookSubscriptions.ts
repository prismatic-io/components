import { action } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../../client";
import { listWebhookSubscriptionsExamplePayload } from "../../examplePayloads";
import { listWebhookSubscriptionsInputs } from "../../inputs";
import { fetchAllPages } from "../../util";

export const listWebhookSubscriptions = action({
  display: {
    label: "List Webhook Subscriptions",
    description: "Lists all webhook subscriptions owned by your application.",
  },
  perform: async (
    context,
    {
      squareConnection,
      fetchAll,
      pagination = {},
      includeDisabled,
      sortOrderSubscriptions,
    },
  ) => {
    const client = await createAuthorizedClient(
      squareConnection,
      context.debug.enabled,
    );

    const data = await fetchAllPages(
      client,
      "/v2/webhooks/subscriptions",
      "subscriptions",
      {
        initialCursor: pagination.cursorSubscriptions,
        additionalParams: {
          include_disabled: includeDisabled,
          sort_order: sortOrderSubscriptions,
          limit: pagination.limitSubscriptions,
        },
      },
      fetchAll,
    );

    return { data };
  },
  inputs: listWebhookSubscriptionsInputs,
  examplePayload: listWebhookSubscriptionsExamplePayload,
});
