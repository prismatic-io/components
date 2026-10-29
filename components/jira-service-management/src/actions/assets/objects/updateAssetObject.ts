import { action } from "@prismatic-io/spectral";
import { createAssetsClient } from "../../../client";
import { updateAssetObjectExamplePayload } from "../../../examplePayloads";
import { updateAssetObjectInputs } from "../../../inputs";

export const updateAssetObject = action({
  display: {
    label: "Update Asset Object",
    description:
      "Updates an existing Assets/CMDB object with the supplied attributes.",
  },
  inputs: updateAssetObjectInputs,
  perform: async (
    context,
    {
      connection,
      assetObjectId,
      assetObjectTypeId,
      assetAttributes,
      additionalFields,
    },
  ) => {
    const { client } = await createAssetsClient(
      connection,
      context.debug.enabled,
    );
    const body = {
      ...additionalFields,
      objectTypeId: assetObjectTypeId,
      attributes: assetAttributes,
    };

    const { data } = await client.put(`/object/${assetObjectId}`, body);
    return { data };
  },
  examplePayload: updateAssetObjectExamplePayload,
});
