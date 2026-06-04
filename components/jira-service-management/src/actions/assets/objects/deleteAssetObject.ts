import { action } from "@prismatic-io/spectral";
import { createAssetsClient } from "../../../client";
import { SUCCESS_RESPONSE } from "../../../constants";
import { deleteAssetObjectExamplePayload } from "../../../examplePayloads";
import { deleteAssetObjectInputs } from "../../../inputs";

export const deleteAssetObject = action({
  display: {
    label: "Delete Asset Object",
    description: "Deletes an Assets/CMDB object by ID.",
  },
  inputs: deleteAssetObjectInputs,
  perform: async (context, { connection, assetObjectId }) => {
    const { client } = await createAssetsClient(
      connection,
      context.debug.enabled,
    );
    await client.delete(`/object/${assetObjectId}`);
    return { data: SUCCESS_RESPONSE };
  },
  examplePayload: deleteAssetObjectExamplePayload,
});
