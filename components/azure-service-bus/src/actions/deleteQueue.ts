import { action, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { getAzureServiceBusClient } from "../client";
import { deleteQueueExamplePayload } from "../examplePayloads";
import {
  connection,
  namespaceName,
  queueName,
  resourceGroupName,
  subscriptionId,
} from "../inputs";

export const deleteQueue = action({
  display: {
    label: "Delete Queue",
    description:
      "Deletes a queue from the specified namespace in a resource group.",
  },
  examplePayload: deleteQueueExamplePayload,
  perform: async (
    context,
    { connection, namespaceName, resourceGroupName, subscriptionId, queueName },
  ) => {
    const client = getAzureServiceBusClient(connection, context.debug.enabled);
    try {
      const { data } = await client.delete(
        `/${subscriptionId}/resourceGroups/${resourceGroupName}/providers/Microsoft.ServiceBus/namespaces/${namespaceName}/queues/${queueName}?api-version=2021-11-01`,
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
    queueName,
  },
});

export default { deleteQueue };
