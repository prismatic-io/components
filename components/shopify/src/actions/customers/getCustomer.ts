import { action, outputSchema } from "@prismatic-io/spectral";
import { getCustomerExamplePayload } from "../../examplePayloads";
import { getCustomerInputs } from "../../inputs";
import { getCustomerOutputSchema } from "../../outputSchemas";
import { getCustomerGql } from "../graphql/customers/getCustomerGql";
export const getCustomer = action({
  display: {
    label: "Get Customer",
    description: "Retrieves a customer by ID.",
  },
  performSafety: "safe",
  perform: async (context, { customerId, shopifyConnection }) => {
    const { data } = await getCustomerGql.perform(context, {
      customerIdGql: `gid://shopify/Customer/${customerId}`,
      shopifyConnection,
    });
    return { data };
  },
  inputs: getCustomerInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getCustomerOutputSchema,
  }),
  examplePayload: getCustomerExamplePayload.restMap,
});
