import { action } from "@prismatic-io/spectral";
import type { AssetProps, Environment } from "contentful-management";
import { createClient } from "../../client";
import { getAssetExamplePayload } from "../../examplePayloads";
import { getAssetInputs } from "../../inputs";
import { getEnvironment } from "../../util";

export const getAsset = action({
  display: {
    label: "Get Asset",
    description: "Retrieves a single asset by ID.",
  },
  perform: async (context, { connection, environmentId, spaceId, assetId }) => {
    const client = createClient(connection, context);
    const environment: Environment = await getEnvironment(
      client,
      spaceId,
      environmentId,
    );

    const data: AssetProps = (
      await environment.getAsset(assetId)
    ).toPlainObject();
    return {
      data: data as unknown, 
    };
  },
  inputs: getAssetInputs,
  examplePayload: { data: getAssetExamplePayload },
});
