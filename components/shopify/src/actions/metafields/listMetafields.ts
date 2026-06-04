import { action } from "@prismatic-io/spectral";
import { getShopifyClient } from "../../client";
import { listMetafieldsInputs } from "../../inputs";
import { listMetafieldsExamplePayload } from "../../payloadExamples";
import { computePageInformation } from "../../util";

export const listMetafields = action({
  display: {
    label: "List Metafields",
    description: "Lists all metafields for the specified resource.",
  },
  perform: async (context, params) => {
    const client = getShopifyClient(params.shopifyConnection, undefined, context.debug.enabled);
    const result = await computePageInformation(
      client,
      "/metafields",
      { limit: params.limit, page_info: params.pageInfo || undefined },
      params.getAlldata,
    );
    return { data: result as unknown };
  },
  inputs: listMetafieldsInputs,
  examplePayload: { data: listMetafieldsExamplePayload },
});
