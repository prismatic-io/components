import { action, outputSchema } from "@prismatic-io/spectral";
import type { Asset, Environment } from "contentful-management";
import { createClient } from "../../client";
import { deleteAssetExamplePayload } from "../../examplePayloads";
import { deleteAssetInputs } from "../../inputs";
import { deleteAssetOutputSchema } from "../../outputSchemas";
import { getEnvironment } from "../../util";
export const deleteAsset = action({
  display: {
    label: "Delete Asset",
    description: "Deletes an existing asset.",
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
    await asset.delete();
    return {
      data: {},
    };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => deleteAssetExamplePayload,
  inputs: deleteAssetInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: deleteAssetOutputSchema,
  }),
  examplePayload: deleteAssetExamplePayload,
});
