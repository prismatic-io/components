import { action } from "@prismatic-io/spectral";
import { getShopifyGraphQlClient } from "../../../client";
import { countCustomersExamplePayload as examplePayload } from "../../../examplePayloads";
import { countCustomersInputs as inputs } from "../../../inputsGql";
import type { Count } from "../../interfaces/Count";
import countCustomersQuery from "../queries/customers/CountCustomers.gql";

export const countCustomersGql = action({
  display: {
    label: "Count Customers",
    description: "Returns a count of all customers.",
  },
  perform: async (context, { shopifyConnection }) => {
    const client = getShopifyGraphQlClient(shopifyConnection, undefined, context.debug.enabled);

    const data: {
      customersCount: Count;
    } = await client.request(countCustomersQuery);

    return {
      data: data.customersCount,
    };
  },
  inputs,
  examplePayload,
});
