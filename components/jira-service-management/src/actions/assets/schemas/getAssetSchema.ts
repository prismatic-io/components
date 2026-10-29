import { action } from "@prismatic-io/spectral";
import { createAssetsClient } from "../../../client";
import { getAssetSchemaExamplePayload } from "../../../examplePayloads";
import { getAssetSchemaInputs } from "../../../inputs";

export const getAssetSchema = action({
  display: {
    label: "Get Asset Schema",
    description: "Returns a single Assets/CMDB object schema by ID.",
  },
  inputs: getAssetSchemaInputs,
  perform: async (context, { connection, assetSchemaId }) => {
    const { client } = await createAssetsClient(
      connection,
      context.debug.enabled,
    );
    const { data } = await client.get(`/objectschema/${assetSchemaId}`);
    return { data };
  },
  examplePayload: getAssetSchemaExamplePayload,
});
