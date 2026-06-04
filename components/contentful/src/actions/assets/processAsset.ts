import { action } from "@prismatic-io/spectral";
import type { Asset, Environment } from "contentful-management";
import { createClient } from "../../client";
import { processAssetInputs } from "../../inputs";
import { getEnvironment } from "../../util";

export const processAsset = action({
  display: {
    label: "Process Asset",
    description: "Processes an asset for content delivery.",
  },
  perform: async (context, { connection, environmentId, spaceId, assetId }) => {
    const client = createClient(connection, context);
    const environment: Environment = await getEnvironment(
      client,
      spaceId,
      environmentId,
    );

    const asset: Asset = await environment.getAsset(assetId);
    await asset.processForAllLocales();
    return {
      data: {},
    };
  },
  inputs: processAssetInputs,
  examplePayload: { data: {} },
});
