import { action } from "@prismatic-io/spectral";
import { createClient } from "../../../client";
import {
  storeId,
  offset,
  count,
  fetchAll,
  connectionInput,
} from "../../../inputs";
import { paginatedRequest } from "../../../utils/pagination";

export const listCarts = action({
  display: {
    label: "List Carts",
    description: "Get information about a store's carts",
  },
  perform: async (context, params) => {
    const client = await createClient(params.connection, context.debug.enabled);

    return paginatedRequest({
      client,
      endpoint: `/ecommerce/stores/${params.storeId}/carts`,
      dataKey: "carts",
      fetchAll: params.fetchAll,
      count: params.count,
      offset: params.offset,
    });
  },
  inputs: {
    storeId: { ...storeId, required: true },
    offset,
    count,
    fetchAll,
    connection: connectionInput,
  },
});

export default listCarts;
