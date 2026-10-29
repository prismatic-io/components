import { action } from "@prismatic-io/spectral";
import { createClient } from "../../../client";
import {
  offset,
  storeId,
  count,
  fetchAll,
  connectionInput,
} from "../../../inputs";
import { paginatedRequest } from "../../../utils/pagination";

export const listCustomers = action({
  display: {
    label: "List Customers",
    description: "Get information about a store's customers",
  },
  perform: async (context, params) => {
    const client = await createClient(params.connection, context.debug.enabled);

    return paginatedRequest({
      client,
      endpoint: `/ecommerce/stores/${params.storeId}/customers`,
      dataKey: "customers",
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

export default listCustomers;
