import { action } from "@prismatic-io/spectral";
import { createAssetsClient } from "../../../client";
import { searchAssetObjectsExamplePayload } from "../../../examplePayloads";
import { searchAssetObjectsInputs } from "../../../inputs";

export const searchAssetObjects = action({
  display: {
    label: "Search Asset Objects",
    description:
      "Searches Assets/CMDB objects using AQL (Asset Query Language).",
  },
  inputs: searchAssetObjectsInputs,
  perform: async (
    context,
    {
      connection,
      assetQL,
      assetIncludeAttributes,
      assetStartAt,
      assetMaxResults,
    },
  ) => {
    const { client } = await createAssetsClient(
      connection,
      context.debug.enabled,
    );

    const { data } = await client.post(
      "/object/aql",
      { qlQuery: assetQL },
      {
        params: {
          includeAttributes: assetIncludeAttributes,
          startAt: assetStartAt,
          maxResults: assetMaxResults,
        },
      },
    );
    return { data };
  },
  examplePayload: searchAssetObjectsExamplePayload,
});
