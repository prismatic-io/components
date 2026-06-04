import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { ASSETS_PATH } from "../../constants";
import { updateAssetExamplePayload } from "../../examplePayloads";
import { updateAssetInputs } from "../../inputs";

export const updateAsset = action({
  examplePayload: updateAssetExamplePayload,
  display: {
    label: "Update Asset",
    description: "Update an existing Content Builder asset.",
  },
  inputs: updateAssetInputs,
  perform: async (
    context,
    {
      connection,
      assetId,
      assetName,
      assetDescription,
      categoryId,
      assetContent,
      assetExtraBody,
    },
  ) => {
    const client = createClient(connection, context.debug.enabled);

    const body = {
      name: assetName,
      description: assetDescription,
      category: categoryId ? { id: categoryId } : undefined,
      content: assetContent,
      ...assetExtraBody,
    };

    const { data } = await client.patch(
      `${ASSETS_PATH}/${encodeURIComponent(assetId)}`,
      body,
    );

    return { data };
  },
});
