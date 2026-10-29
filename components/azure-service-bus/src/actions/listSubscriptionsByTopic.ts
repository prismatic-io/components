import { action, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { getAzureServiceBusClient } from "../client";
import { listSubscriptionsByTopicExamplePayload } from "../examplePayloads";
import { paginateResults } from "../helpers/pagination";
import {
  $skip,
  $top,
  connection,
  fetchAll,
  namespaceName,
  queueName,
  resourceGroupName,
  subscriptionId,
  topicName,
} from "../inputs";

export const listSubscriptionsByTopic = action({
  display: {
    label: "List Subscriptions By Topic",
    description: "List all the subscriptions under a specified topic.",
  },
  examplePayload: listSubscriptionsByTopicExamplePayload,
  perform: async (
    context,
    {
      connection,
      namespaceName,
      resourceGroupName,
      subscriptionId,
      fetchAll,
      $skip,
      $top,
      topicName,
    },
  ) => {
    const client = getAzureServiceBusClient(connection, context.debug.enabled);
    const endpoint = `/${subscriptionId}/resourceGroups/${resourceGroupName}/providers/Microsoft.ServiceBus/namespaces/${namespaceName}/topics/${topicName}/subscriptions?api-version=2021-11-01`;

    try {
      return await paginateResults({
        client,
        endpoint,
        params: {
          $skip: $skip || undefined,
          $top: $top || undefined,
        },
        fetchAll,
      });
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
    fetchAll,
    $skip,
    $top,
    topicName,
  },
});

export default { listSubscriptionsByTopic };
