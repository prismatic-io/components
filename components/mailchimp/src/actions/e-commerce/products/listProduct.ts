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

export const listProducts = action({
  display: {
    label: "List Products",
    description: "List all products from a store",
  },
  perform: async (context, params) => {
    const client = await createClient(params.connection, context.debug.enabled);

    return paginatedRequest({
      client,
      endpoint: `/ecommerce/stores/${params.storeId}/products`,
      dataKey: "products",
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

export default listProducts;
