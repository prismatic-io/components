import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { connectionInput, merchantId } from "../inputs";

export const selectProduct = dataSource({
  display: {
    label: "Select Product",
    description: "A picklist of products in your Merchant Center account.",
  },
  inputs: {
    connection: connectionInput,
    merchantId: {
      ...merchantId,
      comments:
        "The ID of the managing account. Used to list products under this merchant.",
    },
  },
  perform: async (_context, { connection, merchantId }) => {
    const client = createClient(connection);

    const allResources: {
      id?: string | null;
      title?: string | null;
      offerId?: string | null;
    }[] = [];
    let nextPageToken: string | null | undefined;

    do {
      const { data } = await client.products.list({
        merchantId,
        pageToken: nextPageToken || undefined,
      });

      if (data.resources) {
        allResources.push(...data.resources);
      }

      nextPageToken = data.nextPageToken;
    } while (nextPageToken);

    return {
      result: allResources
        .map<Element>((product) => ({
          label: product.title || product.offerId || product.id || "Unknown",
          key: product.id?.toString() || "",
        }))
        .filter((item) => item.key)
        .sort((a, b) => ((a.label ?? "") < (b.label ?? "") ? -1 : 1)),
    };
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: [
      {
        label: "Google Hoodie Sweatshirt",
        key: "online:en:US:2222222222",
      },
      {
        label: "Google Organic Cotton T-Shirt",
        key: "online:en:US:1111111111",
      },
    ],
  },
});
