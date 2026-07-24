import { action } from "@prismatic-io/spectral";
import type { content_v2_1 } from "googleapis";
import { createClient } from "../../../client";
import { listProductsExamplePayload } from "../../../examplePayloads/v2_1";
import { listProductsInputs } from "../../../inputs/v2_1";
import { fetchAllProducts } from "../../../util/fetchAllProducts";
export const listProducts = action({
  display: {
    description: "Lists the products in the Merchant Center account.",
    label: "List Products (Legacy v2.1)",
  },
  inputs: listProductsInputs,
  perform: async (
    _context,
    { connectionInput, pagination, merchantId, fetchAll },
  ) => {
    const client = createClient(connectionInput);
    const params: content_v2_1.Params$Resource$Products$List = {
      merchantId,
      maxResults: pagination.maxResults,
      pageToken: pagination.pageToken,
    };
    const { data } = await fetchAllProducts({ client, fetchAll, params });
    return {
      data,
    };
  },
  examplePayload: listProductsExamplePayload,
});
