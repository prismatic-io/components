import { action } from "@prismatic-io/spectral";
import { getCustomerInputs } from "../../inputs";
import { customerExamplePayload } from "../../payloadExamples";
import { getCustomerGql } from "../graphql/customers/getCustomer";

export const getCustomer = action({
  display: {
    label: "Get Customer",
    description: "Retrieves a customer by ID.",
  },
  perform: async (context, { customerId, shopifyConnection }) => {
    const { data } = await getCustomerGql.perform(context, {
      customerIdGql: `gid://shopify/Customer/${customerId}`,
      shopifyConnection,
    });
    return { data };
  },
  inputs: getCustomerInputs,
  examplePayload: { data: customerExamplePayload },
});
