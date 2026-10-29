import { dataSource } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../client";
import { bigCommerceConnection, storeHash } from "../inputs";

export const selectProducts = dataSource({
  dataSourceType: "picklist",
  display: {
    label: "Select Products",
    description: "Select a product from a specific store.",
  },
  inputs: { bigCommerceConnection, storeHash },
  perform: async (_context, params) => {
    const client = await createAuthorizedClient(
      params.bigCommerceConnection,
      false,
    );
    const endpoint = `/stores/${params.storeHash}/v3/catalog/products`;

    const { data } = await client.get(endpoint);

    return {
      result: data.map((product: { id: string; name: string }) => ({
        key: product.id,
        label: product.name,
      })),
    };
  },
});
