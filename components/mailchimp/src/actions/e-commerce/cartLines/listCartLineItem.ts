import { action } from "@prismatic-io/spectral";
import { createClient } from "../../../client";
import {
  storeId,
  cartId,
  count,
  offset,
  fetchAll,
  connectionInput,
} from "../../../inputs";
import { paginatedRequest } from "../../../utils/pagination";

export const listCartLineItems = action({
  display: {
    label: "List Cart Line Items",
    description: "Get information about a cart's line items.",
  },
  perform: async (context, params) => {
    const client = await createClient(params.connection, context.debug.enabled);

    return paginatedRequest({
      client,
      endpoint: `/ecommerce/stores/${params.storeId}/carts/${params.cartId}/lines`,
      dataKey: "lines",
      fetchAll: params.fetchAll,
      count: params.count,
      offset: params.offset,
    });
  },
  inputs: {
    storeId: { ...storeId, required: true },
    cartId,
    count,
    offset,
    fetchAll,
    connection: connectionInput,
  },
});

export default listCartLineItems;
