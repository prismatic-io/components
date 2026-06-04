import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { ASSETS_PATH } from "../../constants";
import { createAssetExamplePayload } from "../../examplePayloads";
import { createAssetInputs } from "../../inputs";

export const createAsset = action({
  examplePayload: createAssetExamplePayload,
  display: {
    label: "Create Asset",
    description: "Create a new Content Builder asset.",
  },
  inputs: createAssetInputs,
  perform: async (
    context,
    {
      connection,
      assetName,
      assetDescription,
      assetTypeId,
      categoryId,
      assetContent,
      assetExtraBody,
    },
  ) => {
    const client = createClient(connection, context.debug.enabled);

    const body = {
      name: assetName,
      assetType: { id: assetTypeId },
      description: assetDescription,
      category: categoryId ? { id: categoryId } : undefined,
      content: assetContent,
      ...assetExtraBody,
    };

    const { data } = await client.post(ASSETS_PATH, body);

    return { data };
  },
});
