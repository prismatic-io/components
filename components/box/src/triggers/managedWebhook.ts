import { trigger, util } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../client";
import {
  BOX_SIGNATURE_PRIMARY_HEADER,
  BOX_SIGNATURE_SECONDARY_HEADER,
  HTTP_CONFLICT,
} from "../constants";
import { managedWebhookExamplePayload } from "../examplePayloads";
import { managedWebhookInputs } from "../inputs";
import type { StoreState, WebhookTriggerType } from "../types";
import {
  createWebhookFN,
  deleteWebhookIfPresent,
  getBoxErrorStatus,
  getLegacyStoreKey,
  getStoreKey,
  getTargetWebhookIdsForAddress,
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
        await deleteWebhookIfPresent(
          client,
          util.types.toString(state.existingWebhookId),
          logger,
        );
      } else {
        logger.info("No existing webhook found, creating new one...");
      }

      const address = util.types.toString(webhookUrls[flowProperties.name]);
      const create = () =>
        createWebhookFN(
          client,
          targetId,
          targetType,
          address,
          triggerTypes as WebhookTriggerType[],
          storeKey,
          logger,
          primarySignatureKey,
          secondarySignatureKey,
        );

      try {
        return persist((await create()).crossFlowState);
      } catch (error) {
        if (getBoxErrorStatus(error) !== HTTP_CONFLICT) {
          throw error;
        }
        const ownWebhookIds = await getTargetWebhookIdsForAddress(
          client,
          targetId,
          targetType,
          address,
        );
        if (ownWebhookIds.size === 0) {
          throw new Error(
            `A Box webhook for ${targetType} ${targetId} already exists for this application and user, and it delivers to a different URL. Box allows one webhook per target, application and user: delete that webhook or choose a different target.`,
          );
        }
        logger.info(
          "A webhook for this flow already exists in Box, replacing it...",
        );
        for (const webhookId of ownWebhookIds) {
          await deleteWebhookIfPresent(client, webhookId, logger);
        }
        return persist((await create()).crossFlowState);
      }
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
        await deleteWebhookIfPresent(
          client,
          util.types.toString(state.existingWebhookId),
          logger,
        );
        crossFlowState[storeKey] = undefined;
        crossFlowState[legacyStoreKey] = undefined;

        return { crossFlowState };
      } else {
        logger.info("No existing webhook found, skipping...");
      }
    },
  },
  perform: async (
    context,
    payload,
    { primarySignatureKey, secondarySignatureKey },
  ) => {
    if (context.isSimulatedTestExecution) {
      return Promise.resolve({
        payload,
      });
    }

    const { rawBody, headers } = payload;
    const lowerHeaders = util.types.lowerCaseHeaders(headers);
    const primarySignature = lowerHeaders[BOX_SIGNATURE_PRIMARY_HEADER];
    const secondarySignature = lowerHeaders[BOX_SIGNATURE_SECONDARY_HEADER];

    const storeKey = getStoreKey(context.flow.name);
    const state = context.crossFlowState[storeKey] as StoreState | undefined;

    const primaryKey =
      primarySignatureKey ||
      (state?.primarySignatureKey ??
        (context.crossFlowState.primarySignatureKey as string | undefined));
    const secondaryKey =
      secondarySignatureKey ||
      (state?.secondarySignatureKey ??
        (context.crossFlowState.secondarySignatureKey as string | undefined));

    if (primaryKey || secondaryKey || primarySignature || secondarySignature) {
      const isValid = validateBoxWebhookSignature({
        body: util.types.toString(rawBody.data),
        headers: lowerHeaders,
        primaryKey,
        secondaryKey,
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
  examplePayload: managedWebhookExamplePayload,
  synchronousResponseSupport: "invalid",
  scheduleSupport: "invalid",
});
