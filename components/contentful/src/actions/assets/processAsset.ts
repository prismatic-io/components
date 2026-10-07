import { action, outputSchema } from "@prismatic-io/spectral";
import type { Asset, Environment } from "contentful-management";
import { createClient } from "../../client";
import { processAssetExamplePayload } from "../../examplePayloads";
import { processAssetInputs } from "../../inputs";
import { processAssetOutputSchema } from "../../outputSchemas";
import { getEnvironment } from "../../util";
export const processAsset = action({
  display: {
    label: "Process Asset",
    description: "Processes an asset for content delivery.",
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
    await asset.processForAllLocales();
    return {
      data: {},
    };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => processAssetExamplePayload,
  inputs: processAssetInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: processAssetOutputSchema,
  }),
  examplePayload: processAssetExamplePayload,
});
