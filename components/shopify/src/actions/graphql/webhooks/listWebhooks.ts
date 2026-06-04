import { action } from "@prismatic-io/spectral";
import { getShopifyGraphQlClient } from "../../../client";
import { listWebhooksExamplePayload } from "../../../examplePayloads";
import { listWebhooksInputs as inputs } from "../../../inputsGql";
import { listWebhooks } from "../../../util";
import { webhookMapper } from "../mappers/webhookMapper";

export const listWebhooksGql = action({
  display: {
    label: "List Webhooks",
    description: "Lists all webhooks or webhooks for the current instance.",
  },
  inputs,
  perform: async (
    context,
    { shopifyConnection, showOnlyInstanceWebhooks, getAlldata, limit, endCursor, callbackUrl },
  ) => {
    const client = getShopifyGraphQlClient(shopifyConnection, undefined, context.debug.enabled);

    const { webhookSubscriptions } = await listWebhooks(
      client,
      getAlldata,
      limit,
      showOnlyInstanceWebhooks,
      Object.values(context.webhookUrls),
      endCursor,
      callbackUrl,
    );

    return {
      data: webhookSubscriptions.map(webhookMapper),
    };
  },
  examplePayload: listWebhooksExamplePayload.restMap,
});
