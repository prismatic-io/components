import { action, outputSchema } from "@prismatic-io/spectral";
import type { Asset, AssetProps, Environment } from "contentful-management";
import { createClient } from "../../client";
import { publishAnAssetExamplePayload } from "../../examplePayloads";
import { publishAnAssetInputs } from "../../inputs";
import { publishAnAssetOutputSchema } from "../../outputSchemas";
import { getEnvironment } from "../../util";
export const publishAnAsset = action({
  display: {
    label: "Publish Asset",
    description: "Publishes an asset.",
  },
  performSafety: "notAllowed",
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
  examplePerform: async (): Promise<{
    data: unknown;
  }> => publishAnAssetExamplePayload,
  inputs: publishAnAssetInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: publishAnAssetOutputSchema,
  }),
  examplePayload: publishAnAssetExamplePayload,
});
