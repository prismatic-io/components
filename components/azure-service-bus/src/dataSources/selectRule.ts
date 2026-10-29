import { dataSource, input, util } from "@prismatic-io/spectral";
import { getAzureServiceBusClient } from "../client";
import { connection } from "../inputs";
import type { RuleItem } from "../types/DataSources";
import { toSortedPicklist } from "./helpers";

const subscriptionId = input({
  label: "Subscription ID",
  comments: "The Azure subscription ID.",
  type: "string",
  required: true,
  clean: util.types.toString,
});

const resourceGroupName = input({
  label: "Resource Group Name",
  comments: "Name of the Resource group within the Azure subscription.",
  type: "string",
  required: true,
  clean: util.types.toString,
});

const namespaceName = input({
  label: "Namespace Name",
  comments: "The namespace name.",
  type: "string",
  required: true,
  clean: util.types.toString,
});

const topicName = input({
  label: "Topic Name",
  comments: "The topic name.",
  type: "string",
  required: true,
  clean: util.types.toString,
});

const subscriptionName = input({
  label: "Subscription Name",
  comments: "The subscription name.",
  type: "string",
  required: true,
  clean: util.types.toString,
});

export const selectRule = dataSource({
  display: {
    label: "Select Rule",
    description: "A picklist of rules within a topic subscription.",
  },
  inputs: {
    connection,
    subscriptionId,
    resourceGroupName,
    namespaceName,
    topicName,
    subscriptionName,
  },
  perform: async (
    _context,
    {
      connection,
      subscriptionId,
      resourceGroupName,
      namespaceName,
      topicName,
      subscriptionName,
    },
  ) => {
    const client = getAzureServiceBusClient(connection, false);
    const { data } = await client.get(
      `/${subscriptionId}/resourceGroups/${resourceGroupName}/providers/Microsoft.ServiceBus/namespaces/${namespaceName}/topics/${topicName}/subscriptions/${subscriptionName}/rules?api-version=2021-11-01`,
    );
    return {
      result: toSortedPicklist(data.value ?? [], (item: RuleItem) => ({
        key: item.name,
        label: item.name,
      })),
    };
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: [{ label: "my-rule", key: "my-rule" }],
  },
});
