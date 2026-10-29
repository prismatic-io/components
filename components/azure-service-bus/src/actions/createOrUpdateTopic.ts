import { action, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { getAzureServiceBusClient } from "../client";
import { createOrUpdateTopicExamplePayload } from "../examplePayloads";
import {
  autoDeleteOnIdle,
  connection,
  defaultMessageTimeToLive,
  duplicateDetectionHistoryTimeWindow,
  enableBatchedOperations,
  enableExpress,
  enablePartitioning,
  maxMessageSizeInKilobytes,
  maxSizeInMegabytes,
  namespaceName,
  requiresDuplicateDetection,
  resourceGroupName,
  status,
  subscriptionId,
  supportOrdering,
  topicName,
} from "../inputs";
import type { CreateOrUpdateTopicBody } from "../types/CreateOrUpdateTopicBody";
import type { EntityStatus } from "../types/EntityStatus";

export const createOrUpdateTopic = action({
  display: {
    label: "Create or Update Topic",
    description: "Creates or updates a topic in the specified namespace.",
  },
  examplePayload: createOrUpdateTopicExamplePayload,
  perform: async (
    context,
    {
      connection,
      namespaceName,
      resourceGroupName,
      subscriptionId,
      topicName,
      autoDeleteOnIdle,
      defaultMessageTimeToLive,
      duplicateDetectionHistoryTimeWindow,
      enableBatchedOperations,
      enableExpress,
      enablePartitioning,
      maxMessageSizeInKilobytes,
      maxSizeInMegabytes,
      requiresDuplicateDetection,
      status,
      supportOrdering,
    },
  ) => {
    const client = getAzureServiceBusClient(connection, context.debug.enabled);
    try {
      const body: CreateOrUpdateTopicBody = {
        properties: {
          ...(autoDeleteOnIdle.length && {
            autoDeleteOnIdle,
          }),
          ...(defaultMessageTimeToLive.length && {
            defaultMessageTimeToLive,
          }),
          ...(duplicateDetectionHistoryTimeWindow.length && {
            duplicateDetectionHistoryTimeWindow,
          }),
          enableBatchedOperations,
          enableExpress,
          enablePartitioning,
          ...(maxMessageSizeInKilobytes.length && {
            maxMessageSizeInKilobytes: util.types.toNumber(
              maxMessageSizeInKilobytes,
            ),
          }),
          ...(maxSizeInMegabytes.length && {
            maxSizeInMegabytes: util.types.toNumber(maxSizeInMegabytes),
          }),
          requiresDuplicateDetection,
          ...(status.length && { status: status as EntityStatus }),
          supportOrdering,
        },
      };
      const { data } = await client.put(
        `/${subscriptionId}/resourceGroups/${resourceGroupName}/providers/Microsoft.ServiceBus/namespaces/${namespaceName}/topics/${topicName}?api-version=2021-11-01`,
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
    autoDeleteOnIdle,
    defaultMessageTimeToLive,
    duplicateDetectionHistoryTimeWindow,
    enableBatchedOperations,
    enableExpress,
    enablePartitioning,
    maxMessageSizeInKilobytes,
    maxSizeInMegabytes,
    requiresDuplicateDetection,
    status,
    supportOrdering,
  },
});

export default { createOrUpdateTopic };
