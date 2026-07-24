import { dataSource } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { selectProductExamplePayload } from "../../examplePayloads/v2_1";
import { selectProductInputs } from "../../inputs/v2_1";
import { fetchAllPages } from "../../util/pagination";
import { toPicklist } from "../../util/picklist";
export const selectProduct = dataSource({
  display: {
    label: "Select Product (Legacy v2.1)",
    description: "A picklist of products in the Merchant Center account.",
  },
  inputs: selectProductInputs,
  perform: async (_context, { connection, merchantId }) => {
    const client = createClient(connection);
    const allResources = await fetchAllPages(async (pageToken) => {
      const { data } = await client.products.list({ merchantId, pageToken });
      return {
        items: data.resources ?? [],
        nextPageToken: data.nextPageToken ?? undefined,
      };
    });
    return toPicklist(allResources, (product) => ({
      label: product.title || product.offerId || product.id || "Unknown",
      key: product.id?.toString() || "",
    }));
  },
  dataSourceType: "picklist",
  examplePayload: selectProductExamplePayload,
});
