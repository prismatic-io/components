import { action, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { getAzureServiceBusClient } from "../client";
import { listNamespacesExamplePayload } from "../examplePayloads";
import { connection, subscriptionId } from "../inputs";

export const listNamespaces = action({
  display: {
    label: "List Namespaces",
    description:
      "Gets all the available namespaces within the subscription, irrespective of the resource groups.",
  },
  examplePayload: listNamespacesExamplePayload,
  perform: async (context, { connection, subscriptionId }) => {
    const client = getAzureServiceBusClient(connection, context.debug.enabled);
    try {
      const { data } = await client.get(
        `/${subscriptionId}/providers/Microsoft.ServiceBus/namespaces?api-version=2021-11-01`,
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
  },
});

export default { listNamespaces };
