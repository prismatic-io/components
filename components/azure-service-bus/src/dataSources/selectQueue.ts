import { dataSource, input, util } from "@prismatic-io/spectral";
import { getAzureServiceBusClient } from "../client";
import { connection } from "../inputs";
import type { QueueItem } from "../types/DataSources";
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

export const selectQueue = dataSource({
  display: {
    label: "Select Queue",
    description: "A picklist of queues within a namespace.",
  },
  inputs: {
    connection,
    subscriptionId,
    resourceGroupName,
    namespaceName,
  },
  perform: async (
    _context,
    { connection, subscriptionId, resourceGroupName, namespaceName },
  ) => {
    const client = getAzureServiceBusClient(connection, false);
    const { data } = await client.get(
      `/${subscriptionId}/resourceGroups/${resourceGroupName}/providers/Microsoft.ServiceBus/namespaces/${namespaceName}/queues?api-version=2021-11-01`,
    );
    return {
      result: toSortedPicklist(data.value ?? [], (item: QueueItem) => ({
        key: item.name,
        label: item.name,
      })),
    };
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: [{ label: "my-queue", key: "my-queue" }],
  },
});
