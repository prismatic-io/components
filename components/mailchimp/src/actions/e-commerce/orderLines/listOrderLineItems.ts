import { action } from "@prismatic-io/spectral";
import { createClient } from "../../../client";
import {
  storeId,
  orderId,
  offset,
  count,
  fetchAll,
  connectionInput,
} from "../../../inputs";
import { paginatedRequest } from "../../../utils/pagination";

export const listOrderLineItems = action({
  display: {
    label: "List Order Line Items",
    description: "List Order Line items",
  },
  perform: async (context, params) => {
    const client = await createClient(params.connection, context.debug.enabled);

    return paginatedRequest({
      client,
      endpoint: `/ecommerce/stores/${params.storeId}/orders/${params.orderId}/lines`,
      dataKey: "lines",
      fetchAll: params.fetchAll,
      count: params.count,
      offset: params.offset,
    });
  },
  inputs: {
    storeId: { ...storeId, required: true },
    orderId: { ...orderId, required: true },
    count,
    offset,
    fetchAll,
    connection: connectionInput,
  },
});

export default listOrderLineItems;
