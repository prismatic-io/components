import { dataSource, util } from "@prismatic-io/spectral";
import { createShipStationClient } from "../client";
import { selectProductsInputs } from "../inputs";
import type { Product } from "../types";

export const selectProducts = dataSource({
  dataSourceType: "picklist",
  display: {
    label: "Select Product",
    description: "A picklist of products in the ShipStation account.",
  },
  inputs: selectProductsInputs,
  perform: async (
    _context,
    {
      connectionInput,
      sku,
      productName,
      productCategoryId,
      productTypeId,
      tagId,
      startDate,
      endDate,
      sortBy,
      sortDir,
      page,
      pageSize,
      showInactive,
    },
  ) => {
    const client = createShipStationClient(connectionInput);

    const params = {
      sku,
      name: productName,
      productCategoryId,
      productTypeId,
      tagId,
      startDate,
      endDate,
      sortBy,
      sortDir,
      page,
      pageSize,
      showInactive,
    };

    const { data } = await client.get("/products", { params });

    return {
      result: data.products.map((product: Product) => ({
        key: util.types.toString(product.productId),
        label: `${product.name} (SKU: ${product.sku})`,
      })),
    };
  },
});
