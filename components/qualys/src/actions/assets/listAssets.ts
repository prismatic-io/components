import { action, outputSchema } from "@prismatic-io/spectral";
import { listAssetsExamplePayload } from "../../examplePayloads";
import { listAssetsInputs } from "../../inputs";
import { listAssetsOutputSchema } from "../../outputSchemas";
import { fetchGatewayAssets } from "../../util";
export const listAssets = action({
  display: {
    label: "List Assets",
    description:
      "Search for assets in the Qualys inventory using the Gateway asset search API. Supports keyset cursor pagination and field selection.",
  },
  inputs: listAssetsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listAssetsOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      connection,
      fetchAll,
      pagination,
      lastModified,
      includeFields,
      excludeFields,
    },
  ) => {
    const { pageSize, cursor } = pagination;
    const extraParams: Record<string, string | number> = {};
    if (cursor) extraParams.lastSeenAssetId = cursor;
    if (includeFields.length > 0)
      extraParams.includeFields = includeFields.join(",");
    if (excludeFields.length > 0)
      extraParams.excludeFields = excludeFields.join(",");
    if (lastModified) extraParams.assetLastUpdated = lastModified;
    const { assets, lastResponse } = await fetchGatewayAssets({
      connection,
      debug: context.debug.enabled,
      pageSize,
      fetchAll,
      extraParams,
    });
    return {
      data: {
        ...lastResponse,
        assetListData: { asset: assets },
      },
    };
  },
  examplePayload: listAssetsExamplePayload,
});
