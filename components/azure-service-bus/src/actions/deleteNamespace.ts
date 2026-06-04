import { action, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { getAzureServiceBusClient } from "../client";
import { deleteNamespaceExamplePayload } from "../examplePayloads";
import {
  connection,
  namespaceName,
  resourceGroupName,
  subscriptionId,
} from "../inputs";

export const deleteNamespace = action({
  display: {
    label: "Delete Namespace",
    description:
      "Deletes an existing namespace. This operation also removes all associated resources under the namespace.",
  },
  examplePayload: deleteNamespaceExamplePayload,
  perform: async (
    context,
    { connection, namespaceName, resourceGroupName, subscriptionId },
  ) => {
    const client = getAzureServiceBusClient(connection, context.debug.enabled);
    try {
      const { data } = await client.delete(
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
    namespaceName,
    resourceGroupName,
    subscriptionId,
  },
});

export default { deleteNamespace };
