import { action, outputSchema } from "@prismatic-io/spectral";
import { getShopifyGraphQlClient } from "../../../client";
import { listWebhooksExamplePayload } from "../../../examplePayloads";
import { listWebhooksInputs as inputs } from "../../../inputsGql";
import { listWebhooksGqlOutputSchema } from "../../../outputSchemas";
import { listWebhooks } from "../../../util";
import { webhookMapper } from "../mappers/webhookMapper";

export const listWebhooksGql = action({
  display: {
    label: "List Webhooks",
    description: "Lists all webhooks or webhooks for the current instance.",
  },
  inputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listWebhooksGqlOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      shopifyConnection,
      showOnlyInstanceWebhooks,
      getAlldata,
      callbackUrl,
      pagination = {},
    },
  ) => {
    const client = getShopifyGraphQlClient(
      shopifyConnection,
      undefined,
      context.debug.enabled,
      context.logger,
    );

    const { webhookSubscriptions } = await listWebhooks(
      client,
      getAlldata,
      pagination.limit,
      showOnlyInstanceWebhooks,
      Object.values(context.webhookUrls),
      pagination.endCursor,
      callbackUrl,
    );

    return {
      data: webhookSubscriptions.map(webhookMapper),
    };
  },
  examplePerform: async () => listWebhooksExamplePayload.restMap,
  examplePayload: listWebhooksExamplePayload.restMap,
});
