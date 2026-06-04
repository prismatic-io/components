import { dataSource } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../client";
import {
  bigCommerceConnection,
  getAllProductModifiersProductId,
  storeHash,
} from "../inputs";

export const selectProductModifiers = dataSource({
  dataSourceType: "picklist",
  display: {
    label: "Select Product Modifiers",
    description: "Select a modifier from a specific product.",
  },
  inputs: {
    bigCommerceConnection,
    storeHash,
    product_id: getAllProductModifiersProductId,
  },
  perform: async (_context, params) => {
    const client = await createAuthorizedClient(
      params.bigCommerceConnection,
      false,
    );
    const endpoint = `/stores/${params.storeHash}/v3/catalog/products/${params.product_id}/modifiers`;

    const { data } = await client.get(endpoint);

    return {
      result: data.map(
        (modifier: { id: string; display_name: string; name: string }) => ({
          key: modifier.id,
          label: modifier.display_name || modifier.name,
        }),
      ),
    };
  },
});
