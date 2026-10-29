import { action, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { getAzureServiceBusClient } from "../client";
import { listNamespacesByResourceGroupExamplePayload } from "../examplePayloads";
import { paginateResults } from "../helpers/pagination";
import {
  connection,
  fetchAll,
  resourceGroupName,
  subscriptionId,
} from "../inputs";

export const listNamespacesByResourceGroup = action({
  display: {
    label: "List Namespaces By Resource Group",
    description: "Gets the available namespaces within a resource group.",
  },
  examplePayload: listNamespacesByResourceGroupExamplePayload,
  perform: async (
    context,
    { connection, resourceGroupName, subscriptionId, fetchAll },
  ) => {
    const client = getAzureServiceBusClient(connection, context.debug.enabled);
    const endpoint = `/${subscriptionId}/resourceGroups/${resourceGroupName}/providers/Microsoft.ServiceBus/namespaces?api-version=2021-11-01`;

    try {
      return await paginateResults({
        client,
        endpoint,
        fetchAll,
      });
    } catch (error) {
      const handled = handleErrors(error);
      const serialized = util.types.toJSON(handled);
      throw new Error(serialized);
    }
  },
  inputs: {
    connection,
    resourceGroupName,
    subscriptionId,
    fetchAll,
  },
});

export default { listNamespacesByResourceGroup };
