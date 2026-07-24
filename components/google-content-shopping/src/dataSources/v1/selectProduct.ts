import { dataSource } from "@prismatic-io/spectral";
import { createClientMerchant } from "../../client";
import { selectProductMerchantExamplePayload } from "../../examplePayloads/v1";
import { selectProductMerchantInputs } from "../../inputs/v1";
import type { ProductSummary } from "../../types";
import { fetchAllPages } from "../../util/pagination";
import { toPicklist } from "../../util/picklist";
import { accountResourceName } from "../../util/resourceNames";
export const selectProductMerchant = dataSource({
  display: {
    label: "Select Product (Merchant v1)",
    description: "A picklist of products in the Merchant Center account.",
  },
  inputs: selectProductMerchantInputs,
  perform: async (_context, { connection, account }) => {
    const client = createClientMerchant(connection);
    const parent = accountResourceName(account);
    const products = await fetchAllPages<ProductSummary>(async (token) => {
      const { data } = await client.get(`/products/v1/${parent}/products`, {
        params: { pageToken: token },
      });
      return {
        items: data.products ?? [],
        nextPageToken: data.nextPageToken,
      };
    });
    return toPicklist(products, (product) => ({
      label: product.title || product.offerId || "Unknown",
      key: product.offerId || "",
    }));
  },
  dataSourceType: "picklist",
  examplePayload: selectProductMerchantExamplePayload,
});
