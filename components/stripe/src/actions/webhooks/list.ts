import { action } from "@prismatic-io/spectral";
import { createStripeClient } from "../../auth";
import {
  timeout,
  connectionInput,
  limit,
  startingAfter,
  endingBefore,
  fetchAll,
} from "../../inputs";
import { listWebhookEventsFn } from "../../util";
import { listWebhooksExamplePayload } from "../../examplePayloads/webhooks";

export const listWebhooks = action({
  display: {
    label: "List Webhooks",
    description: "Return a list of all webhook endpoints.",
  },
  perform: async (
    context,
    { stripeConnection, timeout, limit, startingAfter, endingBefore, fetchAll },
  ) => {
    const client = createStripeClient({
      stripeConnection,
      timeout,
    });
    const data = await listWebhookEventsFn(client.webhookEndpoints, fetchAll, {
      limit,
      starting_after: startingAfter,
      ending_before: endingBefore,
    });
    return {
      data,
    };
  },
  inputs: {
    fetchAll,
    limit,
    startingAfter,
    endingBefore,
    timeout,
    stripeConnection: connectionInput,
  },
  examplePayload: listWebhooksExamplePayload,
});
