import { action } from "@prismatic-io/spectral";
import { createAssetsClient } from "../../../client";
import { listAssetSchemasExamplePayload } from "../../../examplePayloads";
import { listAssetSchemasInputs } from "../../../inputs";
import type { AssetSchema } from "../../../types";
import { getAssetsPaginatedData } from "../../../util";

export const listAssetSchemas = action({
  display: {
    label: "List Asset Schemas",
    description: "Returns all Assets/CMDB object schemas in the workspace.",
  },
  inputs: listAssetSchemasInputs,
  perform: async (
    context,
    {
      connection,
      fetchAll,
      assetStartAt,
      assetMaxResults,
      additionalQueryParams,
    },
  ) => {
    const { client } = await createAssetsClient(
      connection,
      context.debug.enabled,
    );
    const { data } = await getAssetsPaginatedData<AssetSchema>(
      client,
      "/objectschema/list",
      fetchAll,
      {
        params: {
          ...additionalQueryParams,
          startAt: assetStartAt,
          maxResults: assetMaxResults,
        },
      },
    );
    return { data };
  },
  examplePayload: listAssetSchemasExamplePayload,
});
