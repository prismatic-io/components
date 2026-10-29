import { action } from "@prismatic-io/spectral";
import { createClient } from "../../../client";
import {
  storeId,
  count,
  offset,
  fetchAll,
  connectionInput,
} from "../../../inputs";
import { paginatedRequest } from "../../../utils/pagination";

export const listOrders = action({
  display: {
    label: "List Orders",
    description: "List all the orders in a store",
  },
  perform: async (context, params) => {
    const client = await createClient(params.connection, context.debug.enabled);

    return paginatedRequest({
      client,
      endpoint: `/ecommerce/stores/${params.storeId}/orders/`,
      dataKey: "orders",
      fetchAll: params.fetchAll,
      count: params.count,
      offset: params.offset,
    });
  },
  inputs: {
    storeId: { ...storeId, required: true },
    count,
    offset,
    fetchAll,
    connection: connectionInput,
  },
});

export default listOrders;
