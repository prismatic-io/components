import { action, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { getAzureServiceBusClient } from "../client";
import { deleteTopicExamplePayload } from "../examplePayloads";
import {
  connection,
  namespaceName,
  resourceGroupName,
  subscriptionId,
  topicName,
} from "../inputs";

export const deleteTopic = action({
  display: {
    label: "Delete Topic",
    description:
      "Deletes a topic from the specified namespace and resource group.",
  },
  examplePayload: deleteTopicExamplePayload,
  perform: async (
    context,
    { connection, namespaceName, resourceGroupName, subscriptionId, topicName },
  ) => {
    const client = getAzureServiceBusClient(connection, context.debug.enabled);
    try {
      const { data } = await client.delete(
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

export default { deleteTopic };
