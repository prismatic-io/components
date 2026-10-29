import { action, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { getAzureServiceBusClient } from "../client";
import { createOrUpdateSubscriptionExamplePayload } from "../examplePayloads";
import {
  autoDeleteOnIdle,
  clientId,
  connection,
  deadLetteringOnFilterEvaluationExceptions,
  deadLetteringOnMessageExpiration,
  defaultMessageTimeToLive,
  duplicateDetectionHistoryTimeWindow,
  enableBatchedOperations,
  forwardDeadLetteredMessagesTo,
  forwardTo,
  isClientAffine,
  isDurable,
  isShared,
  lockDuration,
  maxDeliveryCount,
  namespaceName,
  requiresSession,
  resourceGroupName,
  status,
  subscriptionId,
  subscriptionName,
  topicName,
} from "../inputs";
import type { CreateOrUpdateSubscriptionsBody } from "../types/CreateOrUpdateSubscriptionsBody";
import type { EntityStatus } from "../types/EntityStatus";

export const createOrUpdateSubscription = action({
  display: {
    label: "Create or Update Subscription",
    description: "Creates a topic subscription.",
  },
  examplePayload: createOrUpdateSubscriptionExamplePayload,
  perform: async (
    context,
    {
      connection,
      namespaceName,
      resourceGroupName,
      subscriptionId,
      topicName,
      subscriptionName,
      autoDeleteOnIdle,
      deadLetteringOnFilterEvaluationExceptions,
      deadLetteringOnMessageExpiration,
      defaultMessageTimeToLive,
      duplicateDetectionHistoryTimeWindow,
      enableBatchedOperations,
      forwardDeadLetteredMessagesTo,
      forwardTo,
      isClientAffine,
      lockDuration,
      maxDeliveryCount,
      requiresSession,
      status,
      clientId,
      isDurable,
      isShared,
    },
  ) => {
    const client = getAzureServiceBusClient(connection, context.debug.enabled);
    const body: CreateOrUpdateSubscriptionsBody = {
      properties: {
        ...(autoDeleteOnIdle.length && { autoDeleteOnIdle }),
        clientAffineProperties: {
          ...(clientId.length && { clientId }),
          isDurable,
          isShared,
        },
        deadLetteringOnFilterEvaluationExceptions,
        deadLetteringOnMessageExpiration,
        ...(defaultMessageTimeToLive.length && { defaultMessageTimeToLive }),
        ...(duplicateDetectionHistoryTimeWindow.length && {
          duplicateDetectionHistoryTimeWindow,
        }),
        enableBatchedOperations,
        ...(forwardDeadLetteredMessagesTo.length && {
          forwardDeadLetteredMessagesTo,
        }),
        ...(forwardTo.length && { forwardTo }),
        isClientAffine,
        ...(lockDuration.length && { lockDuration }),
        ...(maxDeliveryCount && {
          maxDeliveryCount: util.types.toNumber(maxDeliveryCount),
        }),
        requiresSession,
        ...(status.length && { status: status as EntityStatus }),
      },
    };
    try {
      const { data } = await client.put(
        `/${subscriptionId}/resourceGroups/${resourceGroupName}/providers/Microsoft.ServiceBus/namespaces/${namespaceName}/topics/${topicName}/subscriptions/${subscriptionName}?api-version=2021-11-01`,
        body,
      );
      return { data };
    } catch (error) {
      const handled = handleErrors(error);
      const serialized = util.types.toJSON(handled);
      throw new Error(serialized);
    }
  },
  inputs: {
    connection,
    namespaceName,
    resourceGroupName,
    subscriptionId,
    topicName,
    subscriptionName,
    autoDeleteOnIdle,
    deadLetteringOnFilterEvaluationExceptions,
    deadLetteringOnMessageExpiration,
    defaultMessageTimeToLive,
    duplicateDetectionHistoryTimeWindow,
    enableBatchedOperations,
    forwardDeadLetteredMessagesTo,
    forwardTo,
    isClientAffine,
    lockDuration,
    maxDeliveryCount,
    requiresSession,
    status,
    clientId,
    isDurable,
    isShared,
  },
});

export default { createOrUpdateSubscription };
