import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import {
  connectionInput,
  merchantId,
  maxResults,
  pageToken,
  fetchAll,
} from "../../inputs";
import { fetchAllProducts } from "../../helpers/fetchAllProducts";
import type { content_v2_1 } from "googleapis";
import { listProductsExamplePayload } from "../../examplePayloads";

export const listProducts = action({
  display: {
    description: "Lists the products in your Merchant Center account.",
    label: "List Products",
  },
  inputs: {
    connectionInput,
    merchantId,
    maxResults,
    pageToken,
    fetchAll,
  },
  perform: async (
    _context,
    { connectionInput, maxResults, pageToken, merchantId, fetchAll },
  ) => {
    const client = createClient(connectionInput);

    const params: content_v2_1.Params$Resource$Products$List = {
      merchantId,
      maxResults: maxResults || undefined,
      pageToken: pageToken || undefined,
    };

    const { data } = await fetchAllProducts({ client, fetchAll, params });

    return {
      data,
    };
  },
  examplePayload: listProductsExamplePayload,
});
