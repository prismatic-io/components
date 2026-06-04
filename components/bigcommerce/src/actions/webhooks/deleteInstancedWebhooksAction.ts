import { action } from "@prismatic-io/spectral";
import { deleteInstancedWebhooksExamplePayload } from "../../examplePayloads";
import {
  bigCommerceConnection,
  instanceURLPatternInput,
  storeHash,
  webhookDestinationInput,
  webhookIsActiveInput,
  webhookLimitInput,
  webhookPageInput,
  webhookScopeInput,
} from "../../inputs";
import { deleteWebhookAction } from "./deleteWebhookAction";
import { getWebhooksAction } from "./getWebhooksAction";

export const deleteInstancedWebhooksAction = action({
  display: {
    label: "Delete Instanced Webhooks",
    description: "Deletes all webhooks that point to a flow in this instance.",
  },
  examplePayload: deleteInstancedWebhooksExamplePayload,
  perform: async (
    context,
    {
      bigCommerceConnection,
      storeHash,
      instanceURLPattern,
      page,
      limit,
      is_active,
      scope,
      destination,
    },
  ) => {
    
    const allWebhooks = await getWebhooksAction.perform(context, {
      bigCommerceConnection,
      storeHash,
      page,
      limit,
      is_active,
      scope,
      destination,
    });

    
    const instancedWebhooks = allWebhooks.data.filter(
      (webhook: { destination: unknown[] }) =>
        webhook.destination.includes(instanceURLPattern),
    );

    
    for (const webhook of instancedWebhooks) {
      await deleteWebhookAction.perform(context, {
        bigCommerceConnection,
        storeHash,
        webhook_id: webhook.id,
      });
    }

    return {
      data: {
        message: `${instancedWebhooks.length} webhooks deleted.`,
      },
    };
  },

  inputs: {
    bigCommerceConnection,
    storeHash: storeHash,
    instanceURLPattern: instanceURLPatternInput,
    page: webhookPageInput,
    limit: webhookLimitInput,
    is_active: webhookIsActiveInput,
    scope: webhookScopeInput,
    destination: webhookDestinationInput,
  },
});
