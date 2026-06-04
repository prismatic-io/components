import { action, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { getAzureServiceBusClient } from "../client";
import { getSubscriptionsExamplePayload } from "../examplePayloads";
import {
  connection,
  namespaceName,
  resourceGroupName,
  subscriptionId,
  subscriptionName,
  topicName,
} from "../inputs";

export const getSubscriptions = action({
  display: {
    label: "Get Subscriptions",
    description: "Returns a subscription description for the specified topic.",
  },
  examplePayload: getSubscriptionsExamplePayload,
  perform: async (
    context,
    {
      connection,
      namespaceName,
      resourceGroupName,
      subscriptionId,
      topicName,
      subscriptionName,
    },
  ) => {
    const client = getAzureServiceBusClient(connection, context.debug.enabled);
    try {
      const { data } = await client.get(
        `/${subscriptionId}/resourceGroups/${resourceGroupName}/providers/Microsoft.ServiceBus/namespaces/${namespaceName}/topics/${topicName}/subscriptions/${subscriptionName}?api-version=2021-11-01`,
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
  },
});

export default { getSubscriptions };
