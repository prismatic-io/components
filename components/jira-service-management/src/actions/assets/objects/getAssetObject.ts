import { action } from "@prismatic-io/spectral";
import { createAssetsClient } from "../../../client";
import { getAssetObjectExamplePayload } from "../../../examplePayloads";
import { getAssetObjectInputs } from "../../../inputs";

export const getAssetObject = action({
  display: {
    label: "Get Asset Object",
    description: "Returns a single Assets/CMDB object by ID.",
  },
  inputs: getAssetObjectInputs,
  perform: async (context, { connection, assetObjectId }) => {
    const { client } = await createAssetsClient(
      connection,
      context.debug.enabled,
    );
    const { data } = await client.get(`/object/${assetObjectId}`);
    return { data };
  },
  examplePayload: getAssetObjectExamplePayload,
});
