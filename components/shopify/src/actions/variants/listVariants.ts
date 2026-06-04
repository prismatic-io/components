import { action } from "@prismatic-io/spectral";
import { getShopifyClient } from "../../client";
import { listVariantsInputs } from "../../inputs";
import { listVariantsExamplePayload } from "../../payloadExamples";
import { computePageInformation } from "../../util";

export const listVariants = action({
  display: {
    label: "List Variants",
    description: "Lists all variants for the specified product.",
  },
  perform: async (context, params) => {
    const client = getShopifyClient(params.shopifyConnection, undefined, context.debug.enabled);
    const result = await computePageInformation(
      client,
      `/products/${params.productId}/variants`,
      {
        limit: params.limit,
        page_info: params.pageInfo || undefined,
      },
      params.getAlldata,
    );

    return {
      data: result as unknown,
    };
  },
  examplePayload: {
    data: listVariantsExamplePayload,
  },
  inputs: listVariantsInputs,
});
