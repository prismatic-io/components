import { dataSource } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../client";
import {
  bigCommerceConnection,
  createModifierProductId,
  getProductVariantsExcludeFields,
  getProductVariantsIncludeFields,
  getProductVariantsLimit,
  getProductVariantsPage,
  storeHash,
} from "../inputs";

export const selectProductVariants = dataSource({
  dataSourceType: "picklist",
  display: {
    label: "Select Product Variants",
    description: "Select a variant from a specific product.",
  },
  inputs: {
    bigCommerceConnection,
    storeHash,
    product_id: createModifierProductId,
    page: getProductVariantsPage,
    limit: getProductVariantsLimit,
    include_fields: getProductVariantsIncludeFields,
    exclude_fields: getProductVariantsExcludeFields,
  },
  perform: async (_context, params) => {
    const client = await createAuthorizedClient(
      params.bigCommerceConnection,
      false,
    );
    const endpoint = `/stores/${params.storeHash}/v3/catalog/products/${params.product_id}/variants`;

    const queryParamsObj = {
      page: params.page,
      limit: params.limit,
      include_fields: params.include_fields,
      exclude_fields: params.exclude_fields,
    };

    const { data } = await client.get(endpoint, { params: queryParamsObj });

    return {
      result: data.map(
        (variant: { id: unknown; sku: unknown; name: unknown }) => ({
          key: variant.id,
          label: variant.sku || variant.name,
        }),
      ),
    };
  },
});
