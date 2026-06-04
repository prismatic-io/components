import { action } from "@prismatic-io/spectral";
import { createAssetsClient } from "../../../client";
import { createAssetObjectExamplePayload } from "../../../examplePayloads";
import { createAssetObjectInputs } from "../../../inputs";

export const createAssetObject = action({
  display: {
    label: "Create Asset Object",
    description:
      "Creates a new Assets/CMDB object of the specified object type with the provided attributes.",
  },
  inputs: createAssetObjectInputs,
  perform: async (
    context,
    { connection, assetObjectTypeId, assetAttributes, additionalFields },
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

    const { data } = await client.post("/object/create", body);
    return { data };
  },
  examplePayload: createAssetObjectExamplePayload,
});
