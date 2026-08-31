import { trigger, util } from "@prismatic-io/spectral";
import { managedWebhookInputs } from "../inputs";
import { createAuthorizedClient } from "../client";
import {
  BOX_SIGNATURE_PRIMARY_HEADER,
  BOX_SIGNATURE_SECONDARY_HEADER,
} from "../constants";
import type { StoreState, WebhookTriggerType } from "../types";
import {
  createWebhookFN,
  getLegacyStoreKey,
  getStoreKey,
  resolveStoreState,
  validateBoxWebhookSignature,
} from "../util";
export const managedWebhook = trigger({
  display: {
    label: "Managed Webhook",
    description:
      "Receive and validate webhook requests from Box. Automatically creates and manages a webhook subscription when the instance is deployed, and removes the subscription when the instance is deleted.",
  },
  webhookLifecycleHandlers: {
    create: async (
      { crossFlowState, logger, flow: flowProperties, webhookUrls },
      {
        connection,
        targetId,
        targetType,
        triggerTypes,
        primarySignatureKey,
        secondarySignatureKey,
      },
    ) => {
      const client = createAuthorizedClient({ boxConnection: connection });
      const storeKey = getStoreKey(flowProperties.name);
      const legacyStoreKey = getLegacyStoreKey(
        targetId,
        targetType,
        flowProperties.name,
      );
      const { state, adoptedFromLegacyKey } = resolveStoreState(
        crossFlowState,
        storeKey,
        legacyStoreKey,
      );
      const persist = (newCrossFlowState: Record<string, StoreState>) => {
        Object.assign(crossFlowState, newCrossFlowState);
        if (adoptedFromLegacyKey) {
          crossFlowState[legacyStoreKey] = undefined;
        }
        return { crossFlowState };
      };
      logger.info("Checking for existing webhook...");
      if (state?.existingWebhookId) {
        if (adoptedFromLegacyKey) {
          logger.info(
            "Adopted webhook state stored under the legacy composite key.",
          );
        }
        logger.info("Existing webhook found, checking for changes...");
        const hasChanges =
          state.previousTargetId !== targetId ||
          state.previousTargetType !== targetType ||
          state.previousTriggerTypes?.join(",") !==
            (triggerTypes as WebhookTriggerType[]).join(",");
        if (!hasChanges) {
          logger.info("No changes found, skipping...");
          return adoptedFromLegacyKey
            ? persist({ [storeKey]: state })
            : undefined;
        }
        logger.info(
          "Changes found, deleting previous webhook and creating a new one...",
        );
        await client.webhooks.deleteWebhookById(
          util.types.toString(state.existingWebhookId),
        );
      } else {
        logger.info("No existing webhook found, creating new one...");
      }
      const { crossFlowState: newCrossFlowState } = await createWebhookFN(
        client,
        targetId,
        targetType,
        util.types.toString(webhookUrls[flowProperties.name]),
        triggerTypes as WebhookTriggerType[],
        storeKey,
        logger,
        primarySignatureKey,
        secondarySignatureKey,
      );
      return persist(newCrossFlowState);
    },
    delete: async (
      { flow: flowProperties, crossFlowState, logger },
      { connection, targetId, targetType },
    ) => {
      const storeKey = getStoreKey(flowProperties.name);
      const legacyStoreKey = getLegacyStoreKey(
        targetId,
        targetType,
        flowProperties.name,
      );
      const client = createAuthorizedClient({ boxConnection: connection });
      const { state } = resolveStoreState(
        crossFlowState,
        storeKey,
        legacyStoreKey,
      );
      logger.info("Checking for existing webhook...");
      if (state?.existingWebhookId) {
        logger.info("Existing webhook found, deleting...");
        await client.webhooks.deleteWebhookById(
          util.types.toString(state.existingWebhookId),
        );
        crossFlowState[storeKey] = undefined;
        crossFlowState[legacyStoreKey] = undefined;
        return { crossFlowState };
      } else {
        logger.info("No existing webhook found, skipping...");
      }
    },
  },
  perform: async (context, payload) => {
    if (context.isSimulatedTestExecution) {
      return Promise.resolve({
        payload,
      });
    }
    const { rawBody, headers } = payload;
    const lowerHeaders = util.types.lowerCaseHeaders(headers);
    const primarySignature = lowerHeaders[BOX_SIGNATURE_PRIMARY_HEADER];
    const secondarySignature = lowerHeaders[BOX_SIGNATURE_SECONDARY_HEADER];
    if (primarySignature || secondarySignature) {
      const storeKey = getStoreKey(context.flow.name);
      const state = context.crossFlowState[storeKey] as StoreState | undefined;
      const isValid = validateBoxWebhookSignature({
        body: util.types.toString(rawBody.data),
        headers: lowerHeaders,
        primaryKey:
          state?.primarySignatureKey ??
          (context.crossFlowState.primarySignatureKey as string | undefined),
        secondaryKey:
          state?.secondarySignatureKey ??
          (context.crossFlowState.secondarySignatureKey as string | undefined),
      });
      if (!isValid) {
        throw new Error(
          "The request has failed Box signature validation. Rejecting.",
        );
      }
    }
    return Promise.resolve({
      payload,
    });
  },
  inputs: managedWebhookInputs,
  synchronousResponseSupport: "invalid",
  scheduleSupport: "invalid",
});
