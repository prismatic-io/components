import { action, util } from "@prismatic-io/spectral";
import { listProductsInputs } from "../../inputs";
import { listProductsExamplePayload } from "../../payloadExamples";
import { listProductsGql } from "../graphql/products/listProducts";

export const listProducts = action({
  display: {
    label: "List Products",
    description: "Lists all products.",
  },
  perform: async (context, params) => {
    const { data } = await listProductsGql.perform(context, {
      shopifyConnection: params.shopifyConnection,
      limit: params.limit ? util.types.toInt(params.limit) : 50,
      getAlldata: params.getAlldata,
      endCursor: params.pageInfo || undefined,
    });

    return {
      data,
    };
  },
  inputs: listProductsInputs,
  examplePayload: {
    data: listProductsExamplePayload,
  },
});
