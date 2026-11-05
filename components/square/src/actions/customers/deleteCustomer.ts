import { action } from "@prismatic-io/spectral";
import { createAuthorizedClient, getVersionFromConnection } from "../../client";
import { deleteCustomerExamplePayload } from "../../examplePayloads";
import { deleteCustomerInputs } from "../../inputs";

export const deleteCustomer = action({
  display: {
    label: "Delete Customer",
    description: "Deletes a customer profile from a business.",
  },
  perform: async (context, { customerId, squareConnection }) => {
    const client = await createAuthorizedClient(squareConnection, context.debug.enabled);
    const version = getVersionFromConnection(squareConnection);

    const response = await client.request({
      url: `/v2/customers/${customerId}`,
      method: "DELETE",
      params: { version },
    });

    return {
      data: response.data,
    };
  },
  inputs: deleteCustomerInputs,
  examplePayload: deleteCustomerExamplePayload,
});
