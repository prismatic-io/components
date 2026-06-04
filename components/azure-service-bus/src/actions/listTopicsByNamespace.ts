import { action, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { getAzureServiceBusClient } from "../client";
import { listTopicsByNamespaceExamplePayload } from "../examplePayloads";
import {
  $skip,
  $top,
  connection,
  namespaceName,
  queueName,
  resourceGroupName,
  subscriptionId,
} from "../inputs";

export const listTopicsByNamespace = action({
  display: {
    label: "List Topics By Namespace",
    description: "Gets all the topics in a namespace",
  },
  examplePayload: listTopicsByNamespaceExamplePayload,
  perform: async (
    context,
    {
      connection,
      namespaceName,
      resourceGroupName,
      subscriptionId,
      $skip,
      $top,
    },
  ) => {
    const client = getAzureServiceBusClient(connection, context.debug.enabled);
    try {
      const { data } = await client.get(
        `/${subscriptionId}/resourceGroups/${resourceGroupName}/providers/Microsoft.ServiceBus/namespaces/${namespaceName}/topics?api-version=2021-11-01${
          $skip.length ? `&${$skip}` : ""
        }${$top.length ? `&${$top}` : ""}`,
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
    $skip,
    $top,
  },
});

export default { listTopicsByNamespace };
