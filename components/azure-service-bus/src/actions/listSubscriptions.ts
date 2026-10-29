import { action } from "@prismatic-io/spectral";
import { getAzureServiceBusClient } from "../client";
import { connection, version } from "../inputs";

export const listSubscriptions = action({
  display: {
    label: "List Subscriptions",
    description: "List all the subscriptions",
  },
  perform: async (context, { connection, version }) => {
    const client = getAzureServiceBusClient(connection, context.debug.enabled);
    const { data } = await client.get("", {
      params: {
        "api-version": version,
      },
    });
    return { data };
  },
  inputs: {
    connection,
    version,
  },
});
