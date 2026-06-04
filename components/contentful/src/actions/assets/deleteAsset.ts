import { action } from "@prismatic-io/spectral";
import type { Asset, Environment } from "contentful-management";
import { createClient } from "../../client";
import { deleteAssetInputs } from "../../inputs";
import { getEnvironment } from "../../util";

export const deleteAsset = action({
  display: {
    label: "Delete Asset",
    description: "Deletes an existing asset.",
  },
  perform: async (context, { connection, environmentId, spaceId, assetId }) => {
    const client = createClient(connection, context);

    const environment: Environment = await getEnvironment(
      client,
      spaceId,
      environmentId,
    );

    const asset: Asset = await environment.getAsset(assetId);
    await asset.delete();
    return {
      data: {},
    };
  },
  inputs: deleteAssetInputs,
  examplePayload: { data: {} },
});
