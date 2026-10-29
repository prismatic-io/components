import { dataSource, input, util } from "@prismatic-io/spectral";
import { getAzureServiceBusClient } from "../client";
import { connection } from "../inputs";
import type { NamespaceItem } from "../types/DataSources";
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

export const selectNamespaceByResourceGroup = dataSource({
  display: {
    label: "Select Namespace by Resource Group",
    description:
      "A picklist of Service Bus namespaces within a resource group.",
  },
  inputs: {
    connection,
    subscriptionId,
    resourceGroupName,
  },
  perform: async (
    _context,
    { connection, subscriptionId, resourceGroupName },
  ) => {
    const client = getAzureServiceBusClient(connection, false);
    const { data } = await client.get(
      `/${subscriptionId}/resourceGroups/${resourceGroupName}/providers/Microsoft.ServiceBus/namespaces?api-version=2021-11-01`,
    );
    return {
      result: toSortedPicklist(data.value ?? [], (item: NamespaceItem) => ({
        key: item.name,
        label: item.name,
      })),
    };
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: [{ label: "my-namespace", key: "my-namespace" }],
  },
});
