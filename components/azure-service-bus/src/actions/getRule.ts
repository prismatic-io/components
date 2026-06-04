import { action, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { getAzureServiceBusClient } from "../client";
import { getRuleExamplePayload } from "../examplePayloads";
import {
  connection,
  namespaceName,
  resourceGroupName,
  ruleName,
  subscriptionId,
  subscriptionName,
  topicName,
} from "../inputs";

export const getRule = action({
  display: {
    label: "Get Rule",
    description: "Retrieves the description for the specified rule.",
  },
  examplePayload: getRuleExamplePayload,
  perform: async (
    context,
    {
      connection,
      namespaceName,
      resourceGroupName,
      subscriptionId,
      topicName,
      subscriptionName,
      ruleName,
    },
  ) => {
    const client = getAzureServiceBusClient(connection, context.debug.enabled);
    try {
      const { data } = await client.get(
        `/${subscriptionId}/resourceGroups/${resourceGroupName}/providers/Microsoft.ServiceBus/namespaces/${namespaceName}/topics/${topicName}/subscriptions/${subscriptionName}/rules/${ruleName}?api-version=2021-11-01`,
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
    ruleName,
  },
});

export default { getRule };
