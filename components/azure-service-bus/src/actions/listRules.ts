import { action, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { getAzureServiceBusClient } from "../client";
import { listRulesExamplePayload } from "../examplePayloads";
import {
  $skip,
  $top,
  connection,
  namespaceName,
  resourceGroupName,
  subscriptionId,
  subscriptionName,
  topicName,
} from "../inputs";

export const listRules = action({
  display: {
    label: "List Rules",
    description: "List all the rules within given topic-subscription",
  },
  examplePayload: listRulesExamplePayload,
  perform: async (
    context,
    {
      connection,
      subscriptionId,
      resourceGroupName,
      namespaceName,
      topicName,
      subscriptionName,
      $skip,
      $top,
    },
  ) => {
    const client = getAzureServiceBusClient(connection, context.debug.enabled);
    try {
      const { data } = await client.get(
        `/${subscriptionId}/resourceGroups/${resourceGroupName}/providers/Microsoft.ServiceBus/namespaces/${namespaceName}/topics/${topicName}/subscriptions/${subscriptionName}/rules?api-version=2021-11-01${
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
    topicName,
    subscriptionName,
    $skip,
    $top,
  },
});

export default { listRules };
