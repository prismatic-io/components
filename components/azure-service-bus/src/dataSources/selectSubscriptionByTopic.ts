import { dataSource, input, util } from "@prismatic-io/spectral";
import { getAzureServiceBusClient } from "../client";
import { connection } from "../inputs";
import type { TopicSubscriptionItem } from "../types/DataSources";
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

export const selectSubscriptionByTopic = dataSource({
  display: {
    label: "Select Subscription by Topic",
    description: "A picklist of subscriptions under a specified topic.",
  },
  inputs: {
    connection,
    subscriptionId,
    resourceGroupName,
    namespaceName,
    topicName,
  },
  perform: async (
    _context,
    { connection, subscriptionId, resourceGroupName, namespaceName, topicName },
  ) => {
    const client = getAzureServiceBusClient(connection, false);
    const { data } = await client.get(
      `/${subscriptionId}/resourceGroups/${resourceGroupName}/providers/Microsoft.ServiceBus/namespaces/${namespaceName}/topics/${topicName}/subscriptions?api-version=2021-11-01`,
    );
    return {
      result: toSortedPicklist(
        data.value ?? [],
        (item: TopicSubscriptionItem) => ({
          key: item.name,
          label: item.name,
        }),
      ),
    };
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: [{ label: "my-subscription", key: "my-subscription" }],
  },
});
