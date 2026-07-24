import { action } from "@prismatic-io/spectral";
import { createClientMerchant } from "../../../client";
import { listProductsExamplePayload } from "../../../examplePayloads/v1";
import { listProductsInputs } from "../../../inputs/v1/products";
import { fetchAllPages } from "../../../util/pagination";
import { accountResourceName } from "../../../util/resourceNames";
export const listProductsMerchant = action({
  display: {
    description: "Lists the processed products in the Merchant Center account.",
    label: "List Products (Merchant v1)",
  },
  inputs: listProductsInputs,
  perform: async (
    context,
    { connectionInput, account, pagination, fetchAll },
  ) => {
    const client = createClientMerchant(connectionInput, context.debug.enabled);
    const parent = accountResourceName(account);
    if (fetchAll) {
      const products = await fetchAllPages(async (token) => {
        const { data } = await client.get(`/products/v1/${parent}/products`, {
          params: { pageSize: pagination.pageSize, pageToken: token },
        });
        return {
          items: data.products ?? [],
          nextPageToken: data.nextPageToken,
        };
      });
      return { data: { products } };
    }
    const { data } = await client.get(`/products/v1/${parent}/products`, {
      params: {
        pageSize: pagination.pageSize,
        pageToken: pagination.pageToken,
      },
    });
    return { data };
  },
  examplePayload: listProductsExamplePayload,
});
