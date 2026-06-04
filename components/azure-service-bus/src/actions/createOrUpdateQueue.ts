import { action, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { getAzureServiceBusClient } from "../client";
import { createOrUpdateQueueExamplePayload } from "../examplePayloads";
import {
  autoDeleteOnIdle,
  connection,
  deadLetteringOnMessageExpiration,
  defaultMessageTimeToLive,
  duplicateDetectionHistoryTimeWindow,
  enableBatchedOperations,
  enableExpress,
  enablePartitioning,
  forwardDeadLetteredMessagesTo,
  forwardTo,
  lockDuration,
  maxDeliveryCount,
  maxMessageSizeInKilobytes,
  maxSizeInMegabytes,
  namespaceName,
  queueName,
  requiresDuplicateDetection,
  requiresSession,
  resourceGroupName,
  status,
  subscriptionId,
} from "../inputs";
import type { CreateOrUpdateQueueBody } from "../types/CreateOrUpdateQueueBody";
import type { EntityStatus } from "../types/EntityStatus";

export const createOrUpdateQueue = action({
  display: {
    label: "Create or Update Queue",
    description:
      "Creates or updates a Service Bus queue. This operation is idempotent.",
  },
  examplePayload: createOrUpdateQueueExamplePayload,
  perform: async (
    context,
    {
      connection,
      namespaceName,
      queueName,
      resourceGroupName,
      subscriptionId,
      autoDeleteOnIdle,
      deadLetteringOnMessageExpiration,
      defaultMessageTimeToLive,
      duplicateDetectionHistoryTimeWindow,
      enableBatchedOperations,
      enableExpress,
      enablePartitioning,
      forwardDeadLetteredMessagesTo,
      forwardTo,
      lockDuration,
      maxDeliveryCount,
      maxMessageSizeInKilobytes,
      maxSizeInMegabytes,
      requiresDuplicateDetection,
      requiresSession,
      status,
    },
  ) => {
    const client = getAzureServiceBusClient(connection, context.debug.enabled);
    try {
      const body: CreateOrUpdateQueueBody = {
        properties: {
          ...(autoDeleteOnIdle.length && { autoDeleteOnIdle }),
          deadLetteringOnMessageExpiration,
          ...(defaultMessageTimeToLive.length && { defaultMessageTimeToLive }),
          ...(duplicateDetectionHistoryTimeWindow.length && {
            duplicateDetectionHistoryTimeWindow,
          }),
          enableBatchedOperations,
          enableExpress,
          enablePartitioning,
          ...(forwardDeadLetteredMessagesTo.length && {
            forwardDeadLetteredMessagesTo,
          }),
          ...(forwardTo.length && { forwardTo }),
          ...(lockDuration.length && { lockDuration }),
          ...(maxDeliveryCount.length && {
            maxDeliveryCount: util.types.toNumber(maxDeliveryCount),
          }),
          ...(maxMessageSizeInKilobytes.length && {
            maxMessageSizeInKilobytes: util.types.toNumber(
              maxMessageSizeInKilobytes,
            ),
          }),
          ...(maxSizeInMegabytes.length && {
            maxSizeInMegabytes: util.types.toNumber(maxSizeInMegabytes),
          }),
          requiresDuplicateDetection,
          requiresSession,
          ...(status.length && { status: status as EntityStatus }),
        },
      };
      const { data } = await client.put(
        `/${subscriptionId}/resourceGroups/${resourceGroupName}/providers/Microsoft.ServiceBus/namespaces/${namespaceName}/queues/${queueName}?api-version=2021-11-01`,
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
    queueName,
    resourceGroupName,
    subscriptionId,
    autoDeleteOnIdle,
    deadLetteringOnMessageExpiration,
    defaultMessageTimeToLive,
    duplicateDetectionHistoryTimeWindow,
    enableBatchedOperations,
    enableExpress,
    enablePartitioning,
    forwardDeadLetteredMessagesTo,
    forwardTo,
    lockDuration,
    maxDeliveryCount,
    maxMessageSizeInKilobytes,
    maxSizeInMegabytes,
    requiresDuplicateDetection,
    requiresSession,
    status,
  },
});

export default { createOrUpdateQueue };
