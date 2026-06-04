import { action, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { getAzureServiceBusClient } from "../client";
import { listQueuesExamplePayload } from "../examplePayloads";
import {
  $skip,
  $top,
  connection,
  namespaceName,
  resourceGroupName,
  subscriptionId,
} from "../inputs";

export const listQueues = action({
  display: {
    label: "List Queues",
    description: "Gets the queues within a namespace.",
  },
  examplePayload: listQueuesExamplePayload,
  perform: async (
    context,
    {
      connection,
      subscriptionId,
      resourceGroupName,
      namespaceName,
      $skip,
      $top,
    },
  ) => {
    const client = getAzureServiceBusClient(connection, context.debug.enabled);
    try {
      const { data } = await client.get(
        `/${subscriptionId}/resourceGroups/${resourceGroupName}/providers/Microsoft.ServiceBus/namespaces/${namespaceName}/queues?api-version=2021-11-01${
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
    subscriptionId,
    resourceGroupName,
    namespaceName,
    $skip,
    $top,
  },
});

export default { listQueues };
