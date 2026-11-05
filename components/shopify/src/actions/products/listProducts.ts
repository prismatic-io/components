import { action, outputSchema, util } from "@prismatic-io/spectral";
import { DEFAULT_REST_PAGE_LIMIT } from "../../constants";
import { listProductsExamplePayload } from "../../examplePayloads";
import { listProductsInputs } from "../../inputs";
import { listProductsOutputSchema } from "../../outputSchemas";
import { listProductsGql } from "../graphql/products/listProductsGql";

export const listProducts = action({
  display: {
    label: "List Products",
    description: "Lists all products.",
  },
  performSafety: "notAllowed",
  perform: async (context, params) => {
    const { data } = await listProductsGql.perform(context, {
      shopifyConnection: params.shopifyConnection,
      pagination: {
        limit: params.pagination.limit
          ? util.types.toInt(params.pagination.limit)
          : DEFAULT_REST_PAGE_LIMIT,
        endCursor: params.pagination.pageInfo || undefined,
      },
      getAlldata: params.getAlldata,
    });

    return {
      data,
    };
  },
  inputs: listProductsInputs,
  outputSchema: outputSchema({ type: "actionOutput", schema: listProductsOutputSchema }),
  examplePerform: async (): Promise<{ data: unknown }> => listProductsExamplePayload,
  examplePayload: listProductsExamplePayload,
});
