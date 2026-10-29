import { action } from "@prismatic-io/spectral";
import { createApiClient } from "../../client";
import { listOrdersResponse } from "../../examplePayloads";
import { connection, page } from "../../inputs";

export const listOrders = action({
  display: {
    label: "List Orders",
    description: "Retrieve all orders.",
  },
  inputs: {
    page: {
      ...page,
      comments:
        "Offset page for results: return the N-th set of limit-results. Limit is currently hardcoded to 10.",
      required: false,
    },
    connection,
  },
  perform: async (context, { connection, page }) => {
    const client = createApiClient(connection, context.debug.enabled);
    const { data } = await client.get(`/store/order`, {
      params: {
        page,
      },
    });
    return { data };
  },
  examplePayload: {
    data: listOrdersResponse,
  },
});
