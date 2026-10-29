import { action, util } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../../client";
import { searchCustomersExamplePayload } from "../../examplePayloads";
import { searchCustomersInputs } from "../../inputs";

export const searchCustomers = action({
  display: {
    label: "Search Customers",
    description: "Searches for customer profiles.",
  },
  perform: async (context, { squareConnection, pagination = {}, query }) => {
    const client = await createAuthorizedClient(
      squareConnection,
      context.debug.enabled,
    );

    const limit =
      pagination.limit !== undefined
        ? util.types.toInt(pagination.limit)
        : undefined;

    const requestBody = {
      cursor: pagination.cursor,
      limit,
      query,
    };

    const response = await client.post("/v2/customers/search", requestBody);

    return {
      data: response.data,
    };
  },
  inputs: searchCustomersInputs,
  examplePayload: searchCustomersExamplePayload,
});
