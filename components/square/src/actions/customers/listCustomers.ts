import { action, util } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../../client";
import { listCustomersExamplePayload } from "../../examplePayloads";
import { listCustomersInputs } from "../../inputs";

export const listCustomers = action({
  display: {
    label: "List Customers",
    description: "Lists customer profiles associated with a Square account.",
  },
  perform: async (context, { cursor, limit, sortField, sortOrder, squareConnection }) => {
    const client = await createAuthorizedClient(squareConnection, context.debug.enabled);

    
    const params: Record<string, unknown> = {};
    
    if (cursor !== undefined && cursor !== "") params.cursor = util.types.toString(cursor);
    if (limit !== undefined) params.limit = util.types.toInt(limit);
    if (sortField !== undefined) params.sort_field = util.types.toString(sortField);
    if (sortOrder !== undefined) params.sort_order = util.types.toString(sortOrder);

    const response = await client.get("/v2/customers", { params });

    return {
      data: response.data,
    };
  },
  inputs: listCustomersInputs,
  examplePayload: listCustomersExamplePayload,
});
