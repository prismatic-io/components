import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listCustomersExamplePayload } from "../../examplePayloads";
import { listCustomersInputs } from "../../inputs";
import { searchGoogleAds } from "../../util";

export const listCustomers = action({
  display: {
    label: "List Customers by Manager",
    description: "List all customers under a manager account.",
  },
  inputs: listCustomersInputs,
  perform: async (
    context,
    { connection, managerCustomerId, pageToken, fetchAll },
  ) => {
    const client = createClient(
      connection,
      context.debug.enabled,
      context.logger,
    );

    const data = await searchGoogleAds(client, {
      customerId: managerCustomerId,
      params: {
        pageToken: pageToken || undefined,
        query: `
          SELECT customer_client.resource_name,
            customer_client.client_customer,
            customer_client.id,
            customer_client.level,
            customer_client.hidden,
            customer_client.level
          FROM customer_client
        `,
      },
      fetchAll: fetchAll,
    });
    return { data };
  },
  examplePayload: listCustomersExamplePayload,
});
