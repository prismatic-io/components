import { action, outputSchema } from "@prismatic-io/spectral";
import { getShopifyGraphQlClient } from "../../../client";
import { MAX_LIMIT } from "../../../constants";
import { listVariantsExamplePayload as examplePayload } from "../../../examplePayloads";
import { listVariantsInputs as inputs } from "../../../inputsGql";
import { listVariantsGqlOutputSchema } from "../../../outputSchemas";
import type { PageInfo } from "../../../types";
import { fetchData } from "../../../util";
import listVariantsQuery from "../queries/variants/ListVariants.gql";
export const listVariantsGql = action({
  display: {
    label: "List Variants",
    description: "Lists all variants for the specified product.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    { shopifyConnection, productId, getAlldata, pagination = {} },
  ) => {
    const client = getShopifyGraphQlClient(
      shopifyConnection,
      undefined,
      context.debug.enabled,
      context.logger,
    );
    const data = (await fetchData(
      client,
      ["productVariants"],
      "productVariants",
      getAlldata,
      listVariantsQuery,
      {
        query: `product_id:${productId}`,
        first: getAlldata ? MAX_LIMIT : pagination.limit,
        cursor: getAlldata ? undefined : pagination.endCursor,
      },
    )) as Record<"productVariants", unknown[]> & {
      pageInfo: PageInfo;
    };
    return {
      data,
    };
  },
  examplePerform: async () => examplePayload,
  examplePayload,
  inputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listVariantsGqlOutputSchema,
  }),
});
