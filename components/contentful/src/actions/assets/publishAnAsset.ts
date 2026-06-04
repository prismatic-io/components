import { action } from "@prismatic-io/spectral";
import type { Asset, AssetProps, Environment } from "contentful-management";
import { createClient } from "../../client";
import { publishAssetExamplePayload } from "../../examplePayloads";
import { publishAnAssetInputs } from "../../inputs";
import { getEnvironment } from "../../util";

export const publishAnAsset = action({
  display: {
    label: "Publish Asset",
    description: "Publishes an asset.",
  },
  perform: async (context, { connection, environmentId, spaceId, assetId }) => {
    const client = createClient(connection, context);
    const environment: Environment = await getEnvironment(
      client,
      spaceId,
      environmentId,
    );

    const asset: Asset = await environment.getAsset(assetId);
    const data: AssetProps = (await asset.publish()).toPlainObject();
    return {
      data: data as unknown, 
    };
  },
  inputs: publishAnAssetInputs,
  examplePayload: { data: publishAssetExamplePayload },
});
