import { action } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../../client";
import { listWebhookSubscriptionsExamplePayload } from "../../examplePayloads";
import { listWebhookSubscriptionsInputs } from "../../inputs";

export const listWebhookSubscriptions = action({
  display: {
    label: "List Webhook Subscriptions",
    description: "Lists all webhook subscriptions owned by your application.",
  },
  perform: async (
    context,
    {
      squareConnection,
      cursorSubscriptions,
      includeDisabled,
      sortOrderSubscriptions,
      limitSubscriptions,
    },
  ) => {
    const client = await createAuthorizedClient(squareConnection, context.debug.enabled);

    const response = await client.get("/v2/webhooks/subscriptions", {
      params: {
        cursor: cursorSubscriptions,
        include_disabled: includeDisabled,
        sort_order: sortOrderSubscriptions,
        limit: limitSubscriptions,
      },
    });

    return {
      data: response.data,
    };
  },
  inputs: listWebhookSubscriptionsInputs,
  examplePayload: listWebhookSubscriptionsExamplePayload,
});
