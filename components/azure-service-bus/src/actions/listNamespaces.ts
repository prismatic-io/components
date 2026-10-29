import { action, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { getAzureServiceBusClient } from "../client";
import { listNamespacesExamplePayload } from "../examplePayloads";
import { paginateResults } from "../helpers/pagination";
import { connection, fetchAll, subscriptionId } from "../inputs";

export const listNamespaces = action({
  display: {
    label: "List Namespaces",
    description:
      "Gets all the available namespaces within the subscription, irrespective of the resource groups.",
  },
  examplePayload: listNamespacesExamplePayload,
  perform: async (context, { connection, subscriptionId, fetchAll }) => {
    const client = getAzureServiceBusClient(connection, context.debug.enabled);
    const endpoint = `/${subscriptionId}/providers/Microsoft.ServiceBus/namespaces?api-version=2021-11-01`;

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
    subscriptionId,
    fetchAll,
  },
});

export default { listNamespaces };
