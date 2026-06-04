import { action } from "@prismatic-io/spectral";
import { getShopifyClient } from "../../client";
import { countCustomersInputs } from "../../inputs";
import { countCustomersExamplePayload } from "../../payloadExamples";

export const countCustomers = action({
  display: {
    label: "Count Customers (Deprecated)",
    description:
      "Retrieve a count of all the customers connected to your platform. This version of the action is being deprecated. Please replace action with Count Customers.",
  },
  perform: async (context, { shopifyConnection }) => {
    const client = getShopifyClient(shopifyConnection, undefined, context.debug.enabled);
    return { data: (await client.get("/customers/count")).data };
  },
  inputs: countCustomersInputs,
  examplePayload: { data: countCustomersExamplePayload },
});
