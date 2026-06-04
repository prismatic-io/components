import { action } from "@prismatic-io/spectral";
import { getShopifyClient } from "../../client";
import { deleteCustomerInputs } from "../../inputs";

export const deleteCustomer = action({
  display: {
    label: "Delete Customer (Deprecated)",
    description:
      "Delete an existing customer. This version of the action is being deprecated. Please replace action with Delete Customer.",
  },
  perform: async (context, { customerId, shopifyConnection }) => {
    const client = getShopifyClient(shopifyConnection, undefined, context.debug.enabled);
    const { data } = await client.delete(`/customers/${customerId}`);
    return { data };
  },
  inputs: deleteCustomerInputs,
  examplePayload: { data: {} },
});
