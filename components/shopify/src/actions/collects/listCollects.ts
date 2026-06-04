import { action } from "@prismatic-io/spectral";
import { getShopifyClient } from "../../client";
import { listCollectsInputs } from "../../inputs";
import { listCollectsExamplePayload } from "../../payloadExamples";
import { computePageInformation } from "../../util";

export const listCollects = action({
  display: {
    label: "List Collects (Deprecated)",
    description: "List all collects enabled on your platform.",
  },
  perform: async (context, params) => {
    const client = getShopifyClient(params.shopifyConnection, undefined, context.debug.enabled);
    const result = await computePageInformation(
      client,
      "/collects.json",
      {
        limit: params.limit,
        page_info: params.pageInfo || undefined,
        product_id: params.productId || undefined,
      },
      params.getAlldata,
    );
    return { data: result as unknown };
  },
  inputs: listCollectsInputs,
  examplePayload: { data: listCollectsExamplePayload },
});
