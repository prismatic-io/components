import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { ASSETS_PATH } from "../../constants";
import { getAssetExamplePayload } from "../../examplePayloads";
import { getAssetInputs } from "../../inputs";

export const getAsset = action({
  examplePayload: getAssetExamplePayload,
  display: {
    label: "Get Asset",
    description: "Retrieve a Content Builder asset by ID.",
  },
  inputs: getAssetInputs,
  perform: async (context, { connection, assetId }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(
      `${ASSETS_PATH}/${encodeURIComponent(assetId)}`,
    );

    return { data };
  },
});
