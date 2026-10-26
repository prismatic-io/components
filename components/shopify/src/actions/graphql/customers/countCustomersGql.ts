import { action, outputSchema } from "@prismatic-io/spectral";
import { getShopifyGraphQlClient } from "../../../client";
import { countCustomersExamplePayload as examplePayload } from "../../../examplePayloads";
import { countCustomersInputs as inputs } from "../../../inputsGql";
import { countCustomersGqlOutputSchema } from "../../../outputSchemas";
import type { Count } from "../../../types";
import countCustomersQuery from "../queries/customers/CountCustomers.gql";
export const countCustomersGql = action({
  display: {
    label: "Count Customers",
    description: "Returns a count of all customers.",
  },
  performSafety: "safe",
  perform: async (context, { shopifyConnection }) => {
    const client = getShopifyGraphQlClient(
      shopifyConnection,
      undefined,
      context.debug.enabled,
      context.logger,
    );
    const data: {
      customersCount: Count;
    } = await client.request(countCustomersQuery);
    return {
      data: data.customersCount,
    };
  },
  inputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: countCustomersGqlOutputSchema,
  }),
  examplePayload,
});
