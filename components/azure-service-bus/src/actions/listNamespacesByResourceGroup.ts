import { action, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { getAzureServiceBusClient } from "../client";
import { listNamespacesByResourceGroupExamplePayload } from "../examplePayloads";
import { connection, resourceGroupName, subscriptionId } from "../inputs";

export const listNamespacesByResourceGroup = action({
  display: {
    label: "List Namespaces By Resource Group",
    description: "Gets the available namespaces within a resource group.",
  },
  examplePayload: listNamespacesByResourceGroupExamplePayload,
  perform: async (
    context,
    { connection, resourceGroupName, subscriptionId },
  ) => {
    const client = getAzureServiceBusClient(connection, context.debug.enabled);
    try {
      const { data } = await client.get(
        `/${subscriptionId}/resourceGroups/${resourceGroupName}/providers/Microsoft.ServiceBus/namespaces?api-version=2021-11-01`,
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
    resourceGroupName,
    subscriptionId,
  },
});

export default { listNamespacesByResourceGroup };
