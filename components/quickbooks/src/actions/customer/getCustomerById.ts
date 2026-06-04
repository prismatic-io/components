import { action } from "@prismatic-io/spectral";
import { createHttpClient } from "../../client";
import { getCustomerByIdPayload as examplePayload } from "../../examplePayloads";
import { connectionInput, customerId } from "../../inputs";

export const getCustomerById = action({
  display: {
    label: "Get Customer By ID",
    description:
      "Retrieve information about the Customer which matches the given ID.",
  },
  perform: async (context, params) => {
    const client = createHttpClient(
      params.quickbooksConnection,
      context.debug.enabled,
    );

    const { data } = await client.get(`/customer/${params.id}`);
    return {
      data: data.Customer,
    };
  },
  inputs: {
    quickbooksConnection: connectionInput,
    id: {
      ...customerId,
      required: true,
      comments: "The id of the customer to get.",
    },
  },
  examplePayload,
});
