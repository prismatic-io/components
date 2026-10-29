import { action, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { getAzureServiceBusClient } from "../client";
import { getNamespacesExamplePayload } from "../examplePayloads";
import {
  connection,
  namespaceName,
  resourceGroupName,
  subscriptionId,
} from "../inputs";

export const getNamespaces = action({
  display: {
    label: "Get Namespaces",
    description: "Gets a description for the specified namespace.",
  },
  examplePayload: getNamespacesExamplePayload,
  perform: async (
    context,
    { connection, subscriptionId, resourceGroupName, namespaceName },
  ) => {
    const client = getAzureServiceBusClient(connection, context.debug.enabled);
    try {
      const { data } = await client.get(
        `/${subscriptionId}/resourceGroups/${resourceGroupName}/providers/Microsoft.ServiceBus/namespaces/${namespaceName}?api-version=2021-11-01`,
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
  },
});

export default { getNamespaces };
