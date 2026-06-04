import { action } from "@prismatic-io/spectral";
import { createClient } from "../../../client";
import { connectionInput, count, offset, fetchAll } from "../../../inputs";
import { paginatedRequest } from "../../../utils/pagination";

export const getProductInfo = action({
  display: {
    label: "List Account Orders",
    description: "Get information about an account's orders",
  },
  perform: async (context, params) => {
    const client = await createClient(params.connection, context.debug.enabled);

    return paginatedRequest({
      client,
      endpoint: "/ecommerce/orders",
      dataKey: "orders",
      fetchAll: params.fetchAll,
      count: params.count,
      offset: params.offset,
    });
  },
  inputs: { connection: connectionInput, count, offset, fetchAll },
});

export default getProductInfo;
