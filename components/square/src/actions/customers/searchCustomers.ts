import { action, util } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../../client";
import { searchCustomersExamplePayload } from "../../examplePayloads";
import { searchCustomersInputs } from "../../inputs";

export const searchCustomers = action({
  display: {
    label: "Search Customers",
    description: "Searches for customer profiles.",
  },
  perform: async (context, { squareConnection, limit, query, cursor }) => {
    const client = await createAuthorizedClient(squareConnection, context.debug.enabled);

    if (limit !== undefined) limit = util.types.toInt(limit);

    const requestBody = {
      cursor,
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
