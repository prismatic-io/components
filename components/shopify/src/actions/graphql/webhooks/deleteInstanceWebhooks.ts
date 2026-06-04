import { action } from "@prismatic-io/spectral";
import { getShopifyGraphQlClient } from "../../../client";
import { MAX_LIMIT } from "../../../constants";
import { deleteInstanceWebhooksExamplePayload } from "../../../examplePayloads";
import { deleteInstanceWebhooksInputs as inputs } from "../../../inputsGql";
import { deleteWebhookById, listWebhooks } from "../../../util";

export const deleteInstanceWebhooksgql = action({
  display: {
    label: "Delete Instance Webhooks",
    description: "Deletes all webhooks related to the current instance.",
  },
  inputs,
  perform: async (context, { shopifyConnection }) => {
    const client = getShopifyGraphQlClient(shopifyConnection, undefined, context.debug.enabled);

    const { webhookSubscriptions } = await listWebhooks(
      client,
      true,
      MAX_LIMIT,
      true,
      Object.values(context.webhookUrls),
      undefined,
    );

    const promises = webhookSubscriptions.map((webhook) => deleteWebhookById(client, webhook.id));
    await Promise.all(promises);
    return {
      data: {},
    };
  },
  examplePayload: deleteInstanceWebhooksExamplePayload.restMap,
});
