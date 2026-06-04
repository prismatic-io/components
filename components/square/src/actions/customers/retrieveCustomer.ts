import { action } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../../client";
import { retrieveCustomerExamplePayload } from "../../examplePayloads";
import { retrieveCustomerInputs } from "../../inputs";

export const retrieveCustomer = action({
  display: {
    label: "Retrieve Customer",
    description: "Retrieves details for a single customer.",
  },
  perform: async (context, { customerId, squareConnection }) => {
    const client = await createAuthorizedClient(squareConnection, context.debug.enabled);

    const response = await client.get(`/v2/customers/${customerId}`);

    return {
      data: response.data,
    };
  },
  inputs: retrieveCustomerInputs,
  examplePayload: retrieveCustomerExamplePayload,
});
