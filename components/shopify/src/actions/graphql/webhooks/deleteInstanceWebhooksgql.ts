import { action, outputSchema } from "@prismatic-io/spectral";
import { getShopifyGraphQlClient } from "../../../client";
import { MAX_LIMIT } from "../../../constants";
import { deleteInstanceWebhooksExamplePayload } from "../../../examplePayloads";
import { deleteInstanceWebhooksInputs as inputs } from "../../../inputsGql";
import { deleteInstanceWebhooksGqlOutputSchema } from "../../../outputSchemas";
import { deleteWebhookById, listWebhooks } from "../../../util";

export const deleteInstanceWebhooksgql = action({
  display: {
    label: "Delete Instance Webhooks",
    description: "Deletes all webhooks related to the current instance.",
  },
  inputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: deleteInstanceWebhooksGqlOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (context, { shopifyConnection }) => {
    const client = getShopifyGraphQlClient(
      shopifyConnection,
      undefined,
      context.debug.enabled,
      context.logger,
    );

    const { webhookSubscriptions } = await listWebhooks(
      client,
      true,
      MAX_LIMIT,
      true,
      Object.values(context.webhookUrls),
      undefined,
    );

    const promises = webhookSubscriptions.map((webhook) =>
      deleteWebhookById(client, webhook.id),
    );
    await Promise.all(promises);
    return {
      data: {},
    };
  },
  examplePerform: async () => deleteInstanceWebhooksExamplePayload.restMap,
  examplePayload: deleteInstanceWebhooksExamplePayload.restMap,
});
