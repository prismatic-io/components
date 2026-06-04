import { type ActionContext, trigger, util } from "@prismatic-io/spectral";
import Box from "box-node-sdk";
import {
  connectionInput,
  signatureKey,
  targetId,
  targetType,
  triggerTypes,
} from "../inputs";
import { createAuthorizedClient } from "../client";
import { listWebhooks } from "../actions/webhooks";
import type { StoreState, WebhookTriggerType } from "../interfaces";
import { createWebhookFN, getStoreKey } from "../utils";

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
      const storeKey = getStoreKey(targetId, targetType, flowProperties.name);
      const state = crossFlowState[storeKey] as StoreState;

      logger.info("Checking for existing webhook...");
      if (state?.existingWebhookId) {
        logger.info("Existing webhook found, checking for changes...");
        
        const { data: existingInstanceWebhooks } = await listWebhooks.perform(
          {
            webhookUrls: webhookUrls as Record<string, string>,
          } as ActionContext,
          {
            boxConnection: connection,
            showOnlyInstanceWebhooks: false,
            fetchAll: true,
            limit: undefined,
            marker: undefined,
          },
        );
        const existingInstanceWebhook = existingInstanceWebhooks.entries?.find(
          ({ id }) => id === state?.existingWebhookId,
        );

        const hasChanges =
          existingInstanceWebhook.target.id !== targetId ||
          existingInstanceWebhook.target.type !== targetType;

        if (!hasChanges) {
          logger.info("No changes found, skipping...");
          return;
        } else {
          logger.info(
            "Changes found, deleting previous webhook and creating a new one...",
          );
          await client.webhooks.delete(state.existingWebhookId);
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

          return { crossFlowState: newCrossFlowState };
        }
      } else {
        logger.info("No existing webhook found, creating new one...");
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

        return { crossFlowState: newCrossFlowState };
      }
    },
    delete: async (
      { flow: flowProperties, crossFlowState, logger },
      { connection, targetId, targetType },
    ) => {
      const storeKey = getStoreKey(targetId, targetType, flowProperties.name);
      const client = createAuthorizedClient({ boxConnection: connection });
      const state = crossFlowState[storeKey] as StoreState;

      logger.info("Checking for existing webhook...");
      if (state?.existingWebhookId) {
        logger.info("Existing webhook found, deleting...");
        await client.webhooks.delete(state.existingWebhookId);
        crossFlowState[storeKey] = undefined;

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
    const primarySignature = lowerHeaders["box-signature-primary"];
    const secondarySignature = lowerHeaders["box-signature-secondary"];

    if (primarySignature || secondarySignature) {
      const primarySignatureKey = context.crossFlowState
        .primarySignatureKey as string;
      const secondarySignatureKey = context.crossFlowState
        .secondarySignatureKey as string;

      
      const isValid = Box.validateWebhookMessage(
        util.types.toString(rawBody.data),
        headers,
        primarySignatureKey,
        secondarySignatureKey,
      );

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
  inputs: {
    connection: connectionInput,
    targetId,
    targetType,
    triggerTypes,
    primarySignatureKey: { ...signatureKey, label: "Primary Signature Key" },
    secondarySignatureKey: {
      ...signatureKey,
      label: "Secondary Signature Key",
    },
  },
  synchronousResponseSupport: "invalid",
  scheduleSupport: "invalid",
});
