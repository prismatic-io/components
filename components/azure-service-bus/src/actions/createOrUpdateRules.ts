import { action, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { getAzureServiceBusClient } from "../client";
import { createOrUpdateRulesExamplePayload } from "../examplePayloads";
import {
  action as actionInput,
  connection,
  correlationFilter,
  filterType,
  namespaceName,
  resourceGroupName,
  ruleName,
  sqlFilter,
  subscriptionId,
  subscriptionName,
  topicName,
} from "../inputs";
import type { CreateOrUpdateRulesBody } from "../types/CreateOrUpdateRulesBody";
import type { FilterType } from "../types/FilterType";

export const createOrUpdateRules = action({
  display: {
    label: "Create or Update Rules",
    description: "Creates a new rule and updates an existing rule",
  },
  examplePayload: createOrUpdateRulesExamplePayload,
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
      actionInput,
      correlationFilter,
      filterType,
      sqlFilter,
    },
  ) => {
    const client = getAzureServiceBusClient(connection, context.debug.enabled);
    try {
      const body: CreateOrUpdateRulesBody = {
        properties: {
          ...(actionInput.length && { action: JSON.parse(actionInput) }),
          ...(correlationFilter.length && {
            correlationFilter: JSON.parse(correlationFilter),
          }),
          ...(filterType.length && { filterType: filterType as FilterType }),
          ...(sqlFilter.length && { sqlFilter: JSON.parse(sqlFilter) }),
        },
      };
      const { data } = await client.put(
        `/${subscriptionId}/resourceGroups/${resourceGroupName}/providers/Microsoft.ServiceBus/namespaces/${namespaceName}/topics/${topicName}/subscriptions/${subscriptionName}/rules/${ruleName}?api-version=2021-11-01`,
        body,
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
    actionInput,
    correlationFilter,
    filterType,
    sqlFilter,
  },
});

export default { createOrUpdateRules };
