import { action, outputSchema } from "@prismatic-io/spectral";
import type { Asset, AssetProps, Environment } from "contentful-management";
import { createClient } from "../../client";
import { unpublishAnAssetExamplePayload } from "../../examplePayloads";
import { unpublishAnAssetInputs } from "../../inputs";
import { unpublishAnAssetOutputSchema } from "../../outputSchemas";
import { getEnvironment } from "../../util";
export const unpublishAnAsset = action({
  display: {
    label: "Unpublish Asset",
    description: "Unpublishes an asset.",
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
    const data: AssetProps = (await asset.unpublish()).toPlainObject();
    return {
      data: data as unknown,
    };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => unpublishAnAssetExamplePayload,
  inputs: unpublishAnAssetInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: unpublishAnAssetOutputSchema,
  }),
  examplePayload: unpublishAnAssetExamplePayload,
});
