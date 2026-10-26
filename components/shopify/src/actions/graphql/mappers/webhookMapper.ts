import { WEBHOOK_TOPICS_MAP } from "../../../constants";
import type { WebhookSubscription } from "../../../types";
import { findKeyByValue, getNumericId } from "../../../util";
export const webhookMapper = (webhookSubscription: WebhookSubscription) => {
  return {
    id: getNumericId(webhookSubscription.id),
    address: webhookSubscription.endpoint.callbackUrl,
    topic: findKeyByValue(WEBHOOK_TOPICS_MAP, webhookSubscription.topic),
    created_at: webhookSubscription.createdAt,
    updated_at: webhookSubscription.updatedAt,
    format: webhookSubscription.format.toLowerCase(),
    fields: webhookSubscription.includeFields,
    metafield_namespaces: webhookSubscription.metafieldNamespaces,
    api_version: webhookSubscription.apiVersion.displayName,
    private_metafield_namespaces: [],
  };
};
