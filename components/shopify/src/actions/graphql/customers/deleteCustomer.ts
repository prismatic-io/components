import { action } from "@prismatic-io/spectral";
import { getShopifyGraphQlClient } from "../../../client";
import { deleteCustomerExamplePayload } from "../../../examplePayloads";
import { deleteCustomerInputs as inputs } from "../../../inputsGql";
import deleteCustomerQuery from "../queries/customers/DeleteCustomer.gql";

export const deleteCustomerGql = action({
  display: {
    label: "Delete Customer",
    description: "Deletes an existing customer.",
  },
  perform: async (context, { customerIdGql, shopifyConnection }) => {
    const client = getShopifyGraphQlClient(shopifyConnection, undefined, context.debug.enabled);
    await client.request(deleteCustomerQuery, {
      id: customerIdGql,
    });

    return {
      data: {},
    };
  },
  inputs,
  examplePayload: deleteCustomerExamplePayload.restMap,
});
