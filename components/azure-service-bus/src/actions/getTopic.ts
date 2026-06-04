import { action, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { getAzureServiceBusClient } from "../client";
import { getTopicExamplePayload } from "../examplePayloads";
import {
  connection,
  namespaceName,
  resourceGroupName,
  subscriptionId,
  topicName,
} from "../inputs";

export const getTopic = action({
  display: {
    label: "Get Topic",
    description: "Gets all the topics in a namespace",
  },
  examplePayload: getTopicExamplePayload,
  perform: async (
    context,
    { connection, namespaceName, resourceGroupName, subscriptionId, topicName },
  ) => {
    const client = getAzureServiceBusClient(connection, context.debug.enabled);
    try {
      const { data } = await client.get(
        `/${subscriptionId}/resourceGroups/${resourceGroupName}/providers/Microsoft.ServiceBus/namespaces/${namespaceName}/topics/${topicName}?api-version=2021-11-01`,
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
  },
});

export default { getTopic };
