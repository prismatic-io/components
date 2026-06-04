import { dataSource, type Element, util } from "@prismatic-io/spectral";
import { getHubspotClient } from "../client";
import { selectProductInputs } from "../inputs";
import type { Product } from "../types/Product";
import { getAllPaginatedData } from "../util";

export const selectProduct = dataSource({
  display: {
    label: "Select Product",
    description: "Select a product from the list of products.",
  },
  inputs: selectProductInputs,
  perform: async (_context, { connection }) => {
    const client = getHubspotClient({
      hubspotConnection: connection,
      debugRequest: false,
    });

    const products = (await getAllPaginatedData<Product>(
      client,
      "/crm/v3/objects/products",
      true,
      true,
      {
        params: {
          properties: "name,price,hs_sku",
          archived: false,
        },
      },
    )) as Product[];

    const result = products.map<Element>((product) => ({
      label: `${product.properties.name} $${product.properties.price} (SKU: ${product.properties.hs_sku})`,
      key: util.types.toString(product.id),
    }));
    return { result };
  },
  dataSourceType: "picklist",
});
