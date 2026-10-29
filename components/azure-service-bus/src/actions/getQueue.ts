import { action, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { getAzureServiceBusClient } from "../client";
import { getQueueExamplePayload } from "../examplePayloads";
import {
  connection,
  namespaceName,
  queueName,
  resourceGroupName,
  subscriptionId,
} from "../inputs";

export const getQueue = action({
  display: {
    label: "Get Queue",
    description: "Returns a description for the specified queue.",
  },
  examplePayload: getQueueExamplePayload,
  perform: async (
    context,
    { connection, subscriptionId, resourceGroupName, namespaceName, queueName },
  ) => {
    const client = getAzureServiceBusClient(connection, context.debug.enabled);
    try {
      const { data } = await client.get(
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
    subscriptionId,
    resourceGroupName,
    namespaceName,
    queueName,
  },
});

export default { getQueue };
